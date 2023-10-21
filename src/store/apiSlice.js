import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
const apiKey = import.meta.env.VITE_API_KEY;

export const ImageApi = createApi({
  reducerPath: "ImageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://pixabay.com/api/`,
  }),
  tagTypes: ["Images"],
  endpoints: (builder) => ({
    getAllImages: builder.query({
      query: (number) => `?key=${apiKey}&per_page=${number}`,
      providesTags: ["Images"],
    }),
    getSingleImage: builder.query({
      query: (id) => `?key=${apiKey}&id=${id}`,
      providesTags: ["Images"],
    }),
  }),
});

export const { useGetAllImagesQuery,useGetSingleImageQuery} = ImageApi;

