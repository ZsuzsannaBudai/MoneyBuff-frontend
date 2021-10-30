import './StatisticsCSS.css';
import React, {Fragment} from "react";
import {useHistory} from "react-router-dom";
import background from "../main-page/mainPageBackground.jpg";
import {Button, Container, FloatingLabel, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import littleLogo from "../main-page/signin_icon.png";

export const Statistics = () => {
    const history = useHistory();

    function handleRouteToHome() {
        history.push("/mainpage");
    }

    function handleRouteToStatistics() {
        history.push("/statistics");
    }

    function handleRouteToSaveMoney() {
        history.push("/savemoney");
    }

    function handleRouteToAccount() {
        history.push("/account");
    }

    function handleRouteToLogOut() {
        history.push("/logout");
    }


    return (
        <Fragment>
            <div className="mainPageBackground" style={{backgroundImage: `url(${background})`}}>
                <div>
                    <Navbar fixed="top" bg="light">
                        <Container>
                            <img className="littleLogo" src={littleLogo} alt=""/>
                            <Navbar.Brand href="#home">MoneyBuffer</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link onClick={handleRouteToHome}>Home</Nav.Link>
                                <Nav.Link onClick={handleRouteToStatistics}>Statistics</Nav.Link>
                                <Nav.Link onClick={handleRouteToSaveMoney}>Save Money</Nav.Link>
                                <Nav.Link onClick={handleRouteToAccount}>Your Account</Nav.Link>
                                <div className="separatorLine"/>
                                <Nav.Link onClick={handleRouteToLogOut}>Log Out</Nav.Link>
                            </Nav>
                            <Form className="searchForm">
                                <FloatingLabel controlId="floatingInput" label="Search" className="searchFloatingLabel">
                                    <FormControl
                                        type="search"
                                        placeholder="Search"
                                        className="searchLabel"
                                    />
                                </FloatingLabel>
                                <Button variant="outline-dark" className="searchButton">Search</Button>
                            </Form>
                        </Container>
                    </Navbar>
                </div>
            </div>
        </Fragment>
    );
}