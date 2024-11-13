import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/Home.css";
import logo from "../img/logo.png";
import heart from "../img/heart.png";
import user from "../img/user.png";
import { Helmet } from "react-helmet";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    const movieData = json.data.movie;
    setMovie(movieData);

    const similarResponse = await fetch(
      "https://yts.mx/api/v2/list_movies.json?sort_by=rating"
    );
    const similarJson = await similarResponse.json();
    const allMovies = similarJson.data.movies;

    const similarMovies = allMovies.filter(
      (m) =>
        m.id !== movieData.id &&
        m.genres.some((genre) => movieData.genres.includes(genre))
    );

    setRecommendedMovies(similarMovies);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, [id]);

  return (
    <div>
      <div className="default">
        <header className="header">
          <Link to="/">
            <img src={logo} className="header__title" alt="Logo" />
          </Link>
          <div className="header__icons">
            <img src={heart} className="header__icons__img" alt="Heart Icon" />
            <img src={user} className="header__icons__img" alt="User Icon" />
          </div>
        </header>
        {loading ? (
          <h1 className="loading">Loading...</h1>
        ) : (
          <div>
            <div className="movie-card2">
              <img
                className="movie-card__image2"
                src={movie.medium_cover_image}
                alt={movie.title}
              />
              <div className="movie-card__content2">
                <h1 className="movie-card__title2">{movie.title}</h1>
                <h2 className="movie-card__year2">{movie.year}</h2>

                <h3 className="movie-card__genre2">
                  {movie.genres &&
                    movie.genres.map((genre, index) => (
                      <span key={index} className="movie-card__genre-item2">
                        {genre}
                      </span>
                    ))}
                </h3>

                <p className="movie-card__summary2">{movie.description_full}</p>
              </div>
            </div>

            {/* 추천 영화 섹션 */}
            <div
              className={`recommended-section ${
                recommendedMovies.length < 3 ? "compact" : ""
              }`}
            >
              <div className="recommended-title-container">
                <h2 className="recommended-title">비슷한 장르를 찾는다면?</h2>
              </div>
              <div className="recommended-movies">
                {recommendedMovies.map((recMovie) => (
                  <div key={recMovie.id} className="recommended-movie-card">
                    {/* 이미지에 Link 추가 */}
                    <Link to={`/movie/${recMovie.id}`}>
                      <img
                        src={recMovie.medium_cover_image}
                        alt={recMovie.title}
                        className="recommended-movie-image"
                      />
                    </Link>
                    {/* 제목에 Link 추가 */}
                    <Link to={`/movie/${recMovie.id}`}>
                      <p className="recommended-movie-title">
                        {recMovie.title}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;
