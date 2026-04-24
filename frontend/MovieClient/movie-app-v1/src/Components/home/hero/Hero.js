import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function toYouTubeWatchUrl(input) {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();

  // If backend stored just the YouTube id.
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return `https://www.youtube.com/watch?v=${trimmed}`;
  }

  // If backend stored a URL missing protocol.
  if (trimmed.startsWith('www.')) return `https://${trimmed}`;

  return trimmed;
}

const Hero = ({ movies = [] }) => {
  const navigate = useNavigate();
  return (
    <div className="movie-carousel-container">
      <Carousel>
        {movies.map((movie) => (
          <Paper key={movie.id ?? movie.imdbId ?? movie.title}>
            <div className="movie-card-container">
              <div
                className="movie-card"
                style={{ '--img': `url(${movie.backdrops?.[0] ?? ''})` }}
              >
                <div className="movie-detail">
                  <div className="movie-poster">
                    <img src={movie.poster ?? movie.poster_url} alt={movie.title ?? ''} />
                  </div>
                  <div className="movie-title">
                    <h4>{movie.title}</h4>
                  </div>
                  <div className="movie-buttons-container">
                    {toYouTubeWatchUrl(movie.trailerLink) ? (
                      <a
                        href={toYouTubeWatchUrl(movie.trailerLink)}
                        className="play-button-icon-container"
                        aria-label={`Open trailer for ${movie.title ?? 'movie'} on YouTube`}
                      >
                        <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay} />
                      </a>
                    ) : null}
                  </div>
                  <div className="movie-button-container">
                    <Button
                      variant="info"
                      onClick={() => navigate(`/movie/${movie.imdbId ?? movie.id}`)}
                    >
                      Reviews
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;

