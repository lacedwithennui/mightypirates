import Hero from "../components/Hero"
import prototype from "../assets/images/boatPrototype.jpeg"
import Gallery, { GalleryImage } from "../components/Gallery"
import { useEffect, useState } from "react"

export default function DesignHistory() {
    document.title = "The Mighty Pirates | Design History"
    const [allMeetings, setAllMeetings] = useState([])


    useEffect(() => {
        async function set() {
            setAllMeetings(await AllMeetings());
        }
        set();
    }, []);
    return (
        <>
            <Hero src={prototype} title="Design History" />
            <div id="mainContent">
                <h1 className="padded">Table of Contents</h1>
                <ul className="toc">
                    <TOCItem date="092123"></TOCItem>
                </ul>
                <h1 className="padded">Meetings</h1>
                {allMeetings}
            </div>
        </>
    )
}

function TOCItem({date}) {
    return (
        <>
            <li><h2><a href={"#" + date} className="tocitem">{date.slice(0,2)+"/"+date.slice(2,4)+"/"+date.slice(4,6)}</a></h2></li>
        </>
    )
}

function MeetingDay({children, date, description}) {
    return (
        <>
            <div id={date} className="meetingDiv paddedNoTop">
                <h2 className="meetingH2">{date.slice(0,2)+"/"+date.slice(2,4)+"/"+date.slice(4,6)}</h2>
                {children}
                <p className="article">
                    {description}
                </p>
            </div>
        </>
    )
}

async function AllMeetings() {
    let response = await fetch("http://mp.parkerdaletech.com:8080/db/site/posts");
    let json = await response.json();
    let allDays = [];
    for (let i = 0; i < json["posts"].length; i++) {
        let images = [];
        if(json["posts"][i]["images"]) {
            for(let j = 0; j < json["posts"][i]["images"].length; j++) {
                let response2 = await fetch("http://mp.parkerdaletech.com:8080/db/site/images/" + json["posts"][i]["images"][j]["$oid"]);
                let json2 = await response2.json();
                let image = <GalleryImage featured={(j <= 1)} src={await json2["data"]} alt=""></GalleryImage> //data:image/png;base64,
                images.push(image);
            }
        }
        allDays.push(
            <MeetingDay date={json["posts"][i]["dateString"]} description={json["posts"][i]["description"]}>
                <Gallery>
                    {images}
                </Gallery>
            </MeetingDay>
        );
    }
    return allDays
}