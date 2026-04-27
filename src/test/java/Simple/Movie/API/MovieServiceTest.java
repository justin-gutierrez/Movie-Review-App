package Simple.Movie.API;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class MovieServiceTest {
    @Mock
    private MovieRepository movieRepository;

    @InjectMocks
    private MovieService movieService;

    @Test
    public void shouldReturnAllMovies() {
        Movie movie1 = new Movie();
        movie1.setId(new ObjectId());
        movie1.setTitle("Inception");
        movie1.setReleaseDate("2010");
        movie1.setTrailerLink("trailer1");
        movie1.setPoster("poster1");

        Movie movie2 = new Movie();
        movie2.setId(new ObjectId());
        movie2.setTitle("Interstellar");
        movie2.setReleaseDate("2014");
        movie2.setTrailerLink("trailer2");
        movie2.setPoster("poster2");

        when(movieRepository.findAll()).thenReturn(List.of(movie1, movie2));
        List<Movie> result = movieService.getAllMovies();
        assertEquals(2, result.size());
        assertEquals("Inception", result.get(0).getTitle());
        assertEquals("Interstellar", result.get(1).getTitle());
        verify(movieRepository).findAll();
    }

    @Test
    public void shouldReturnSingleMovie() {
        Movie movie = new Movie();
        movie.setId(new ObjectId());
        movie.setImdbId("1234567890");
        movie.setTitle("Inception");
        movie.setReleaseDate("2010");
        movie.setTrailerLink("trailer1");
        movie.setPoster("poster1");
        
        when(movieRepository.findMovieByImdbId("1234567890"))
        .thenReturn(Optional.of(movie));

        Optional<Movie> result = movieService.SingleMovie("1234567890");
        
        assertEquals("Inception", result.get().getTitle());
        assertEquals("1234567890", result.get().getImdbId());
        assertEquals("2010", result.get().getReleaseDate());
        assertEquals("trailer1", result.get().getTrailerLink());
        assertEquals("poster1", result.get().getPoster());
        assertTrue(result.isPresent());
        verify(movieRepository).findMovieByImdbId("1234567890");
    }
}
