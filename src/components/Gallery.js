import { useEffect, useState } from "react";
import { compress } from "./util";

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
    const [imageUrl, setImageUrl] = useState(src);
    useEffect(() => {
        async function set() {
            setImageUrl(await compress(src))
        }
        set();
    });

    return(
        <>
            <img className={featured ? "galleryimg featured" : "galleryimg"} src={imageUrl} alt={alt} />
        </>
    )
}

export function expandGalleryImage(event) {
    const sender = event.target;
    
}