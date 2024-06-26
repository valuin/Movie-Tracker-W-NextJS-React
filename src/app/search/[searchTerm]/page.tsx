"use client";
import React from "react";
import MovieCard from "@/components/component/moviecard";
import Navbar from "@/components/component/navbarmovie";
import Footer from "@/components/component/footer";
import UseMovieSearch from "@/hooks/useMovieSearch";
import MovieCardSkeleton from "@/components/skeleton/mvCardSkeleton";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}
interface Param {
  searchTerm: string;
}

export default function searchResults({ params }: { params: Param }) {
  const { searchTerm } = params;
  const { loading, movies } = UseMovieSearch(searchTerm);

  if (loading) {
    return (
      <div className="flex flex-col overflow-x-hidden bg-neutral-950">
        <Navbar />
        <div className="grid grid-cols-1 gap-4 justify-center items-center md:grid-cols-2 xl:grid-cols-4 p-5 mt-36 ml-6">
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <div className="m-4" key={index}>
                <MovieCardSkeleton />
              </div>
            ))}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-neutral-950">
      <Navbar />

      <div className="mx-auto mt-28 w-full h-full flex flex-col justify-end">
        <h2 className="text-2xl ml-20 mb-5 font-semibold text-neutral-50">
          {`Search results for: ${searchTerm.replace(/%20/g, " ")}`}
        </h2>
        <div className="grid grid-cols-1 gap-4 justify-center items-center mt-4 ml-6 md:grid-cols-2 xl:grid-cols-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            movies.map((movie: Movie) => (
              <MovieCard
                key={Number(movie.id)}
                id={Number(movie.id)}
                title={movie.title}
                posterUrl={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : null
                }
                isLoading={loading}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
