import { useEffect, useRef} from "react"
import Header from "../components/Header"
import ImageContainer from "../components/ImageContainer"
import InputBar from "../components/InputBar"
import useRandomImage from "../hooks/useRandomImage"
import {useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import { useSearchParams } from "react-router-dom"
import { showModalActions } from "../store/store"

export default function Home() {
    const { imageUrl, isLoading, error } = useRandomImage()
    const { data, isLoading: loading } = useSelector((state) => state.filterSearch)
    const myRef = useRef(null)
    const [params]=useSearchParams()
    const dispatch=useDispatch()

    const scrollToElement = () => {
        myRef.current?.scrollIntoView({ behavior: 'smooth', block: "start" });
    };

    useEffect(() => {
        scrollToElement()
    }, [data])

    return <>
        {
            isLoading ? <Loader/> :
                <>
                    {!error ?
                        <>
                            <div className="min-h-screen min-w-sreen bg-no-repeat pt-10"
                                style={{
                                    backgroundImage: `url(${imageUrl ? imageUrl : "/background.jpeg"})`,
                                    backgroundSize: "cover",
                                }}>
                                <Header title="Homepage"/>
                                <h1 className="text-7xl max-md:text-5xl mt-20 text-white w-[60%] mx-auto font-semibold text-center">Discover over 2,000,000 free stock Images</h1>
                                <InputBar />
                                <div className="header w-[20%] mx-auto max-md:w-[60%] max-md:text-sm text-white px-3 py-1 border-[1px]
                                     border-white rounded-md tracking-[0.5px] relative backdrop-blur-lg mt-5 font-sm">
                                    <p className="font-semibold">Trending: <span className="font-normal">flowers,love,forest,river</span></p>
                                </div>
                            </div>
                            {
                                data &&
                                <>
                                    {loading ?
                                        <div className="flex justify-center py-10">
                                            <div
                                                className="inline-block h-10 w-10 animate-spin rounded-full border-[5px] border-solid border-current border-r-transparent align-[-0.125em] text-black motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                                role="status"
                                            >
                                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                                    Loading...
                                                </span>
                                            </div>
                                        </div> : <>
                                            {
                                                data.length > 0 ? <div ref={myRef}>
                                                    <p className="text-center text-3xl font-semibold py-10 bg-slate-100">({data.length}) Images matches for your Search</p>
                                                    <ImageContainer data={data} />
                                                </div> : <h2 ref={myRef} className="text-center text-3xl font-semibold py-10">
                                                    Can't find any Images for your search
                                                </h2>
                                            }
                                        </>}
                                </>

                            }
                        </>
                        : <div className="min-h-screen min-w-sreen bg-no-repeat pt-10"
                            style={{
                                backgroundImage: `url(${imageUrl ? imageUrl : "/background.jpeg"})`,
                                backgroundSize: "100%",
                            }}>
                            <Header />
                            <h1 className="text-7xl mt-20 text-white w-[60%] mx-auto font-semibold text-center">Can't fetch Images</h1>
                        </div>}
                </>
        }
    </>
}

