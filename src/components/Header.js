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
            <a href={href} className="navButton"><img src={img} className="navImage" alt={alt} /></a>
        )
    }
    else {
        return (
            <a className={lastchild ? "navButton lastNavItem" : "navButton"} href={href}><div className="navButtonTitle">{title}</div></a>
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