import { useSelector } from "react-redux";
import HoveredCard from "./HoverCard";
import { Link } from "react-router-dom";

export default function Header(props) {

    const {user}=useSelector(state=>state.user);

    return <>
        <div className="header w-[95%] mx-auto text-white flex justify-between px-10 max-md:py-2 py-4 border-[2px]
    text-lg font-semibold border-white rounded-md tracking-[0.5px] relative backdrop-blur-lg">
            <h2>{props.title}</h2>
            {Object.keys(user).length !== 0 ? <HoveredCard/> : <div>
                <Link to="login">Login</Link>
            </div>}
        </div>
    </>
}