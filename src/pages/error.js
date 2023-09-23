import Hero from "../components/Hero"
import errorImg from "../assets/images/404.jpeg"

export default function NotFound() {
    document.title = "The Mighty Pirates | 404"
    return(
        <>
            <Hero src={errorImg} title="ERROR 404: Page Not Found" />
            <p className="article padded">Did you lose your way on the 7 seas? Here's a treasure map:</p>
            <a href="/" className="styledAnchor article paddedNoTop">Home</a>
            <a href="/about" className="styledAnchor article paddedNoVertical">Design History</a>
        </>
    )
}