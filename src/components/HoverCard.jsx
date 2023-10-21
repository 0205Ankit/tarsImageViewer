import * as HoverCard from "@radix-ui/react-hover-card";
import { BiSolidUser } from "react-icons/bi"
import supabase from "../config/supabaseClient";
import { useToast } from "../hooks/useToast";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/store";
import { Link } from "react-router-dom";

const linkStyles =
    "py-1 px-2 hover:bg-slate-100 animate-fadeIn cursor-pointer rounded-md ";

export default function HoveredCard() {
    const {toast}=useToast()
    const { user } = useSelector(state => state.user);
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const logoutHandler=async()=>{
        const {error}=await supabase.auth.signOut()
        if(error){
            toast({
                title: "Logout",
                info: "Can't logout user",
                type: "error",
                code: "400",
            });
        }

        toast({
            title: "Logout",
            info: "User logged out successfully",
            type: "success",
            code: "200",
        });
        dispatch(userActions.setUserData({}))
        navigate("/")
    }

    return (
        <>
            {
                Object.keys(user).length !== 0 && <HoverCard.Root>
                    <HoverCard.Trigger asChild>
                       <div>
                            <BiSolidUser
                                className="block h-[35px] w-[35px] rounded-full cursor-pointer text-white"
                            />
                       </div>
                    </HoverCard.Trigger>
                    <HoverCard.Portal>
                    <HoverCard.Content
                        className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[230px] rounded-md bg-[#FFFFFF] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
                        sideOffset={5}
                    >
                        <div>
                            <div className="flex flex-col border-b-[0.5px] border-[#5C6C75] dark:border-[#4E535F] px-4 py-3">
                                <p className="text-xs font-semibold">
                                    {user.email}
                                </p>
                            </div>
                            <div className="flex flex-col border-b-[0.5px] text-[13px] border-[#5C6C75] dark:border-[#4E535F] px-3 py-2">
                                <Link className={linkStyles} to="/fav">
                                    <p>Favorites</p>
                                </Link>
                                {/* <a className={linkStyles}>
                                    <p>Collection</p>
                                </a> */}
                            </div>
                            <button onClick={logoutHandler} className="text-[15px] font-semibold px-4 py-3">Logout</button>
                        </div>

                        <HoverCard.Arrow className="fill-white" />
                    </HoverCard.Content>
                </HoverCard.Portal>
                </HoverCard.Root>
            }
        </>
    );
}
