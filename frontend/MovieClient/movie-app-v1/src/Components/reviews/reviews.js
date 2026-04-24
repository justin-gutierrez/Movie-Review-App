import React, { useEffect, useRef } from 'react'
import api from '../../API/AxiosConfig'
import ReviewForm from '../ReviewForm/ReviewForm'
import {useParams} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'


const Reviews = ({ getMovieData, movie, reviews = [], setReviews }) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, []);

    const addReview = async (e) => {

        try {
            e.preventDefault();
            const reviewBody = revText.current.value;
            await api.post('/api/v1/reviews', { reviewBody, imdbId: movieId });
            const updatedReviews = [...reviews, { body: reviewBody }];
            revText.current.value = '';
            setReviews(updatedReviews);
        } catch (e) {
            console.log(e);
        }
    }
  return (
    <Container>
        <Row>
            <Col>
                <h3>Reviews</h3>
            </Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster ?? movie?.poster_url} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm
                                  handleSubmit={addReview}
                                  revText={revText}
                                  labelText="Write a Review?"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                } 
                {
                    reviews?.map((review) => {
                        return (
                            <React.Fragment key={review.id ?? review.body}>
                            <Row>
                                <Col>
                                    {review.body}
                                </Col>
                            </Row>
                            </React.Fragment>
                        )
                    })
                }

            </Col>
        </Row>
    </Container>
  )
}

export default Reviews