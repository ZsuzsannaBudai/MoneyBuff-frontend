import {useHistory} from "react-router-dom";
import React, {Fragment, useEffect, useState} from "react";
import "./MainPageSCSS.css";
import background from "./mainPageBackground.jpg";
import {
    Button,
    Container,
    FloatingLabel,
    Form,
    FormControl,
    ListGroup,
    ListGroupItem,
    Nav,
    Navbar
} from "react-bootstrap";
import littleLogo from "./signin_icon.png";
import ChartsPage from "./mainPageDonutChart";
import balanceTitle from "./balance.png";
import {useFormik} from "formik";
import closedTrashbin from "./closedtransbin.png";
import openedTrashBin from "./openedtranshbin.jpg";

export const MainPage = () => {

    const history = useHistory();

    const formikIncome = useFormik({
        initialValues: {
            context: "",
        },
        onSubmit: (values) => {
            setIncome([...income, values.context]);
            formikIncome.resetForm();
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
            formikExpense.resetForm();
        }
    });

    const [expenses, setExpenses] = useState([] as string[]);

    let totalExpenses = 0;

    for (let i = 0; i < expenses.length; i++) {
        totalExpenses += +expenses[i];
    }

    let balance = totalIncome - totalExpenses;

    const [hol, setHol] = useState({});

    useEffect(() => {
        const elem2 = document.getElementById("doughnot");

        let elem;
        let merrex = 0;
        let merrey = 0;
        if (elem2) {
            elem = elem2.getBoundingClientRect();
            merrex = elem.x + elem.width / 2;
            merrey = elem.y + elem.height / 2;
            console.log(elem);
        }

        setHol({
            position: "absolute",
            top: merrey,
            left: merrex - ((balance.toString().length + 4) * (24 / balance.toString().length + 30) / 4),
            fontSize: 24 / balance.toString().length + 28,
        });
    }, [balance]);

    function deleteListItemIncome(id: number) {
        const newIncome = [...income];
        newIncome.splice(id, 1);
        setIncome(income => newIncome);
    }

    function deleteListItemExpenses(id: number) {
        const newExpenses = [...expenses];
        newExpenses.splice(id, 1);
        setExpenses(expense => newExpenses);
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
                            <form onSubmit={formikIncome.handleSubmit}>
                                <FloatingLabel className="incomeInput" label="Add incomes here...">
                                    <FormControl
                                        placeholder="Add incomes here..."
                                        value={formikIncome.values.context}
                                        onChange={formikIncome.handleChange}
                                        id="context"
                                    />
                                    <Button variant="outline-info" id="button-addon2" type="submit">Add</Button>
                                </FloatingLabel>
                            </form>
                            {income.map((listItem: any, id) => (
                                <ListGroup>
                                    <ListGroupItem className="listItems" action variant="info"
                                                   key={id}>{listItem}
                                        <button value="delete" className="deleteButton"
                                                onClick={() => deleteListItemIncome(id)}/>
                                    </ListGroupItem>
                                </ListGroup>
                            ))}
                            <div className="totalIncome"><h4>Total income:</h4></div>
                            <ListGroup>
                                <ListGroupItem className="listItems" action variant="info">{totalIncome}</ListGroupItem>
                            </ListGroup>
                        </div>
                    </div>
                    <div className="mainPageBalanceTitleAndChart">
                        <img src={balanceTitle} className="mainPageBalanceTitle" alt=""/>
                        <h1 style={hol} className="moneyTitle">{balance} HUF</h1>
                        <ChartsPage/>
                    </div>
                    <div className="incomeTable">
                        <div className="incomeContainer">
                            <div className="incomeTitle"><h2>Expenses</h2></div>
                            <form onSubmit={formikExpense.handleSubmit}>
                                <FloatingLabel className="incomeInput" label="Add expenses here...">
                                    <FormControl
                                        placeholder="Add expenses here..."
                                        value={formikExpense.values.context}
                                        onChange={formikExpense.handleChange}
                                        id="context"
                                    />
                                    <Button variant="outline-danger" id="button-addon2" type="submit">Add</Button>
                                </FloatingLabel>
                            </form>
                            {expenses.map((listItem: any, id) => (
                                <ListGroup>
                                    <ListGroupItem className="listItems" action variant="danger"
                                                   key={id}>{listItem} <Button value="delete"
                                                                               onClick={() => deleteListItemExpenses(id)}>X</Button></ListGroupItem>
                                </ListGroup>
                            ))}
                            <div className="totalIncome"><h4>Total expenses:</h4></div>
                            <ListGroup>
                                <ListGroupItem className="listItems" action
                                               variant="danger">{totalExpenses}</ListGroupItem>
                            </ListGroup>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}