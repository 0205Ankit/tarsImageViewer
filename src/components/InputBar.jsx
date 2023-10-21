import { useState } from "react"
import { BiSearch } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { filterSearchActions } from "../store/store"
import { useGetAllImagesQuery } from "../store/apiSlice"

export default function InputBar() {

    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    const { data } = useGetAllImagesQuery(200)


    const searchHandler = (e) => {
        setSearch(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        try {
            if (data) {
                const filterSearch = data.hits.filter((item) => item.tags.includes(search.toLowerCase()))
                    dispatch(filterSearchActions.setData({filterSearch,isLoading:false}))
                return
            }
            dispatch(filterSearchActions.setData({ filterSearch:null, isLoading: false }))

        } catch (err) {
            console.log(err)
        }

    }

    return <>
        <form onSubmit={submitHandler} className="mt-16 header w-[60%] mx-auto text-white flex justify-between px-5 py-2 border-[2px]
     font-semibold border-white bg-transparent outline-none rounded-md tracking-[0.5px] relative backdrop-blur-lg">
            <div className="flex items-center gap-3 w-[90%]">
                <label htmlFor="search" className="text-3xl max-md:text-2xl">
                    <BiSearch />
                </label>
                <input
                    id="search"
                    type="text"
                    autoFocus
                    className="bg-transparent outline-none text-2xl max-md:text-xl w-full"
                    onChange={searchHandler}
                />
            </div>
            {
                search.length > 1 && <button type="submit" className="py-1 px-4 rounded-lg border-[2px] border-white">
                    Go!
                </button>
            }
        </form>
    </>
}