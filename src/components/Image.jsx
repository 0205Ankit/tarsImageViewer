import { useEffect, useState } from "react"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import supabase from "../config/supabaseClient"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { useToast } from "../hooks/useToast"
import { currentUserActions, loadingScreenActions, showModalActions } from "../store/store"
import { RiShareCircleLine } from "react-icons/ri"


export default function Image({ imgObj }) {
    const [fillHeartIcon, setFillHeartIcon] = useState(false)
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const { toast } = useToast()
    const dispatch = useDispatch()
    const state=useSelector(state => state.currentUser.data)

    // const scrollToTop = () => {
    //     window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    //   };

    useEffect(() => {
        const asyncFunction = async () => {
            try {
                const favorites = state?.favorites

                if (favorites === null) {
                    setFillHeartIcon(false)
                } else {
                    const idArr = favorites[0].map(item => item.id)

                    if (idArr.includes(imgObj.id)) {
                        setFillHeartIcon(true)
                    } else {
                        setFillHeartIcon(false)
                    }
                }
            } catch (err) {
                console.log(err)
            }

        }
        asyncFunction()
    }, [])

    const addToFavoriteHandler = async () => {

        if (Object.keys(user).length === 0) {
            navigate("/login")
            return
        }
        try {
            dispatch(loadingScreenActions.setLoading(true))
            let favorites = {}

            // creates table with authId if not created already
            const { data, error } = await supabase
                .from("User")
                .select("authId")

            if (!error && data) {
                const existUser = data.filter(item => item.authId === user.id).length
                if (!existUser) {
                    const { data } = await supabase.from('User').insert({ "authId": user.id }).select()
                    // dispatch(currentUserActions.setcurrData(data))
                }
            }

            //gets row of a user
            const { data: oneUser } = await supabase
                .from("User")
                .select()
                .eq("authId", user.id)
                .single()


            //assigning value to favorites
            if (oneUser) {
                const prevFavorites = oneUser.favorites

                if (prevFavorites === null) {
                    favorites = { 0: [imgObj] }
                } else {
                    favorites = { 0: [...prevFavorites[0], imgObj] }
                }
            }

            // updating data
            const { data: updatedData } = await supabase.from("User")
                .update({
                    favorites,
                })
                .eq("authId", user.id)
                .select()

            dispatch(currentUserActions.setcurrData(updatedData[0]))

            //setting already liked Icon
            setFillHeartIcon(true)

            // toast message
            toast({
                title: "Add to Fav",
                info: "added to favorites successfully",
                type: "success",
                code: "200"
            })

            dispatch(loadingScreenActions.setLoading(false))

        } catch (err) {
            console.log(err)
            toast({
                title: "Add to Fav",
                info: "Can't add to favorites",
                type: "error",
                code: "400"
            })
            dispatch(loadingScreenActions.setLoading(false))
        }
    }

    const removeFromFav = async () => {
        try {
            dispatch(loadingScreenActions.setLoading(true))
            let favorites = {}

            //gets row of a user
            const { data: oneUser } = await supabase
                .from("User")
                .select()
                .eq("authId", user.id)
                .single()


            //assigning value to favorites
            const prevFavorites = oneUser.favorites
            const filterFav = prevFavorites[0].filter(item => item.id !== imgObj.id)
            favorites = { 0: filterFav }

            // updating data
            const { data: updatedData } = await supabase.from("User")
                .update({
                    favorites,
                })
                .eq("authId", user.id)
                .select()

            dispatch(currentUserActions.setcurrData(updatedData[0]))

            //setting already liked Icon
            setFillHeartIcon(false)

            // toast message
            toast({
                title: "Remove from Fav",
                info: "removed from favorites successfully",
                type: "success",
                code: "200"
            })

            dispatch(loadingScreenActions.setLoading(false))

        } catch (err) {
            console.log(err)
            toast({
                title: "Remove from Fav",
                info: "Can't remove from favorites",
                type: "error",
                code: "400"
            })
            dispatch(loadingScreenActions.setLoading(false))
        }
    }

    const shareHandler = () => {
        if (Object.keys(user).length === 0) {
            navigate("/login")
        }
        // dispatch(showModalActions.setShowModal(true))
        // scrollToTop()
        navigate(`?id=${imgObj.id}`)

    }

    return <>
        <div className="group rounded-lg relative overflow-hidden">
            <img src={imgObj.largeImageURL} />
            <div className="hidden absolute top-0 bg-[rgba(0,0,0,0.6)] w-full h-full group-hover:block">
                <div className="flex justify-center items-center w-full h-full text-3xl text-white gap-3">
                    <div onClick={shareHandler} className="cursor-pointer">
                        <RiShareCircleLine/>
                    </div>
                    <div className="cursor-pointer">
                        {fillHeartIcon ? <AiFillHeart onClick={removeFromFav} /> : <AiOutlineHeart onClick={addToFavoriteHandler} />}
                    </div>
                </div>
            </div>
        </div>
    </>
}