export default function Gallery({children}) {
    return(
        <>
            <div className="gallery">
                {children}
            </div>
        </>
    )
}

export function GalleryImage({featured, src, alt}) {
    return(
        <>
            <img className={featured ? "galleryimg featured" : "galleryimg"} src={src} alt={alt} />
        </>
    )
}