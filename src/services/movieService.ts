import axios from "axios";
import type { MovieDetails } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";

interface MovieServiceParams {
  query: string;
  page?: number;
}

export async function fetchMovies({ query, page = 1 }: MovieServiceParams): Promise<MovieDetails> {
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
    const response = await axios.request<MovieDetails>(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}