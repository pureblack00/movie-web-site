import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Movie from "../components/Movie";
import "../css/Home.css";
import logo from "../img/logo.png";
import heart from "../img/heart.png";
import user from "../img/user.png";
import P1 from "../img/P1.png";
import P2 from "../img/P2.png";
import P3 from "../img/P3.png";
import P4 from "../img/P4.png";
import P5 from "../img/P5.png";
import { Helmet } from "react-helmet";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(""); // 선택된 장르 상태 추가

  const genres = [
    "Animation",
    "Family",
    "Action",
    "Documentary",
    "Music",
    "Crime",
    "Drama",
    "Adventure",
    "Mystery",
    "Sci-Fi",
    "Comedy",
    "Reality-TV",
    "Sport",
    "Talk-Show",
    "Biography",
    "History",
    "War",
    "Romance",
  ]; // 표시할 장르 목록

  const getMovies = async () => {
    const json = await (
      await fetch("https://yts-proxy.now.sh/list_movies.json?sort_by=rating")
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(movies);

  return (
    <div>
      <Helmet>
        <title>Movie Moa</title> {/* 페이지 제목 설정 */}
      </Helmet>
      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <div className="default">
          <header className="header">
            <Link to="/">
              <img src={logo} className="header__title" alt="Logo" />
            </Link>
            <div className="header__icons">
              <img
                src={heart}
                className="header__icons__img"
                alt="Heart Icon"
              />
              <img src={user} className="header__icons__img" alt="User Icon" />
            </div>
          </header>
          <h1 className="banner">
            <Link to="/movie/59500">
              <img src={P1} className="Ps" alt="Banner 1" />
            </Link>
            <Link to="/movie/30440">
              <img src={P2} className="Ps" alt="Banner 2" />
            </Link>
            <Link to="/movie/3709">
              <img src={P3} className="Ps" alt="Banner 3" />
            </Link>
            <Link to="/movie/15553">
              <img src={P4} className="Ps" alt="Banner 4" />
            </Link>
            <Link to="/movie/15527">
              <img src={P5} className="Ps" alt="Banner 5" />
            </Link>
          </h1>
          <h2 className="category">
            {/* 장르 선택 버튼들 */}
            {genres.map((genre) => (
              <button
                key={genre}
                className={`genre-button ${
                  selectedGenre === genre ? "active" : ""
                }`}
                onClick={() =>
                  setSelectedGenre(genre === selectedGenre ? "" : genre)
                }
              >
                {genre}
              </button>
            ))}
          </h2>
          <main>
            <div className="content_container">
              <div className="content_grid">
                {movies
                  .filter((movie) =>
                    selectedGenre ? movie.genres.includes(selectedGenre) : true
                  )
                  .map((movie) => (
                    <Movie
                      key={movie.id}
                      id={movie.id}
                      coverImg={movie.medium_cover_image}
                      title={movie.title}
                      year={movie.year}
                      genres={movie.genres}
                      summary={movie.summary}
                    />
                  ))}
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default Home;
