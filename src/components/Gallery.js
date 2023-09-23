export default function Gallery(props) {
    let content = props["content"];
    return(
        <>
            <div className="gallery">
                {content}
            </div>
        </>
    )
}

export function GalleryImage(props) {
    return(
        <>
            <img className={props["featured"] ? "galleryimg featured" : "galleryimg"} src={props["src"]} alt={props["alt"]}></img>
        </>
    )
}