import sketch from "../assets/images/pirateSketch.jpeg";
import defaultHero from "../assets/images/pirateCompressed.png"
import Hero from "../components/Hero";

export default function Home() {
    document.title = "The Mighty Pirates | Home"

    return (
        <>
            <Hero src={defaultHero} /*defaultSrc={defaultHero} */title="Meet The Mighty Pirates" />
            <div id="mainContent">
                <p className="article padded">
                    We are <b>Commanding</b>. We are <b>Mighty</b>.
                    The Mighty Pirates are a team competing in the 2024 SNAME boat design competition. Our design history notebook can be found <a href="/design-history">here</a>. Our final design package can be downloaded <a href="/design-package">here</a>.
                </p>
            </div>
        </>
    )
}