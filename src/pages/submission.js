import pirateSketch from "../assets/images/pirateSketch.jpeg"
import Hero from "../components/Hero";
import { submitPost } from "../components/api";

export default function Submission() {
    return(
        <>
            <Hero title="Submission Form" src={pirateSketch} />
            <div className="padded" id="formContainer">
                <form onSubmit={(event) => submitPost(event)}>
                    <label>Today's date (formatted mmddyy)</label>
                    <input type="number" id="dateString" min="090123" max="123124" placeholder="092123" minLength="6" maxLength="6" required/>
                    <label id="fileUploadLabel">Any images that were taken today that should be on the site
                        <input type="file" id="imageFiles" accept="image/*" onChange={fileUploadChanger} multiple required />
                        <div id="fileUploadBox">
                            Upload...
                        </div>
                    </label>
                    <label>A long description of what was done today</label>
                    <input type="text" id="description" placeholder="Today, the Pirates..." required/>
                    <input type="submit" id="submit" />
                </form>
            </div>
        </>
    );
}

function fileUploadChanger() {
    let inputElem = document.querySelector("input[type=file]");
    if(inputElem.value !== "") {
        let fileNamesArray = []
        for(let i = 0; i < inputElem.files.length; i++) {
            fileNamesArray.push(inputElem.files[i].name)
        }
        document.getElementById("fileUploadBox").innerHTML = inputElem.files.length + " file" + (inputElem.files.length === 1 ? "" : "s") + " selected: " + fileNamesArray.toString();
    }
}