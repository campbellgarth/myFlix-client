import React from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';;
import { useState } from "react";


export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        //prevents default form behavior of reloading page
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
        };

        fetch("https://myflixmovies-72c1f6d2bace.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }).then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" >
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                    placeholder="Enter a username"
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter a password"
                />
            </Form.Group>
            <Button
                variant="primary"
                type="submit"
                className="back-button"
                style={{ cursor: "pointer" }}>
                Submit
            </Button>
        </Form>
    );
};