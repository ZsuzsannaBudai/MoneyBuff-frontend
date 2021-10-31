import './UserAccountCSS.css';
import React, {Fragment, useEffect, useState} from "react";
import background from "../main-page/mainPageBackground.jpg";
import {Button, Container, FloatingLabel, Form, FormControl, Nav, Navbar, Image} from "react-bootstrap";
import littleLogo from "../main-page/signin_icon.png";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import {APIService} from "../../APIService";

export const UserAccount = () => {

    useEffect(() => {
        APIService.GetUserData().then(setUserData);
    }, []);

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

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: async (values) => APIService.UpdateUserData(values).then(setUserData)
    });

    interface userObject {
        name: string,
        email: string,
        password: string
    }

    const [userData, setUserData] = useState([] as userObject[]);

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
                <div className="account">
                    <div className="AccountBackground">

                        <div className="imageContainer">
                            <div className="profileLabel">Your Profile</div>
                            <Image className="userImage" src={littleLogo} rounded/>
                            <Button variant="outline-secondary" className="selectButtonUser">Select a
                                picture</Button>{' '}
                            <Button variant="outline-secondary" className="deleteButtonUser" onClick={() => {
                                APIService.DeleteUser().then();
                                handleRouteToLogOut()}}>Delete account</Button>{' '}
                        </div>
                        <div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="infoContainer">
                                    <div className="labelContainer">
                                        <div className="infoLabel">Basic Infos</div>
                                        <div className="nameLabel">Name</div>
                                        <div className="emailLabel">E-mail Address</div>
                                        <div className="passwordLabel">Password</div>
                                    </div>
                                    <div className="fieldContainer">
                                        <FloatingLabel controlId="floatingInput" label="Name"
                                                       className="FloatingLabelsUser">
                                            <FormControl
                                                id="name"
                                                name="name"
                                                type="name"
                                                placeholder="Name"
                                                onChange={formik.handleChange}
                                                value={userData.map(user => user.name)}
                                            />
                                        </FloatingLabel>
                                        <FloatingLabel controlId="floatingInput" label="E-mail Address"
                                                       className="FloatingLabelsUser">
                                            <FormControl
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="E-mail address"
                                                onChange={formik.handleChange}
                                                value={userData.map(user => user.email)}
                                            />
                                        </FloatingLabel>
                                        <div className="passwordDivUser">
                                            <FloatingLabel controlId="floatingInput" label="Password"
                                                           className="FloatingLabelsUserPassword">
                                                <FormControl
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    placeholder="E-mail address"
                                                    onChange={formik.handleChange}
                                                    value={userData.map(user => user.password)}
                                                />
                                            </FloatingLabel>
                                            <Button variant="outline-secondary" className="ChangeButtonUser">Change</Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <Button variant="outline-secondary" className="userButtons">Make a Household</Button>
                            <Button variant="outline-secondary" className="userButtons2">Save</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}