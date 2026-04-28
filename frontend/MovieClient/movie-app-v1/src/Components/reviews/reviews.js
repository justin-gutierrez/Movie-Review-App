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
    }, [movieId]);

    const addReview = async (e) => {

        try {
            e.preventDefault();
            const reviewBody = revText.current.value;
            await api.post('/api/v1/reviews', { reviewBody, imdbId: movieId });
            revText.current.value = '';
            getMovieData(movieId);
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
                            <React.Fragment key={review.id?.timestamp ?? review.body}>
                                <Row className="mb-2">
                                    <Col>
                                        <div>{review.body}</div>
                                        <small className="fw-bold" style={{ fontSize: '14px', color: 'white' }}>
                                            {review.created
                                                ? new Date(review.created).toLocaleString([], {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: '2-digit'               
                                                })
                                                : ""}
                                            </small>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr className="my-3" />
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