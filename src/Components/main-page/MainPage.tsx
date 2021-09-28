import React, {Fragment, useState} from "react";
import {Chart} from "react-google-charts";
import {useFormik} from "formik";
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
import "./MainPageSCSS.css";
import background from "./mainPageBackground.jpg";
import littleLogo from "./signin_icon.png";
import balanceTitle from "./balance.png";
import closedTrashBin from "./closedtransbin.png";
import openedTrashBin from "./openedtransbin.png";


export const MainPage = () => {

    const formikIncome = useFormik({
        initialValues: {
            context: "",
        },
        onSubmit: (values) => {
            setIncome([...income, values.context]);
            formikIncome.resetForm();
        },

    });

    const [income, setIncome] = useState([] as string[]);

    const getTotalIncome = () => income.map(Number).reduce(((sum: number, current: number) => sum + current), 0);

    function deleteListItemIncome(id: number) {
        const newIncome = [...income];
        newIncome.splice(id, 1);
        setIncome(() => newIncome);
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

    const getTotalExpenses = () => expenses.map(Number).reduce(((sum: number, current: number) => sum + current), 0);

    function deleteListItemExpenses(id: number) {
        const newExpenses = [...expenses];
        newExpenses.splice(id, 1);
        setExpenses(() => newExpenses);
    }


    const balance = getTotalIncome() - getTotalExpenses();

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
                                                   key={id}>{Number(listItem).toLocaleString()} HUF
                                        <div className="incomeButton">
                                            <button value="delete1" className="deleteButton"
                                                    onClick={() => deleteListItemIncome(id)}>
                                                <img className="closed" src={closedTrashBin} alt=""/>
                                                <img src={openedTrashBin} className="opened" alt=""/>
                                            </button>
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            ))}
                            <div className="totalIncome"><h4>Total income:</h4></div>
                            <ListGroup>
                                <ListGroupItem className="listItems" action
                                               variant="info">{getTotalIncome().toLocaleString()} HUF</ListGroupItem>
                            </ListGroup>
                        </div>
                    </div>
                    <div className="mainPageBalanceTitleAndChart">
                        <img src={balanceTitle} className="mainPageBalanceTitle" alt=""/>
                        <div className="moneyTitleDiv"><h1 className="moneyTitle">{balance.toLocaleString()} HUF</h1>
                        </div>
                        <Chart
                            className="doughnot"
                            chartType="PieChart"
                            data={[
                                ['Income', 'Expenses'],
                                ['Income', getTotalIncome()],
                                ['Expense', getTotalExpenses()]
                            ]}
                            options={{
                                pieSliceTextStyle: {
                                    fontSize: '30',
                                },
                                slices: {
                                    0: {color: '#c17094', offset: 0.01},
                                    1: {color: '#3a61b5', offset: 0.01}
                                },
                                legend: 'bottom',
                                chartArea: {left: 20, top: 0, width: "80%", height: "80%"}, height: 500, width: 500,
                                is3D: true
                            }}
                            rootProps={{'data-testid': '3'}}
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
                                                   key={id}>{Number(listItem).toLocaleString()} HUF
                                        <div className="incomeButton">
                                            <button value="delete" className="deleteButton"
                                                    onClick={() => deleteListItemExpenses(id)}>
                                                <img className="closed" src={closedTrashBin} alt=""/>
                                                <img src={openedTrashBin} className="opened" alt=""/>
                                            </button>
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            ))}
                            <div className="totalIncome"><h4>Total expenses:</h4></div>
                            <ListGroup>
                                <ListGroupItem className="listItems" action
                                               variant="danger">{getTotalExpenses().toLocaleString()} HUF</ListGroupItem>
                            </ListGroup>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}