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
    const [imageUrl, setImageUrl] = useState("");
    useEffect(() => {
        async function set() {
            setImageUrl(await compress(src))
        }
        set();
    });

    return(
        <>
            <a className={featured ? "gallerya featured" : "gallerya"} href={imageUrl} target="_blank" rel="noreferrer"><img className="galleryimg" loading="lazy" src={imageUrl} alt={alt} /></a>
        </>
    )
}