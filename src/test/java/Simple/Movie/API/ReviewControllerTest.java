package Simple.Movie.API;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ReviewController.class)
public class ReviewControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ReviewService reviewService;

    @Test
    void shouldCreateReview() throws Exception {
        Review review = new Review();
        review.setId(new ObjectId());
        review.setBody("Fantastic Movie, really enjoyed it!");

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
                .andExpect(status().isCreated())   // or isOk(), depending on your controller
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.body").value("Fantastic Movie, really enjoyed it!"))
                // ObjectId is serialized as an object (date/timestamp) in this test context.
                .andExpect(jsonPath("$.id.timestamp").value(review.getId().getTimestamp()));

        verify(reviewService).createReview("Fantastic Movie, really enjoyed it!", "1234567890");
    }
}