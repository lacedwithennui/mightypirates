import sketch from "../assets/images/pirateSketch.jpeg";
import defaultHero from "../assets/images/pirateCompressed.png"
import Hero from "../components/Hero";
import designPackage from "../assets/The Mighty Pirates - Final Design Package.zip";

export default function DesignPackage() {
    document.title = "The Mighty Pirates | Design Package"

    return (
        <>
            <Hero src={sketch} defaultSrc={defaultHero} title="Download the Design Package" />
            <div id="mainContent">
                <p className="article padded">
                    <a href={designPackage} download>Download our 2024 design package</a> as a zip archive.
                </p>
            </div>
        </>
    )
}