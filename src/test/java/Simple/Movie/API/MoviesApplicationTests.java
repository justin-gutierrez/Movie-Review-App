package Simple.Movie.API;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
class MoviesApplicationTests {

	@Test
	void contextLoads() {
	}

}
// tests moviecontroller getallmovies method using MockMVC for real http requests
@WebMvcTest(MovieController.class)
class MovieControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private MovieService movieService;

    @Test
    void shouldReturnAllMovies() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/movies"))
               .andExpect(MockMvcResultMatchers.status().isOk());
    }
}