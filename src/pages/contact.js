import Hero from "../components/Hero";

export default function Contact() {
    document.title = "The Mighty Pirates | Contact"
    return (
        <>
            <Hero />
            <div id="mainContent">
                <p><b>Webmaster: </b> <a href="mailto:hparkerbelmont@gmail.com">hparkerbelmont@gmail.com</a></p>
            </div>
        </>
    )
}