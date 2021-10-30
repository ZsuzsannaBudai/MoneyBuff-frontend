import './SaveMoneyCSS.css';
import React, {Fragment, useState} from "react";
import {useHistory} from "react-router-dom";
import background from "../main-page/mainPageBackground.jpg";
import {Button, Container, FloatingLabel, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import littleLogo from "../main-page/signin_icon.png";
import {useFormik} from "formik";
import {APIService} from "../../APIService";

export const SaveMoney = () => {
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
            monthlyfix: '50',
            monthlynonfix: '30',
            save: '20',
        },
        onSubmit: async (values) => APIService.saveUserSavings(values).then(setUserSavings)
    });

    interface userSavingsObject {
        monthlyfix: string,
        monthlynonfix: string,
        save: string
    }

    const [userSavings, setUserSavings] = useState([] as userSavingsObject[]);

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
                <div className="savemoney">
                    <div className="SaveMoneyBackground">
                        <div className="marketingText">
                            You would like to read some best practices to save money?
                            Always wanted something to buy, but you never could give it to yourself?
                            Or you just want to feel safer if the tsunami comes?
                            This is the right place for you! You can read some tips about how to save
                            money below, and you can start to save.
                        </div>
                        <div className="marketingText">
                            Have you heard about the 20/30/50 rule? It's simple: The half of your or your
                            household's incomes is the money which you can spend on your fix monthly expenses
                            (Bills, Rent, Utilities, Car, Insurance, Travelling). The 30% of your incomes is
                            need to be the non-fix expenses such as hair-dresser, having fun, weekend programs,
                            hobbies. And the rest of your incomes which is 20% which you need to keep every month.
                            With this rule you can save more money.
                        </div>
                        <div className="marketingText">
                            You want to start to live with this rule now? You can give the % below and the amount you
                            want to save monthly will be blocked, you can't spend it.
                        </div>
                        <div className="formContainer">
                            <div>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="infoContainer">
                                        <div className="labelContainer">
                                            <div className="nameLabel">Monthly fix</div>
                                            <div className="emailLabel">Monthly Non-Fix</div>
                                            <div className="passwordLabel">Save</div>
                                        </div>
                                        <div className="fieldContainer">
                                            <FloatingLabel controlId="floatingInput" label="Monthly Fix"
                                                           className="FloatingLabelsSave">
                                                <FormControl
                                                    id="monthlyfix"
                                                    name="monthlyfix"
                                                    type="monthlyfix"
                                                    placeholder="Monthly fix"
                                                    onChange={formik.handleChange}
                                                    value={userSavings.map(saving => saving.monthlyfix)}
                                                />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingInput" label="Monthly Non-Fix" className="FloatingLabelsSave">
                                                <FormControl
                                                    id="monthlynonfix"
                                                    name="monthlynonfix"
                                                    type="monthlynonfix"
                                                    placeholder="Monthly non-fix"
                                                    onChange={formik.handleChange}
                                                    value={userSavings.map(saving => saving.monthlynonfix)}
                                                />
                                            </FloatingLabel>
                                            <div className="passwordDivUser">
                                                <FloatingLabel controlId="floatingInput" label="Save"
                                                               className="FloatingLabelsSave">
                                                    <FormControl
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        placeholder="E-mail address"
                                                        onChange={formik.handleChange}
                                                        value={userSavings.map(saving => saving.save)}
                                                    />
                                                </FloatingLabel>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <Button>Save</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}