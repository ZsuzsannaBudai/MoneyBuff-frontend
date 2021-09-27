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
import balanceTitle from "./balance.png";
import {useFormik} from "formik";
import closedTrashbin2 from "./closedtransbin.png";
import openedtrashbin from "./openedtransbin2.png";
import { Chart } from "react-google-charts";

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

    const getTotalIncome = () => income.map(Number).reduce(((sum: number, current: number) => sum + current), 0);

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

    const getTotalExpenses = () => expenses.map(Number).reduce(((sum: number, current: number) => sum + current), 0);

    const balance = getTotalIncome() - getTotalExpenses();

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
                                    <ListGroupItem className="listItems" action variant="info" key={id}>{listItem} HUF
                                        <div className="button2">
                                            <button value="delete1" className="deleteButton"
                                                    onClick={() => deleteListItemIncome(id)}>
                                                <img className="closed" src={closedTrashbin2} alt=""/>
                                                <img src={openedtrashbin} className="opened" alt=""/>
                                            </button>
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            ))}
                            <div className="totalIncome"><h4>Total income:</h4></div>
                            <ListGroup>
                                <ListGroupItem className="listItems" action variant="info">{getTotalIncome()} HUF</ListGroupItem>
                            </ListGroup>
                        </div>
                    </div>
                    <div className="mainPageBalanceTitleAndChart">
                        <img src={balanceTitle} className="mainPageBalanceTitle" alt=""/>
                        <h1 style={hol} className="moneyTitle">{balance} HUF</h1>
                        <Chart
                            className="doughnot"
                            chartType="PieChart"
                            data={[
                                ['Income', 'Expenses'],
                                ['Income', getTotalIncome()],
                                ['Expense', getTotalExpenses()]
                            ]}
                            options={{
                                pieHole: 0.5,
                                legend: 'bottom',
                                chartArea:{left:0,top:0,width:"80%",height:"80%"},height: 550,width: 550,
                            }}
                            rootProps={{ 'data-testid': '3' }}
                        />
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
                                                   key={id}>{listItem} HUF
                                        <div className="button2">
                                            <button value="delete" className="deleteButton"
                                                    onClick={() => deleteListItemExpenses(id)}><img className="closed"
                                                                                                    src={closedTrashbin2}
                                                                                                    alt=""/>
                                                <img src={openedtrashbin} className="opened"/>
                                            </button>
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            ))}
                            <div className="totalIncome"><h4>Total expenses:</h4></div>
                            <ListGroup>
                                <ListGroupItem className="listItems" action
                                               variant="danger">{getTotalExpenses()} HUF</ListGroupItem>
                            </ListGroup>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}