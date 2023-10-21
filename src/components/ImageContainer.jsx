import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Image from "./Image"


export default function ImageContainer({data}) {

    return <>
        <div className="pt-[50px] pb-[100px] bg-slate-100">
            <div className=" w-screen">
                <ResponsiveMasonry
                    className="w-[95%] mx-auto "
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}
                >
                    <Masonry gutter="20px">
                        {
                            data.map((hit) => {
                                return <Image imgObj={hit} key={hit.id} />
                            })
                        }
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </div>
    </>
}