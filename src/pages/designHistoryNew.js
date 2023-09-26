import Hero from "../components/Hero"
import prototype from "../assets/images/boatPrototype.jpeg"
import loading from "../assets/images/loading.gif"
import Gallery, { GalleryImage } from "../components/Gallery"
import { useEffect, useState } from "react"

export default function DesignHistory() {
    document.title = "The Mighty Pirates | Design History"
    const [allMeetings, setAllMeetings] = useState([])
    const [allTOC, setAllTOC] = useState([]);


    useEffect(() => {
        async function set() {
            let meetings = await AllMeetings();
            setAllMeetings(await meetings);
            setAllTOC(<TOC meetings={meetings} />);
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
                <ul className="toc">
                    {/* <TOCItem date="092123"></TOCItem> */}
                    {allTOC}
                </ul>
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
            {allTOCItems}
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
                let image = <GalleryImage featured={json2["featured"]} src={await json2["data"]} alt=""></GalleryImage> //data:image/png;base64,
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