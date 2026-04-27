package Simple.Movie.API;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Answers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.mongodb.core.MongoTemplate;

@ExtendWith(MockitoExtension.class)
public class ReviewServiceTest {

    @Mock
    private ReviewRepository reviewRepository;

    @Mock(answer = Answers.RETURNS_DEEP_STUBS)
    private MongoTemplate mongoTemplate;

    @InjectMocks
    private ReviewService reviewService;

    @Test
    public void shouldCreateReview() {
        Review review = new Review();
        review.setId(new ObjectId());
        review.setBody("Fantastic Movie, really enjoyed it!");

        when(reviewRepository.insert(any(Review.class))).thenReturn(review);

        Review result = reviewService.createReview("Fantastic Movie, really enjoyed it!", "1234567890");

        assertEquals(review, result);
        verify(reviewRepository).insert(any(Review.class));
        verify(mongoTemplate).update(Movie.class);
    }
}