import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);


    useEffect(() => {
        if (!token) return;
        fetch("https://myflixmovies-72c1f6d2bace.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        Title: movie.Title,
                        imgURL: movie.imgURL,
                        Description: movie.Description,
                        Genre: {
                            Name: movie.Genre.Name
                        },
                        Director: {
                            Name: movie.Director.Name
                        },
                        Year: movie.Year,

                    };
                });
                setMovies(moviesFromApi);
            });
    }, [token]);

    if (!user) {
        return (
            <>
                <LoginView
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }}
                />
                or Sign Up:
                <SignupView />
            </>
        );
    }


    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }
    if (movies.length === 0) {
        return <div>Movies are loading. Please wait...</div>;
    }
    return (
        <div>
            <Row className="justify-content-md-center">
                {!user ? (
                    <Col md={5}>
                        <LoginView onLoggedIn={(user) => setUser(user)} />
                        or Sign up:
                        <SignupView />
                    </Col>
                ) : selectedMovie ? (
                    <Col md={8}>
                        <MovieView
                            movie={selectedMovie}
                            onBackClick={() => setSelectedMovie(null)}
                        />
                    </Col>
                ) : movies.length === 0 ? (
                    <div>Movies are loading. Please wait...</div>
                ) : (
                    <>
                        {movies.map((movie) => (
                            <Col className="mb-5" key={movie.id} md={3}>
                                <MovieCard
                                    movie={movie}
                                    onMovieClick={(newSelectedMovie) => {
                                        setSelectedMovie(newSelectedMovie);
                                    }}
                                />
                            </Col>
                        ))}
                    </>
                )};
            </Row>
            <div>
                <button
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                    className="back-button"
                    style={{ cursor: "pointer" }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};
