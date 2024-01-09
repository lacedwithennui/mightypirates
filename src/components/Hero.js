import { useEffect, useState } from "react";
import { compress } from "./util";

export default function Hero({src, defaultSrc, title}) {
    const [imageUrl, setImageUrl] = useState(defaultSrc);
    useEffect(() => {
        async function set() {
            setImageUrl(await compress(src))
        }
        set();
    });

    return (
        <div id="heroContainer">
            <img src={imageUrl} id="hero" alt=""/>
            <h1>{title}</h1>
        </div>
    )
}