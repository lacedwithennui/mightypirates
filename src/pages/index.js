import nancy from "../assets/images/video1sc.png";
import Hero from "../components/Hero";

export default function Home() {
    return (
        <div id="mainContent">
            <Hero src={nancy} title="Alternative Fuel and Healing for Leaders" />
            <p class="article">
                <b>Wahe</b> is a kundalini yoga term meaning "wonderful beyond words." Creating your Wahe Life is all about empowering yourself to be an authentic leader.
            </p>
        </div>
    )
}