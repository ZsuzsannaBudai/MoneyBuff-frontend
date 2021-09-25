import {useHistory} from "react-router-dom";
import React, {Fragment, useState} from "react";
import "./MainPageSCSS.css";
import background from "./mainPageBackground.jpg";
import {Button, FloatingLabel, ListGroup, ListGroupItem, Navbar} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {FormControl} from "react-bootstrap";
import littleLogo from "./signin_icon.png";
import ChartsPage from "./mainPageDonutChart";
import balanceTitle from "./balance.png";
import {useFormik} from "formik";

export const MainPage = () => {

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            context: "",
        },
        onSubmit: (values) => {
            setIncome([...income, values.context]);
        }
    });

    const [income, setIncome] = useState([] as string[]);

    let totalIncome = 0;

    for (let i = 0; i < income.length; i++) {
        totalIncome += +income[i];
    }

    const formikExpense = useFormik({
        initialValues: {
            context: "",
        },
        onSubmit: (values) => {
            setExpenses([...expenses, values.context]);
        }
    });

    const [expenses, setExpenses] = useState([] as string[]);

    let totalExpenses = 0;

    for (let i = 0; i < expenses.length; i++) {
        totalExpenses += +expenses[i];
    }

    let balance = totalIncome - totalExpenses;

    return (
        <Fragment>
            <div className="mainPageBackground" style={{backgroundImage: `url(${background})`}}>
                <div>
                    <Navbar fixed="top" bg="light">
                        <Container>
                            <img className="littleLogo" src={littleLogo}/>
                            <Navbar.Brand href="#home">MoneyBuffer</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Statistics</Nav.Link>
                                <Nav.Link href="#savemoney">Save Money</Nav.Link>
                                <Nav.Link href="#account">Your Account</Nav.Link>
                                <div className="separatorLine"/>
                                <Nav.Link href="#logout">Log Out</Nav.Link>
                            </Nav>
                            <Form className="d-flex">
                                <FloatingLabel controlId="floatingInput" label="Search" className="mb-3">
                                    <FormControl
                                        type="search"
                                        placeholder="Search"
                                        className="label"
                                    />
                                </FloatingLabel>
                                <Button variant="outline-dark" className="button">Search</Button>
                            </Form>
                        </Container>
                    </Navbar>
                </div>
                <div className="mainPageContent">
                    <div className="incomeTable">
                        <div className="incomeContainer">
                            <div className="incomeTitle"><h2>Incomes</h2></div>
                            <form onSubmit={formik.handleSubmit}>
                                <FloatingLabel className="incomeInput" label="Add incomes here...">
                                    <FormControl
                                        placeholder="Add incomes here..."
                                        value={formik.values.context}
                                        onChange={formik.handleChange}
                                        id="context"
                                    />
                                    <Button variant="outline-info" id="button-addon2" type="submit">Add</Button>
                                </FloatingLabel>
                            </form>
                            {income.map((listItem: any, id) => (
                                <ListGroup>
                                    <ListGroupItem className="listItems" action variant="info"
                                                   key={id}>{listItem}</ListGroupItem>
                                </ListGroup>
                            ))}
                            <div className="totalIncome"><h4>Total income:</h4></div>
                            <ListGroup>
                                <ListGroupItem className="listItems" action variant="info">{totalIncome}</ListGroupItem>
                            </ListGroup>
                        </div>
                    </div>
                    <div className="mainPageBalanceTitleAndChart">
                        <img src={balanceTitle} className="mainPageBalanceTitle"/>
                        <h1 className="moneyTitle">{balance} HUF</h1>
                        <ChartsPage/>
                    </div>
                    <div className="incomeTable">
                        <div className="incomeContainer">
                            <form onSubmit={formikExpense.handleSubmit}>
                                <div className="incomeTitle"><h2>Expenses</h2></div>
                                <FloatingLabel className="incomeInput" label="Add expenses here...">
                                    <FormControl
                                        placeholder="Add expenses here..."
                                        value={formikExpense.values.context}
                                        onChange={formikExpense.handleChange}
                                        id="context"
                                    />
                                    <Button variant="outline-danger" id="button-addon2" type="submit">Add</Button>
                                </FloatingLabel>
                                {expenses.map((listItem: any, id) => (
                                    <ListGroup>
                                        <ListGroupItem className="listItems" action variant="danger"
                                                       key={id}>{listItem}</ListGroupItem>
                                    </ListGroup>
                                ))}
                                <div className="totalIncome"><h4>Total expenses:</h4></div>
                                <ListGroup>
                                    <ListGroupItem className="listItems" action
                                                   variant="danger">{totalExpenses}</ListGroupItem>
                                </ListGroup>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}