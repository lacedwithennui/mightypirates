import Hero from "../components/Hero"
import prototype from "../assets/images/boatPrototype.jpeg"
import loading from "../assets/images/loading.gif"
import Gallery from "../components/Gallery"
import { useEffect, useState } from "react"
import { getImages } from "../components/api"

/**
 * The Design History page of the website
 */
export default function DesignHistory() {
    document.title = "The Mighty Pirates | Design History"
    // Set empty state for meeting and table of contents components
    const [toc, setTOC] = useState();
    const [allMeetings, setAllMeetings] = useState([]);

    useEffect(() => {
        async function set() {
            let meetings = await AllMeetings();
            // set the meetings array to the actual meetings once loaded
            setAllMeetings(meetings);
            // set the toc to the actual toc once loaded
            setTOC(<TOC meetings={meetings} />);
            // hide all loading gifs
            for(let i = 0; i < document.getElementsByClassName("loading").length; i++) {
                let loadingGif = document.getElementsByClassName("loading")[i]
                loadingGif.style.display = "none";
            }
        }
        set();
    }, []);
    return (
        <>
            <Hero src={prototype} title="Design History" />
            <div id="mainContent">
                <h1 className="padded">Table of Contents</h1>
                <img className="loading paddedNoVertical" src={loading} alt="loading..." />
                {toc}
                <h1 className="padded">Meetings</h1>
                <img className="loading paddedNoVertical" src={loading} alt="loading..." />
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

function TOC({meetings}) {
    let allTOCItems = [];
    for (let i = 0; i < ( meetings).length; i++) {
        const meeting = ( meetings)[i];
        allTOCItems.push(<TOCItem date={meeting.props.date} />)
    }
    return(
        <>
            <ul className="toc">
                {allTOCItems}
            </ul>
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
    let response = await fetch("http://localhost:8080/db/site/posts");
    let json = await response.json();
    let allDays = [];
    for (let i = 0; i < json["posts"].length; i++) {
        let images = [];
        if(json["posts"][i]["images"]) {
            images = await getImages(json["posts"][i]["images"])
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