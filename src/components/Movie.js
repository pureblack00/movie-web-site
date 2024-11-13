import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../css/Movie.css"; // 새로운 스타일 적용

function Movie({ id, coverImg, title, year, genres, summary }) {
  return (
    <div className="movie-card">
      <Link to={`/movie/${id}`}>
        <img src={coverImg} alt={title} className="movie-card__image" />
      </Link>
      <div className="movie-card__content">
        <h2 className="movie-card__title">
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <span className="movie-card__year">{year}</span>
        <ul className="movie-card__genres">
          {genres.map((genre) => (
            <li key={genre} className="movie-card__genre">
              {genre}
            </li>
          ))}
        </ul>
        <p className="movie-card__summary">{summary}</p>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  year: PropTypes.number.isRequired,
};

export default Movie;
