import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";

interface MovieServiceParams {
  query: string;
  page?: number;
}
interface MovieResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}


export async function fetchMovies({ query, page = 1 }: MovieServiceParams): Promise<Movie[]> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  if (!token) {
    throw new Error("Помилка");
  }

  const options = {
    method: 'GET',
    url: BASE_URL,
    params: {
      query,
      page,
      include_adult: false,
      language: "en-US",
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request<MovieResponse>(options);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}