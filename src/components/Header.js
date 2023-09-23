import smallwahe from "../assets/images/smallwahe.png"
import menu from "../assets/images/menu.png"

function NavButton(props) {
    let title = props["title"];
    let href = props["href"];
    let id = props["id"];
    let imgid = props["imgid"];
    let img = props["img"];
    let alt = props["alt"];
    let lastchild = props["lastchild"]
    let onclick = props["onclick"]

    if(img) {
        return (
            <a href={href} className="navButton" id={id} onClick={onclick}><img src={img} className="navImage" alt={alt} id={imgid} /> <span className="navButtonTitle">{title}</span></a>
        )
    }
    else {
        return (
            <a className={lastchild ? "navButton lastNavItem" : "navButton"} href={href}><div className="navButtonTitle">{title}</div></a>
        )
    }
}

function expandMenu() {
    let container = document.querySelector("#headerButtons");
    if(!container.hasAttribute("style")) {
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.position = "absolute";
        container.style.top = "5vh";
        container.style.right = "0px";
        container.style.height = container.children.length * 5 + "vh"
        container.style.backgroundColor = "#fcfcfc"
        container.style.zIndex = "1";
        container.style.alignItems = "center";
        let children = container.querySelectorAll("a");
        children.forEach((child) => {
            child.style.width = "calc(100% - 20px)";
            child.style.justifyContent = "center";
        }) 
        // container.style.float = "right";
    }
    else {
        container.removeAttribute("style")
    }
}

export default function Header() {
    return (
        <div id="header">
            <NavButton img={""} href="/" id="navLogo" title="The Mighty Pirates" alt="The Mighty Pirates Logo" />
            <div id="rightAlignedChildren" className="headerChild">
                <div id="headerButtons">
                    <NavButton title="Home" href="/" id="home" />
                    <NavButton title="Design History" href="/about" id="about" />
                    <NavButton title="Contact Us" href="/contact" id="contact" lastchild />
                </div>
                <NavButton img={menu} alt="menu button" imgid="menuImg" id="menuButton" onclick={() => expandMenu()}></NavButton>
            </div>
        </div>
    )
}