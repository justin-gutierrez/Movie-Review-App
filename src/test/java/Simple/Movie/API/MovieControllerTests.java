package Simple.Movie.API;

import java.util.List;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;



@WebMvcTest(MovieController.class)

    // /api/v1/movies hits MovieController 
    // -> MovieController runs movieService.getallMovies()
    // -> Mockito intercepts that service call
    // -> Mockito returns List.of(movie1)
    // -> controller returns it
    // -> Spring turns it into JSON
    // -> controller returns it
    // -> Spring turns it into JSON
    
public class MovieControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private MovieService movieService;

    @Test
    void shouldReturnAllMovies() throws Exception {
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

        when(movieService.getAllMovies()).thenReturn(List.of(movie1, movie2));

        mockMvc.perform(get("/api/v1/movies"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].title").value("Inception"))
                .andExpect(jsonPath("$[0].releaseDate").value("2010"))
                .andExpect(jsonPath("$[0].trailerLink").value("trailer1"))
                .andExpect(jsonPath("$[0].poster").value("poster1"));
    }
}