import './SaveMoneyCSS.css';
import React, {Fragment, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import background from "../main-page/mainPageBackground.jpg";
import {Button, Container, FloatingLabel, FormControl, Nav, Navbar} from "react-bootstrap";
import littleLogo from "../main-page/signin_icon.png";
import {APIService} from "../../APIService";
import Spinner from "react-bootstrap/Spinner";

export const SaveMoney = () => {

    useEffect(() => {
        APIService.getUserSavings().then(response => setUserSavings(response[0]));
    }, []);

    let [isLoading, setLoading] = useState(false);

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

    interface userSavingsObject {
        monthlyfix: string,
        monthlynonfix: string,
        savedmoney: string
    }

    const [userSavings, setUserSavings] = useState({} as userSavingsObject);

    function handleStartSaveMoneyButton() {
        const isOneHundred = +userSavings.monthlyfix + +userSavings.monthlynonfix + +userSavings.savedmoney;
        if (isOneHundred === 100) {
            setLoading(true);
            APIService.saveUserSavings(userSavings.monthlyfix, userSavings.monthlynonfix, userSavings.savedmoney).then((values) => {
                setLoading(false);
                setUserSavings(values);
            });
        } else {
            alert("Error: Not 100% provided!");
        }
    }

    return (
        <Fragment>
            <div className="mainPageBackground" style={{backgroundImage: `url(${background})`}}>
                <div>
                    <Navbar fixed="top" bg="light">
                        <Container>
                            <img className="littleLogo" src={littleLogo} alt=""/>
                            <Navbar.Brand onClick={handleRouteToHome}>MoneyBuffer</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link onClick={handleRouteToHome}>Home</Nav.Link>
                                <Nav.Link onClick={handleRouteToStatistics}>Statistics</Nav.Link>
                                <Nav.Link onClick={handleRouteToSaveMoney}>Save Money</Nav.Link>
                                <Nav.Link onClick={handleRouteToAccount}>Your Account</Nav.Link>
                                <div className="separatorLine"/>
                                <Nav.Link onClick={handleRouteToLogOut}>Log Out</Nav.Link>
                            </Nav>
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
                            <div className="saveFormContainer">
                                <form>
                                    <div className="infoContainer">
                                        <div className="labelContainer">
                                            <div className="fixLabel">Monthly fix</div>
                                            <div className="nonfixlabel">Monthly Non-Fix</div>
                                            <div className="saveLabel">Save</div>
                                        </div>
                                        <div className="fieldContainer">
                                            <FloatingLabel controlId="floatingInput" label="Monthly Fix"
                                                           className="FloatingLabelsSave">
                                                <FormControl
                                                    id="monthlyfix"
                                                    name="monthlyfix"
                                                    type="monthlyfix"
                                                    placeholder="Monthly fix"
                                                    onChange={(event) => setUserSavings({
                                                        ...userSavings,
                                                        monthlyfix: event.target.value
                                                    })}
                                                    value={userSavings.monthlyfix}
                                                />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingInput" label="Monthly Non-Fix"
                                                           className="FloatingLabelsSavenonfix">
                                                <FormControl
                                                    id="monthlynonfix"
                                                    name="monthlynonfix"
                                                    type="monthlynonfix"
                                                    placeholder="Monthly non-fix"
                                                    onChange={(event) => setUserSavings({
                                                        ...userSavings,
                                                        monthlynonfix: event.target.value
                                                    })}
                                                    value={userSavings.monthlynonfix}
                                                />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingInput" label="Save"
                                                           className="FloatingLabelsSaveSave">
                                                <FormControl
                                                    id="savedmoney"
                                                    name="savedmoney"
                                                    type="savedmoney"
                                                    placeholder="Saved Money"
                                                    onChange={(event) => setUserSavings(({
                                                        ...userSavings,
                                                        savedmoney: event.target.value
                                                    }))}
                                                    value={userSavings.savedmoney}
                                                />
                                            </FloatingLabel>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <Button variant="outline-secondary" className="saveSaveButton" onClick={() => {handleStartSaveMoneyButton()}}>
                                    {!isLoading && "Let's Save Money"}
                                    {isLoading && <Spinner animation="border" className="spinner"/>}
                                </Button>{' '}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}