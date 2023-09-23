import Hero from "../components/Hero"
import manila from "../assets/images/manila.jpeg"
import ballCad from "../assets/images/snamemonballcad.png"
import prototype from "../assets/images/boatPrototype.jpeg"
import Gallery, { GalleryImage } from "../components/Gallery"

export default function DesignHistory() {
    document.title = "The Mighty Pirates | Design History"

    return (
        <>
            <Hero src={prototype} title="Design History" />
            <div id="mainContent">
                <h1 className="padded">Table of Contents</h1>
                <ul className="toc">
                    <TOCItem date="092123"></TOCItem>
                </ul>
                <h1 className="padded">Meetings</h1>
                <MeetingDay date="092123">
                    <Gallery>
                        <GalleryImage featured src={ballCad} alt="A CAD representation of packed SNAMEmon balls." />
                        <GalleryImage featured src={manila} alt="A manila envelope prototype of an initial hull design." />
                    </Gallery>
                    <p className="paddedVertical">
                        Today, the Pirates worked on brainstorming a hull design and conceptualizing maximum SNAMEmon ball storage within the chassis. After discussion and research, we settled on a pontoon design to maximize glide in the water and to allow more SNAMEmon ball compartments to reduce shifting within the hull.
                    </p>
                </MeetingDay>
            </div>
        </>
    )
}

function TOCItem({date}) {
    return (
        <>
            <li><a href={"#" + date} className="tocitem">{date.slice(0,2)+"/"+date.slice(2,4)+"/"+date.slice(4,6)}</a></li>
        </>
    )
}

function MeetingDay({children, date}) {
    return (
        <>
            <div id={date} className="meetingDiv paddedNoTop">
                <h2 className="meetingH2">{date.slice(0,2)+"/"+date.slice(2,4)+"/"+date.slice(4,6)}</h2>
                <p className="article">
                    {children}
                </p>
            </div>
        </>
    )
}