import Cookies from "universal-cookie";
import Gallery, { GalleryImage } from "./Gallery";
import MeetingDay from "./MeetingDay";
import { compress, until } from "./util";
import publicKey from "../assets/publicKey.json";
import jsencryptlib from "jsencrypt";
const jsencrypt = new jsencryptlib();

/**
 * Posts images to the database from the given input[type=file] element
 * @param {HTMLElement} imageElement an HTML element of type input[type=file]
 * @param {bool} featured whether the image should be marked as featured or not
 */
export async function postImages(imageElement, featured) {
    let insertedIDs = [];
    for (let i = 0; i < imageElement.files.length; i++) {
        let reader = new FileReader();
        const file = imageElement.files[i];
        reader.onload = async () => {
            let compressed = await compress(reader.result);
            await fetch("http://mp.hpbelmont.com:5003/db/upload/images",
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + new Cookies().get("token")
                    },
                    body: "{\"fileName\": \""+ file.name +"\", \"featured\": " + featured + ", \"data\": \"" + compressed/*reader.result*/ + "\"}"
                }
            )
            .then((response) => {console.log(response); return response.json()})
            .then((json) => {insertedIDs.push(json["uploadedID"])});
        }
        reader.readAsDataURL(file);
    }
    await until(() => (insertedIDs.length === imageElement.files.length))
    return insertedIDs;
}

/**
 * Downloads images from the given ObjectIDs from the database
 * @param {string[]} imageIDsArray The array of ObjectID hex strings
 * @returns {GalleryImage[]} GalleryImage items in the same order as the ObjectIDs
 */
export async function getImages(imageIDsArray) {
    let output = [];
    for(let i = 0; i < imageIDsArray.length; i++) {
        let response = await fetch("http://mp.hpbelmont.com:5003/db/images/" + imageIDsArray[i]["$oid"]);
        let json = await response.json();
        let image = <GalleryImage key={json["fileName"]} featured={json["featured"]} src={await json["data"]} alt=""></GalleryImage>
        output.push(image);
    }
    return output;
}

/**
 * Posts a meeting and all corresponding images to the database.
 * @param {Event} event The event that is sent by the form submission
 */
export async function submitPost(event) {
    // don't reload the page on submit.
    event.preventDefault();
    // turn off the submit button so we don't get any repeats.
    document.getElementById("submit").disabled = true;
    let dateString = document.getElementById("dateString").value.toString();
    // upload all images
    let featured1 = await postImages(document.getElementById("imageFeatured1"), true);
    let featured2 = await postImages(document.getElementById("imageFeatured2"), true);
    let notFeatured = await postImages(document.getElementById("imageFiles"), false);
    // make an array of all image ids
    let allIds = featured1.concat(featured2).concat(notFeatured);
    let idString = allIds.betterToString();
    let description = document.getElementById("description").value.toString();
    fetch("http://mp.hpbelmont.com:5003/db/upload/posts", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + new Cookies().get("token")
        },
        body: '{"dateString": "' + dateString + '", "images": ' + idString.toString() + ', "description": "' + description + '"}'
    })
    .then(async (response) => {
        console.log(response);
        let json = await response.json();
        console.log(json)
        console.log(json.hasOwnProperty("error") + json["error"])
        alert(
            (response["ok"]
                ? "Success!"
                : "Upload failed: " + response["statusText"] + "." + (json.hasOwnProperty("error") ? " Error: " + json["error"] : "")) +
                " Status Code: " +
                response["status"].toString()
        );
        document.getElementById("submit").disabled = false;
        return json;
    });
}

/**
 * Takes the given username and password and creates a cookie containing the returned access token, or throws an error.
 * @param {Event} event The event sent by the form submission
 * @param {string} username Plaintext username string
 * @param {string} password Plaintext password string
 */
export async function auth(event, username, password) {
    // prevent the redirect to /submit until we know that the credentials are valid
    event.preventDefault();
    jsencrypt.setPublicKey(publicKey.key);
    let encrypted = jsencrypt.encrypt(username + ":" + password);
    console.log(encrypted.toString())
    fetch("http://mp.hpbelmont.com:5003/db/auths", {
        method: "GET",
        headers: {
            Authorization: "Basic " + encrypted.toString()
        }
    })
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        // If the api provided a token, add a cookie.
        if(json["token"]) {
            new Cookies().set("token", json["token"]);
            window.location.href = "/submit"
        }
        // If there's an error, alert the user.
        else if(json["error"]) {
            alert(json["error"]);
        }
    });
}

/**
 * Redirects the user to /login if their token is invalid
 */
export function redirectIfBadAuth() {
    fetch("http://mp.hpbelmont.com:5003/db/auths/check", {
        headers: {
            Authorization: "Bearer " + new Cookies().get("token")
        }
    })
    .then((response) => {
        if(response.status === 401) {
            window.location.href = "/login"
        }
    })
}

/**
 * @returns an array of MeetingDay elements from the list of all posts
 */
export async function AllMeetings() {
    let response = await fetch("http://mp.hpbelmont.com:5003/db/posts");
    let json = await response.json();
    let allDays = [];
    for (let i = 0; i < json["posts"].length; i++) {
        let images = [];
        if(json["posts"][i]["images"]) {
            images = await getImages(json["posts"][i]["images"])
        }
        allDays.push(
            <MeetingDay first={(i === 0)} key={json["posts"][i]["dateString"]} date={json["posts"][i]["dateString"]} description={json["posts"][i]["description"]}>
                <Gallery>
                    {images}
                </Gallery>
            </MeetingDay>
        );
    }
    return allDays
}