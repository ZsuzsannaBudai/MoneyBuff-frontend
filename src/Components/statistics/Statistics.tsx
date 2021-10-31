import './StatisticsCSS.css';
import React, {Fragment} from "react";
import {Chart} from "react-google-charts";
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
                <div className="statisticsCharts">
                    <div className="firstTwoChartsOnStatistics">
                        <Chart
                            chartType="ColumnChart"
                            data={[
                                ['Incomes', 'Income'],
                                ['Salary', 8008000],
                                ['Scholarship', 3694000],
                                ['Cafeteria', 200000],
                                ['Bonus', 8008000],
                                ['Gift', 3694000],
                                ['Saved Money', 200000],
                                ['Other', 2896000],
                            ]}
                            options={{
                                title: 'How much money you have from where?',
                                chartArea: {width: '60%'}, height: 400, width: 800,
                                hAxis: {
                                    title: 'Categories',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'How much?',
                                },
                                fontSize: 15,
                            }}
                            legendToggle
                        />
                        <Chart
                            chartType="ColumnChart"
                            data={[
                                ['Month', 'Expense'],
                                ['November', 8008000],
                                ['December', 3694000],
                                ['January', 2896000],
                                ['February', 1953000],
                                ['March', 1517000],
                            ]}
                            options={{
                                title: 'How much money you spending in a month in average?',
                                chartArea: {width: '60%'}, height: 400, width: 800,
                                hAxis: {
                                    title: 'When?',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'How much?',
                                },
                                fontSize: 15
                            }}
                            legendToggle
                        />
                    </div>
                    <div className="secondTwoChartsOnStatistics">
                        <Chart
                            chartType="ColumnChart"
                            data={[
                                ['Expenses', 'Expense'],
                                ['Bills',  8008000],
                                ['Food',  3694000],
                                ['Travelling',  8008000],
                                ['Clothes',  3694000],
                                ['Home',  8008000],
                                ['Drugstore',  3694000],
                                ['Charity',  8008000],
                                ['Fun',  3694000],
                                ['Other',  2896000],
                            ]}
                            options={{
                                title: 'How much you spending on what?',
                                chartArea: {width: '60%'}, height: 400, width: 800,
                                hAxis: {
                                    title: 'Categories',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'How much?',
                                },
                                fontSize: 15
                            }}
                            legendToggle
                        />
                        <Chart
                            chartType="ColumnChart"
                            data={[
                                ['Month', 'Bills', 'Food', 'Travelling', 'Clothes', 'Home', 'Drugstore', 'Charity', 'Fun', 'Other'],
                                ['November', 8008000, 5000000, 2000000, 8008000, 5000000, 2000000, 8008000, 5000000, 2000000],
                                ['December', 8008000, 5000000, 2000000, 8008000, 5000000, 2000000, 8008000, 5000000, 2000000],
                                ['January', 8008000, 5000000, 2000000, 8008000, 5000000, 2000000, 8008000, 5000000, 2000000],
                            ]}
                            options={{
                                title: 'How your expenses split monthly?',
                                chartArea: {width: '60%'}, height: 400, width: 800,
                                hAxis: {
                                    title: 'When?',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'How much?',
                                },
                                fontSize: 15
                            }}
                            legendToggle
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}