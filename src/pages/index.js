import sketch from "../assets/images/pirateSketch.jpeg";
import Hero from "../components/Hero";

export default function Home() {
    document.title = "Wahe Life | Home"

    return (
        <>
            <Hero src={sketch} title="Meet The Mighty Pirates" />
            <div id="mainContent">
                <p className="article padded">
                    We are <b>Commanding</b>. We Are <b>Mighty</b>.
                    The Mighty Pirates are a team from Alexandria City High School in Alexandria, VA competing in the 2024 SNAME boat design competition.
                </p>
            </div>
        </>
    )
}