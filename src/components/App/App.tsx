import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import type { Movie } from '../../types/movie';
import {fetchMovies} from '../../services/movieService';
import { useState } from 'react';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { toast } from 'react-hot-toast';
import  MovieModal  from '../MovieModal/MovieModal';




export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleSearch = async (query: string): Promise<void> => {  
        try {
            setIsLoading(true);
            setError(false);
            const data = await fetchMovies({ query });
            setMovies(data.results);
            if (data.results.length === 0) {
                toast.error('No movies found for your search.');
            }

        } catch (error) {
            console.error("Error fetching movies:", error);
            setError(true);
        }
        finally {
            setIsLoading(false);
        }
    }
    const handleSelect = (movie: Movie): void => {
        setSelectedMovie(movie);
        console.log('Selected movie:', movie);
    }
    return (
        <div className={css.app}>
            <SearchBar onSubmit={handleSearch} />
            {isLoading ? (
             <Loader />) : (
                <MovieGrid movies={movies} onSelect={handleSelect} />)}
            {error && (<ErrorMessage />) }
            {selectedMovie && (
  <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />)}
        </div>
    );
}