import React, {Fragment, useEffect, useState} from "react";
import {Chart} from "react-google-charts";
import {useFormik} from "formik";
import {useHistory} from "react-router-dom";
import {APIService} from "../../APIService";
import {
    Badge,
    Button,
    Container,
    FloatingLabel,
    Form,
    FormControl,
    ListGroup,
    ListGroupItem,
    Nav,
    Navbar,
    Modal
} from "react-bootstrap";
import "./MainPageCSS.css";
import background from "./mainPageBackground.jpg";
import littleLogo from "./signin_icon.png";
import balanceTitle from "./balance.png";
import editButton from "./editButton.png";
import closedTrashBin from "./closedtransbin.png";
import openedTrashBin from "./openedtransbin.png";


export const MainPage = () => {

    useEffect(() => {
        APIService.GetIncomes().then(setIncomes);
        APIService.GetExpenses().then(setExpenses);
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


    const [actualBadge, setActualBadge] = useState("");


    const formikIncome = useFormik({
        initialValues: {
            income: "",
            badge: "",
            date: "",
        },
        onSubmit: (values) => {
            APIService.SavingIncomes(values).then(setIncomes);
            formikIncome.resetForm();
        },
    });

    interface incomeObject {
        income: string | number;
        badge: string;
        date: string;
        incomeID: number;
        userID?: number;
    }

    const [incomes, setIncomes] = useState([] as incomeObject[]);

    const [currentlySelectedIncome, setCurrentlySelectedIncome] = useState(0);

    const [showIncomesEditWindow, setShowIncomesEditWindow] = useState(false);

    const getTotalIncome = () => incomes.map(inc => +inc.income).reduce(((sum: number, current: number) => sum + current), 0);

    function deleteListItemIncome(id: number) {
        APIService.DeleteIncomes(id).then((response) => Array.isArray(response) ? setIncomes(response) : setIncomes([]));
    }


    const formikExpense = useFormik({
        initialValues: {
            expense: "",
            badge: "",
            date: "",
        },
        onSubmit: (values) => {
            APIService.SavingExpenses(values).then(setExpenses);
            formikExpense.resetForm();
        }
    });

    interface expenseObject {
        expense: string | number;
        badge: string;
        date: string;
        expenseID: number;
        userID?: number;
    }

    const [expenses, setExpenses] = useState([] as expenseObject[]);

    const [currentlySelectedExpense, setCurrentlySelectedExpense] = useState(0);

    const [showExpensesEditWindow, setShowExpensesEditWindow] = useState(false);

    const getTotalExpense = () => expenses.map(exp => +exp.expense).reduce(((sum: number, current: number) => sum + current), 0);

    function deleteListItemExpense(id: number) {
        APIService.DeleteExpenses(id).then((response) => Array.isArray(response) ? setExpenses(response) : setExpenses([]));
    }


    const balance = getTotalIncome() - getTotalExpense();


    return (
        <Fragment>
            {showIncomesEditWindow &&
            <Modal size="sm"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered show={showIncomesEditWindow} onHide={() => setShowIncomesEditWindow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Edit this income:</Modal.Title>
                </Modal.Header>
                <Modal.Body className="editWindow">What category is this income?
                    <Button className="tags" onClick={() => setActualBadge("Salary")}>Salary</Button>
                    <Button className="tags" onClick={() => setActualBadge("Scholarship")}>Scholarship</Button>
                    <Button className="tags" onClick={() => setActualBadge("Other")}>Other</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowIncomesEditWindow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        setShowIncomesEditWindow(false);
                        APIService.UpdateIncomes(actualBadge, currentlySelectedIncome).then(setIncomes)
                    }}>Save Changes</Button>
                </Modal.Footer>
            </Modal>}


            {showExpensesEditWindow &&
            <Modal size="sm"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered show={showExpensesEditWindow} onHide={() => setShowExpensesEditWindow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Edit this expense:</Modal.Title>
                </Modal.Header>
                <Modal.Body className="editWindow">What category is this expense?
                    <Button className="tags" onClick={() => setActualBadge("Bills")}>Bills</Button>
                    <Button className="tags" onClick={() => setActualBadge("Food")}>Food</Button>
                    <Button className="tags" onClick={() => setActualBadge("Travelling")}>Travelling</Button>
                    <Button className="tags" onClick={() => setActualBadge("Clothes")}>Clothes</Button>
                    <Button className="tags" onClick={() => setActualBadge("Home")}>Home</Button>
                    <Button className="tags" onClick={() => setActualBadge("Drugstore")}>Drugstore</Button>
                    <Button className="tags" onClick={() => setActualBadge("Charity")}>Charity</Button>
                    <Button className="tags" onClick={() => setActualBadge("Fun")}>Fun</Button>
                    <Button className="tags" onClick={() => setActualBadge("Other")}>Other</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowExpensesEditWindow(false)}>Close</Button>
                    <Button variant="primary" onClick={() => {
                        setShowExpensesEditWindow(false);
                        APIService.UpdateExpenses(actualBadge, currentlySelectedExpense).then(setExpenses);
                    }}>Save Changes</Button>
                </Modal.Footer>
            </Modal>}


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
                <div className="mainPageContent">
                    <div className="incomeTable">
                        <div className="incomeContainer">
                            <div className="incomeTitle"><h2>Incomes</h2></div>
                            <form onSubmit={formikIncome.handleSubmit}>
                                <FloatingLabel className="incomeInput" label="Add incomes here...">
                                    <FormControl
                                        placeholder="Add incomes here..."
                                        value={formikIncome.values.income}
                                        onChange={formikIncome.handleChange}
                                        id="income"
                                    />
                                    <Button variant="outline-info" id="button-addon2" type="submit">Add</Button>
                                </FloatingLabel>
                            </form>
                            <div className="itemListContainer">
                                {incomes.map((listItem) => (
                                    <ListGroup>
                                        <ListGroupItem className="listItems" action variant="info"
                                                       key={listItem.incomeID}>{Number(listItem.income).toLocaleString()} HUF
                                            <Badge bg="danger" className="badge">
                                                {listItem.badge}
                                            </Badge>{' '}
                                            <div className="MainPageEditDiv">
                                                <button className="MainPageEditButton" onClick={() => {
                                                    setShowIncomesEditWindow(true);
                                                    setCurrentlySelectedIncome(listItem.incomeID)
                                                }}>
                                                    <img src={editButton} className="MainPageEditPic" alt=""/>
                                                </button>
                                            </div>
                                            <div className="incomeButton">
                                                <button value="delete1" className="deleteButton"
                                                        onClick={() => deleteListItemIncome(listItem.incomeID)}>
                                                    <img className="closed" src={closedTrashBin} alt=""/>
                                                    <img src={openedTrashBin} className="opened" alt=""/>
                                                </button>
                                            </div>
                                        </ListGroupItem>
                                    </ListGroup>
                                ))}
                            </div>
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
                            className="doughnut"
                            chartType="PieChart"
                            data={[
                                ['Income', 'Expenses'],
                                ['Income', getTotalIncome()],
                                ['Expense', getTotalExpense()]
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
                                        value={formikExpense.values.expense}
                                        onChange={formikExpense.handleChange}
                                        id="expense"
                                    />
                                    <Button variant="outline-danger" id="button-addon2" type="submit">Add</Button>
                                </FloatingLabel>
                            </form>
                            <div className="itemListContainer">
                                {expenses.map((listItem, id) => (
                                    <ListGroup>
                                        <ListGroupItem className="listItems" action variant="danger" key={id}>
                                            {Number(listItem.expense).toLocaleString()} HUF
                                            <Badge bg="info" className="badge">
                                                {listItem.badge}
                                            </Badge>{' '}
                                            <div className="MainPageEditDiv">
                                                <button className="MainPageEditButton"
                                                        onClick={() => {
                                                            setShowExpensesEditWindow(true);
                                                            setCurrentlySelectedExpense(listItem.expenseID)
                                                        }}>
                                                    <img src={editButton} className="MainPageEditPic" alt=""/>
                                                </button>
                                            </div>
                                            <div className="incomeButton">
                                                <button value="delete" className="deleteButton"
                                                        onClick={() => deleteListItemExpense(listItem.expenseID)}>
                                                    <img className="closed" src={closedTrashBin} alt=""/>
                                                    <img src={openedTrashBin} className="opened" alt=""/>
                                                </button>
                                            </div>
                                        </ListGroupItem>
                                    </ListGroup>
                                ))}
                            </div>
                            <div className="totalIncome"><h4>Total expenses:</h4></div>
                            <ListGroup>
                                <ListGroupItem className="listItems" action
                                               variant="danger">{getTotalExpense().toLocaleString()} HUF</ListGroupItem>
                            </ListGroup>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}