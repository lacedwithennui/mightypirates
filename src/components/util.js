/**
 * Stringifies an array
 * @param {Array} array The array to stringify 
 * @returns A string formatted "[array[0], array[1], ...etc]"
 */
export function betterArrToString() {
    console.log(this.toString())
    let finalString = "[";
    for (let i = 0; i < this.length; i++) {
        const item = this[i];
        finalString = finalString.concat("\"", item.toString(), "\"")
        if(i !== this.length - 1) {
            finalString = finalString.concat(",")
        }
    }
    finalString = finalString.concat("]")
    return finalString;
}

/**
 * Hangs until the given condition function is met
 * @param {Function} conditionFunction A function that supplies the condition to wait for, i.e. `() => (condition === true)`
 * @returns An empty promise that will resolve when the condition is met.
 */
export function until(conditionFunction) {
    const resolver = (resolve) => {
        if(conditionFunction()) {
            resolve();
        }
        else {
            setTimeout(() => resolver(resolve), 100)
        }
    }

    return new Promise(resolver);
}

export function vh(percent) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}

export function vw(percent) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
}

export async function compress(imageUrl) {
    let image = document.createElement("img")
    image.src = imageUrl;
    image.className = "placeHolder";
    image.id = image.src.substring(0, 5);
    document.getElementById("root").appendChild(image);
    await until(() => typeof document.querySelector(".placeHolder") !== "undefined")
    // image = document.querySelector(".placeHolder")
    let canvas = document.createElement("canvas");
    document.getElementById("root").insertBefore(canvas, image);
    canvas = document.querySelector("canvas");
    
    canvas.height = image.height * 2/3
    canvas.width = image.width * 2/3
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    let dataUrl = "";
    canvas.toBlob((blob) => {
        console.log("BLOB!!!"  + blob)
        let reader = new FileReader();
        reader.onloadend = (event) => {
            dataUrl = event.target.result
        }
        if(blob !== null) {
            reader.readAsDataURL(blob)
        }
    })
    canvas.style.display = "none";
    await until(() => (dataUrl !== ""))
    document.querySelectorAll(".placeHolder").forEach((element) => element.remove())
    document.querySelectorAll("canvas").forEach((element) => element.remove())
    return dataUrl;
}

// eslint-disable-next-line no-extend-native
Array.prototype.betterToString = betterArrToString;