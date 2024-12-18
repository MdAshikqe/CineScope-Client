import { MovieCard } from "@/components/MovieCard/MovieCard";
import { useGetMoviesQuery } from "@/redux/api/api";
import { TMovie } from "@/types";

export default function Movies() {
  const { data, isLoading } = useGetMoviesQuery({});

  if (isLoading) {
    return (
      <p className="text-2xl text-yellow-500 flex justify-center items-center">
        Loading........
      </p>
    );
  }
  const { data: movies } = data;
  return (
    <div className="container mx-auto">
      <h1>All Movies</h1>
      <div className="grid grid-cols-4 gap-4">
        {movies.map((movie: TMovie) => (
          <MovieCard key={movie?._id} movie={movie}></MovieCard>
        ))}
      </div>
    </div>
  );
}
