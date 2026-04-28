package Simple.Movie.API;

import org.bson.types.ObjectId;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Answers;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
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
        when(reviewRepository.insert(any(Review.class))).thenAnswer(invocation -> {
            Review toInsert = invocation.getArgument(0, Review.class);
            toInsert.setId(new ObjectId());
            return toInsert;
        });

        Review result = reviewService.createReview("Fantastic Movie, really enjoyed it!", "1234567890");

        ArgumentCaptor<Review> reviewCaptor = ArgumentCaptor.forClass(Review.class);
        verify(reviewRepository).insert(reviewCaptor.capture());

        Review inserted = reviewCaptor.getValue();
        assertEquals("Fantastic Movie, really enjoyed it!", inserted.getBody());
        assertNotNull(inserted.getCreated());

        assertEquals(inserted, result);
        assertNotNull(result.getId());
        verify(mongoTemplate).update(Movie.class);
    }
}