export default function Hero(props) {
    let src = props["src"]
    let title = props["title"]
    return (
        <div id="heroContainer">
            <img src={src} id="hero"/>
            <h1>{title}</h1>
        </div>
    )
}