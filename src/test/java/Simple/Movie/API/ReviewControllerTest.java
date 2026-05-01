package Simple.Movie.API;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ReviewController.class)
public class ReviewControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ReviewService reviewService;

    @Test
    void shouldCreateReview() throws Exception {
        LocalDateTime created = LocalDateTime.of(2026, 4, 27, 10, 0, 0);

        Review review = new Review();
        review.setId(new ObjectId());
        review.setBody("Fantastic Movie, really enjoyed it!");
        review.setCreated(created);

        when(reviewService.createReview("Fantastic Movie, really enjoyed it!", "1234567890"))
                .thenReturn(review);

        mockMvc.perform(post("/api/v1/reviews")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "reviewBody": "Fantastic Movie, really enjoyed it!",
                      "imdbId": "1234567890"
                    }
                    """))
                .andExpect(status().isCreated())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.body").value("Fantastic Movie, really enjoyed it!"))
                .andExpect(jsonPath("$.id.timestamp").value(review.getId().getTimestamp()))
                .andExpect(jsonPath("$.created").value("2026-04-27T10:00:00"));

        verify(reviewService).createReview("Fantastic Movie, really enjoyed it!", "1234567890");
    }
}