import { GalleryImage } from "./Gallery";
import { until } from "./util";
import Cookies from "universal-cookie";

/**
 * Posts images to the database from the given input[type=file] element
 * @param {HTMLElement} imageElement an HTML element of type input[type=file]
 * @param {bool} featured wether the image should be marked as featured or not
 * @param {Function} callback a function to be executed when all is done.
 */
export async function postImages(imageElement, featured, callback) {
    let insertedIDs = [];
    for (let i = 0; i < imageElement.files.length; i++) {
        let reader = new FileReader();
        const file = imageElement.files[i];
        reader.onload = async () => {
            await fetch("http://mp.parkerdaletech.com:8080/db/site/upload/images",
                {
                    method: "POST",
                    body: "{\"fileName\": \""+ file.name +"\", \"featured\": " + featured + ", \"data\": \"" + reader.result + "\"}"
                }
            )
            .then((response) => {console.log(response); return response.json()})
            .then((json) => {insertedIDs.push(json["uploadedID"])});
        }
        reader.readAsDataURL(file);
    }
    await until(() => (insertedIDs.length === imageElement.files.length))
    callback(insertedIDs);
}

/**
 * Downloads images from the given ObjectIDs from the database
 * @param {string[]} imageIDsArray The array of ObjectID hex strings
 * @returns {GalleryImage[]} GalleryImage items in the same order as the ObjectIDs
 */
export async function getImages(imageIDsArray) {
    let output = [];
    for(let i = 0; i < imageIDsArray.length; i++) {
        let response = await fetch("http://mp.parkerdaletech.com:8080/db/site/images/" + imageIDsArray[i]["$oid"]);
        let json = await response.json();
        let image = <GalleryImage featured={json["featured"]} src={await json["data"]} alt=""></GalleryImage>
        output.push(image);
    }
    return output;
}

/**
 * Posts a meeting and all corresponding images to the database.
 * @param {Event} event 
 */
export async function submitPost(event) {
    event.preventDefault();
    document.getElementById("submit").disabled = true;
    let dateString = document.getElementById("dateString").value.toString();
    postImages(document.getElementById("imageFeatured1"), true, (idsTopLevel) => {
        postImages(document.getElementById("imageFeatured2"), true, (idsMidLevel) => {
            postImages(document.getElementById("imageFiles"), false, (idsBottomLevel) => {
                let allIds = idsTopLevel.concat(idsMidLevel).concat(idsBottomLevel);
                let idString = allIds.betterToString();
                let description = document.getElementById("description").value.toString();
                console.log("dateString: " + dateString);
                console.log("imageID: " + idString);
                console.log("description: " + description);
                let body = JSON.stringify(JSON.parse('{"dateString": "' + dateString + '", "images": ' + idString.toString() + ', "description": "' + description + '"}'));
                console.log(body)
                console.log(document.cookie.split(";")[1].trim().split("=")[1])
                // let headers = JSON.parse('{"Authorization": "' + document.cookie.split(";")[1].trim().split("=")[1] + '"}');
                // console.log(JSON.stringify(headers))
                fetch("http://mp.parkerdaletech.com:8080/db/site/upload/posts", {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + document.cookie.split(";")[1].trim().split("=")[1]
                    },
                    body: body
                })
                .then(async (response) => {
                    console.log(response);
                    let json = await response.json();
                    console.log(json)
                    console.log(json.hasOwnProperty("error") + json["error"])
                    alert((response["ok"] ? "Success!" : ("Upload failed: " + response["statusText"] + "." + (json.hasOwnProperty("error") ? " Error: " + json["error"] : ""))) + " Status Code: " + response["status"].toString());
                    document.getElementById("submit").disabled = false;
                    return json;
                });
            });
        })
        
    })
}

export async function auth(event, username, password) {
    event.preventDefault();
    fetch("http://mp.parkerdaletech.com:8080/db/auths", {
        method: "GET",
        headers: {
            Authorization: "Basic " + btoa(username + ":" + password)
        }
    })
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((json) => {
        console.log(json);
        if(json["token"]) {
            new Cookies().set("token", json["token"]);
        }
        console.log(new Cookies().get("token"));
        window.location.href = "/submit"
    });
}

export function redirectIfBadAuth() {
    fetch("http://mp.parkerdaletech.com:8080/db/auths/check", {
        headers: {
            Authorization: "Bearer " + document.cookie.split(";")[1].trim().split("=")[1]
        }
    }).then((response) => {
        if(response.status === 401) {
            window.location.href = "/login"
        }
    })
}