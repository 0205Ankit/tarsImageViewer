import { RxCross2 } from "react-icons/rx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetSingleImageQuery } from "../store/apiSlice";
import { useDispatch } from "react-redux";
import { showModalActions } from "../store/store";
import Loader from "./Loader";
import { useState } from 'react'

export default function Modal() {
    const dispatch = useDispatch();
    const [params, setSearchParams] = useSearchParams();
    const { data, error, isLoading } = useGetSingleImageQuery(params.get("id"));
    const navigate = useNavigate();
    const [size, setSize] = useState("340");

    const closeModalHandler = () => {
        dispatch(showModalActions.setShowModal(false));
        setSearchParams({})
    };

    const handleDownloadImage = () => {
        const imgUrl =
            size === "1280"
                ? data.hits[0].largeImageURL
                : size === "640"
                    ? data.hits[0].webformatURL
                    : data.hits[0].webformatURL.split("_")[0] + "_340.jpg";

        fetch(imgUrl)
            .then((res) => res.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;

                const filename = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
                link.setAttribute("download", filename);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    console.log(data?.hits);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                        <div onClick={() => { dispatch(showModalActions.setShowModal(false)); setSearchParams({}); }} className="fixed w-screen min-h-screen bg-[rgba(0,0,0,0.5)] backdrop-blur-xl top-0 z-2" />
                    {data && !error ? (
                        <div className="w-screen min-h-screen relative">
                            <div className="fixed z-10 top-2/4 left-2/4 w-10/12 bg-slate-100 rounded-md -translate-x-2/4 -translate-y-2/4 overflow-hidden ">
                                <div className="py-3 px-10 max-md:p-[8px_20px] text-xl font-semibold text-black bg-slate-200 flex items-center justify-between">
                                    Preview Id: {data.hits[0].id}{" "}
                                    <button onClick={closeModalHandler} className="outline-none">
                                        <RxCross2 />
                                    </button>
                                </div>

                                <div className="my-7 px-10 max-md:px-[20px] flex max-md:flex-col gap-10">
                                    <img
                                        src={data.hits[0].largeImageURL}
                                        alt="image"
                                        className="rounded-md h-[450px] max-md:h-[200px] w-[70%] max-md:w-full"
                                    />

                                    <div className="w-[30%] max-md:w-full">
                                        <div>
                                            <p className="text-xl text-black font-semibold">
                                                Download
                                            </p>
                                            <form
                                                className="mt-2"
                                                onChange={(e) => setSize(e.target.value)}
                                                value={size}
                                            >
                                                <label
                                                    htmlFor="1"
                                                    className="flex px-5 py-2 hover:bg-slate-300 border-[1px] border-slate-300 justify-between rounded-md cursor-pointer"
                                                >
                                                    Small (340 x 640)
                                                    <input
                                                        className="cursor-pointer"
                                                        type="radio"
                                                        id="1"
                                                        value="340"
                                                        name="resolution"
                                                        checked={size === "340"}
                                                    />
                                                </label>
                                                <label
                                                    htmlFor="2"
                                                    className="flex px-5 py-2 hover:bg-slate-300 border-[1px] border-slate-300 justify-between rounded-md cursor-pointer"
                                                >
                                                    Medium (640 x 960)
                                                    <input
                                                        className="cursor-pointer"
                                                        type="radio"
                                                        id="2"
                                                        value="640"
                                                        name="resolution"
                                                        checked={size === "640"}
                                                    />
                                                </label>
                                                <label
                                                    htmlFor="3"
                                                    className=" flex px-5 py-2 hover:bg-slate-300 border-[1px] border-slate-300 justify-between rounded-md cursor-pointer"
                                                >
                                                    Large (1280 x 720)
                                                    <input
                                                        className="cursor-pointer"
                                                        type="radio"
                                                        id="3"
                                                        value="1280"
                                                        name="resolution"
                                                        checked={size === "1280"}
                                                    />
                                                </label>
                                                <button
                                                    onClick={handleDownloadImage}
                                                    type="button"
                                                    className="mt-5 rounded-md bg-green-500 text-white text-sm font-semibold py-2 w-full"
                                                >
                                                    Download for free!
                                                </button>
                                            </form>
                                        </div>

                                        <div>
                                            <p className="text-xl text-black font-semibold mt-5">
                                                Information
                                            </p>
                                            <div className="mt-5">
                                                <div className="w-full grid grid-cols-3 gap-5 justify-between ">
                                                    <div>
                                                        <p className="text-slate-700 text-sm">User</p>
                                                        <h2 className="text-black text-sm font-semibold">
                                                            {data.hits[0].user}
                                                        </h2>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-700 text-sm">User ID</p>
                                                        <h2 className="text-black text-sm font-semibold">
                                                            {data.hits[0].user_id}
                                                        </h2>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-700 text-sm">Type</p>
                                                        <h2 className="text-black text-sm font-semibold">
                                                            {data.hits[0].type}
                                                        </h2>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-700 text-sm">Likes</p>
                                                        <h2 className="text-black text-sm font-semibold">
                                                            {data.hits[0].likes}
                                                        </h2>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-700 text-sm">Downloads</p>
                                                        <h2 className="text-black text-sm font-semibold">
                                                            {data.hits[0].downloads}
                                                        </h2>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-700 text-sm">Views</p>
                                                        <h2 className="text-black text-sm font-semibold">
                                                            {data.hits[0].views}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-5 flex items-center px-10 ">
                                    <p className="font-semibold">Tags: </p>
                                    {data.hits[0].tags.split(",").map((tag, i) => {
                                        return (
                                            <p
                                                key={i}
                                                className="px-4 text-xs py-1 rounded-sm bg-slate-200 mx-2"
                                            >
                                                {tag}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="fixed w-screen h-screen bg-[rgba(0,0,0,0.5)] backdrop-blur-xl top-0" />
                            <div className="top-2/4 left-2/4 w-9/12 bg-slate-100 rounded-md -translate-x-2/4 text-black -translate-y-2/4 overflow-hidden text-center">
                                Something Went Wrong ...
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
}
