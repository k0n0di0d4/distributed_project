import logo from './logo.svg';
import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Container, Nav, Navbar, Button} from "react-bootstrap";
import './App.css';
import Login from "./Login/Login"
class App extends Component{
  render() {
    return (
        <Router>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">MessageApp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Nav className="me-auto">
                        <Nav.Link href={"/login"}>Log In</Nav.Link>
                        <Button href={"/registration"} variant="primary">Sign In</Button>
                        <Nav.Link href={"/message"}>Message</Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
            <Routes>
                <Route path={"Login"} element={<Login/>}/>
            </Routes>
        </Router>

    );
  }
}

export default App;
