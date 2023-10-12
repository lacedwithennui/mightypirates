import Hero from "../components/Hero"
import prototype from "../assets/images/boatPrototype.jpeg"
import loading from "../assets/images/loading.gif"
import { useEffect, useState } from "react"
import { AllMeetings } from "../components/api"
import TOCItem from "../components/TOCItem";

/**
 * The Design History page of the website
 */
export default function DesignHistory() {
    document.title = "The Mighty Pirates | Design History"
    // Set empty state for meeting and table of contents components
    const [toc, setTOC] = useState(<></>);
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

function TOC({meetings}) {
    let allTOCItems = [];
    for (let i = 0; i < ( meetings).length; i++) {
        const meeting = ( meetings)[i];
        allTOCItems.push(<TOCItem key={meeting.props.date} date={meeting.props.date} />)
    }
    return(
        <>
            <ul className="toc">
                {allTOCItems}
            </ul>
        </>
    )
}

