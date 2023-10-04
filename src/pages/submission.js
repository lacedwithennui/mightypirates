import pirateSketch from "../assets/images/pirateSketch.jpeg"
import Hero from "../components/Hero";
import { redirectIfBadAuth, submitPost } from "../components/api";

export default function Submission() {
    document.title = "Mighty Pirates | Submit a Meeting"
    redirectIfBadAuth();
    return(
        <>
            <Hero title="Submission Form" src={pirateSketch} />
            <div className="padded" id="formContainer">
                <form onSubmit={(event) => submitPost(event)}>
                    <label>Today's date (formatted mmddyy)</label>
                    <input type="number" id="dateString" min="090123" max="123124" placeholder="092123" minLength="6" maxLength="6" required/>
                    <label class="fileUploadLabel">First Featured Image
                        <input type="file" id="imageFeatured1" accept="image/*" onChange={(event) => {fileUploadChanger(event.target, document.getElementById("featured1"))}} required />
                        <div class="fileUploadBox" id="featured1">
                            Upload...
                        </div>
                    </label>
                    <label class="fileUploadLabel">Second Featured Image
                        <input type="file" id="imageFeatured2" accept="image/*" onChange={(event) => {fileUploadChanger(event.target, document.getElementById("featured2"))}} required />
                        <div class="fileUploadBox" id="featured2">
                            Upload...
                        </div>
                    </label>
                    
                    <label class="fileUploadLabel">Any other images that were taken today that should be on the site
                        <input type="file" id="imageFiles" accept="image/*" onChange={(event) => {fileUploadChanger(event.target, document.getElementById("other"))}} multiple required />
                        <div class="fileUploadBox" id="other">
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

function fileUploadChanger(sender, boxToChange) {
    let inputElem = sender;
    console.log(sender);
    if(inputElem.value !== "") {
        let fileNamesArray = []
        for(let i = 0; i < inputElem.files.length; i++) {
            fileNamesArray.push(inputElem.files[i].name)
        }
        boxToChange.innerHTML = inputElem.files.length + " file" + (inputElem.files.length === 1 ? "" : "s") + " selected: " + fileNamesArray.toString();
    }
}