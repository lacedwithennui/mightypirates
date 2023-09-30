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

// eslint-disable-next-line no-extend-native
Array.prototype.betterToString = betterArrToString;