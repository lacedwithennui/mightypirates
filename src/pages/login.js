import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { auth } from "../components/api";
import Hero from "../components/Hero";
import pirateSketch from "../assets/images/pirateSketch.jpeg";

export default function Login() {
    return(
        <>
            <Hero title="Login" src={pirateSketch} />
            <div className="padded" id="formContainer">
                <form onSubmit={(event) => {auth(event, document.getElementById("uname").value, document.getElementById("pword").value);}}>
                    <label>
                        Username
                        <input type="text" name="uname" id="uname" />
                    </label>
                    <div id="pwordContainer">
                        <label className="passwordLabel" for="pword">
                            Password
                        </label>
                        <div id="passwordContainer">
                            <input type="password" name="pword" id="pword" />
                            <IoEyeOffOutline size={30} id="eye" className="eye" onClick={() => togglePassword()} display="flex" />
                            <IoEyeOutline size={30} id="eyeOff" className="eye" onClick={() => togglePassword()} display="none" />
                        </div>
                    </div>
                    <input type="submit" />
                </form>
            </div>
        </>
    )
}

function togglePassword() {
    let viewEnabled = (document.getElementById("eye").style.display !== "none")
    document.getElementById("eye").style.display = (viewEnabled ? "none" : "flex")
    document.getElementById("eyeOff").style.display = (viewEnabled ? "flex" : "none")
    document.getElementById("pword").type = (viewEnabled ? "text" : "password")
}