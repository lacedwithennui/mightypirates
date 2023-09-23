export default function Hero({src, title}) {
    return (
        <div id="heroContainer">
            <img src={src} id="hero" alt=""/>
            <h1>{title}</h1>
        </div>
    )
}