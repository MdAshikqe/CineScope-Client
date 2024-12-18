/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes:["movies"],
  endpoints: (builder) => ({
    getMovies:builder.query({
      query:()=>({
        method:"GET",
        url:"/movies"
      }),
      providesTags:["movies"]
    }),
    
    addRating:builder.mutation({
      query:({data,slug})=>{
        return{
            method: "POST",
            url:`/movies/${slug}/review`,
            body:data,
        };
      },
      invalidatesTags:["movies"],
    }),

    // getSingleMovie: builder.query({
    //   query:(slug)=>({
    //     method:"GET",
    //     url:`/movies/${slug}`,
    //   }),
    //   providesTags:["movies"]
    // }),

    getMovieDetailsAndReview : builder.query({
      queryFn: async(slug:string):Promise<any>=>{
        try {
          const [movieResponse,reviewResponse]= await Promise.all([
            fetch(`http://localhost:5000/api/movies/${slug}`),
            fetch(`http://localhost:5000/api/movies/${slug}/reviews`),
          ])
          if(!movieResponse.ok || !reviewResponse.ok){
            throw new Error('Something Went Wrong!!!!')
          }
          const [movieData,reviewData]=await Promise.all([
            movieResponse.json(),
            reviewResponse.json()
          ])
          return {
            data:{
              movie:movieData,
              reviews:reviewData
            }
          }

        } catch (error) {
          return error;
        }
      },
      providesTags:["movies"],
    })


  }),
});

export const {useGetMoviesQuery,useAddRatingMutation,useGetMovieDetailsAndReviewQuery} = baseApi;
