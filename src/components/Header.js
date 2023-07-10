import smallwahe from "../assets/images/smallwahe.png"
import { Link, NavMenu } from "react-router-dom";

function NavButton(props) {
    let title = props["title"];
    let href = props["href"];
    let id = props["id"];
    let img = props["img"];
    let alt = props["alt"];
    let lastchild = props["lastchild"]

    if(img) {
        return (
            // <div id={id} class="navButton">
                <a href={href} className="navButton"><img src={img} class="navImage" alt={alt} /></a>
            // </div>
        )
    }
    else {
        return (
            // <div id={id} class={lastchild ? "navButton lastNavItem" : "navButton"}>
                <a class={lastchild ? "navButton lastNavItem" : "navButton"} href={href}><div class="navButtonTitle">{title}</div></a>
            // </div>
        )
    }
}

export default function Header() {
    return (
        <div id="header">
            <NavButton img={smallwahe} href="/" id="navLogo" alt="Wahe Life Snake Logo"></NavButton>
            <div id="RightAlignedChildren">
                <NavButton title="Home" href="/" id="home" />
                <NavButton title="About" href="/about" id="about" />
                <NavButton title="Contact Us" href="/contact" id="contact" lastchild />
            </div>
        </div>
    )
}