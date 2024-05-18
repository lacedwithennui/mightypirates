import { useEffect, useState } from "react";
import { compress } from "./util";

export default function Hero({src, title}) {
    const [imageUrl, setImageUrl] = useState(src);
    // useEffect(() => {
    //     // if(imageUrl === src || imageUrl === "" || imageUrl === undefined) {
    //     async function set() {
    //         setImageUrl(await compress(src))
    //     }
    //         // setImageUrl(compress(src))
    //         // console.log("IMGURL " + imageUrl)
    //     set();
    //     // }
    // });

    return (
        <div id="heroContainer">
            <img src={imageUrl} id="hero" alt=""/>
            <h1>{title}</h1>
        </div>
    )
}