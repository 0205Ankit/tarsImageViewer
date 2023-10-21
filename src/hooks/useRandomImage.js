import { useMemo } from "react";
import { useGetAllImagesQuery } from "../store/apiSlice";

export default function useRandomImage() {
  const { data, error ,isLoading} = useGetAllImagesQuery(30);
  const randomNumber=useMemo(()=>{
    return Math.floor(Math.random() * (29 - 0 + 1) + 0);
  },[])
  let imageUrl = "";

  if (data && !error) {
    imageUrl = data.hits[randomNumber].largeImageURL;
    return {imageUrl,isLoading:false,error:undefined};
  }

  return { imageUrl,isLoading ,error};
}
