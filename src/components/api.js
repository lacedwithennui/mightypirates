function betterArrToString(array) {
    let finalString = "[";
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        finalString = finalString.concat("\"", item.toString(), "\"")
        if(i !== array.length - 1) {
            finalString = finalString.concat(",")
        }
    }
    finalString = finalString.concat("]")
    return finalString;
}

export async function convertImages(imageElement, featured, callback) {
    let input = imageElement;
    let insertedIDs = [];
    for (let i = 0; i < input.files.length; i++) {
        let reader = new FileReader();
        const file = input.files[i];
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
    setTimeout(() => callback(insertedIDs), 7000)
}

export async function submitPost(event) {
    event.preventDefault();
    document.getElementById("submit").disabled = true;
    let dateString = document.getElementById("dateString").value.toString();
    convertImages(document.getElementById("imageFeatured1"), true, (idsTopLevel) => {
        convertImages(document.getElementById("imageFeatured2"), true, (idsMidLevel) => {
            convertImages(document.getElementById("imageFiles"), false, (idsBottomLevel) => {
                let allIds = idsTopLevel.concat(idsMidLevel).concat(idsBottomLevel);
                console.log(allIds);
                let idString = betterArrToString(allIds);
                let description = document.getElementById("description").value.toString();
                console.log("dateString: " + dateString);
                console.log("imageID: " + idString);
                console.log("description: " + description);
                setTimeout(() => {
                    let body = JSON.stringify(JSON.parse('{"dateString": "' + dateString + '", "images": ' + idString.toString() + ', "description": "' + description + '"}'));
                    console.log(body)
                    fetch("http://mp.parkerdaletech.com:8080/db/site/upload/posts", {
                        method: "POST",
                        body: body
                    })
                        .then((response) => {
                            console.log(response);
                            return response.json();
                        })
                        .then((json) => {
                            console.log(json);
                        })
                        .then(() => {alert("Success!"); document.getElementById("submit").disabled = false});
                }, 1000)
            });
        })
        
    })
}