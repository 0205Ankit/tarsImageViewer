import { Auth } from "@supabase/auth-ui-react"
import supabase from "../config/supabaseClient"
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { userActions } from "../store/store"
import { useToast } from "../hooks/useToast"

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === "SIGNED_IN") {
                dispatch(userActions.setUserData(session.user))
                navigate("/")
                return
            } else {
                dispatch(userActions.setUserData({}))
            }
        })
    }, [])

    return <>
        <div className="w-3/12 max-md:w-8/12 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
            <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="dark"
                providers={[]}
            />
        </div>
    </>
}