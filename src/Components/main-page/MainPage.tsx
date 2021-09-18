import {useHistory} from "react-router-dom";
import React, {Fragment} from "react";
import "./MainPageSCSS.css";
import background from "./mainPageBackground.jpg";
import {Button, Navbar, Table} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {FormControl} from "react-bootstrap";
import littleLogo from "./signin_icon.png";
import ChartsPage from "./mainPageDonutChart";

export const MainPage = () => {

    const history = useHistory();

    let income = {
        listItems: [
            {
                id: 1,
                context: 123456
            },
            {
                id: 1,
                context: 123456
            },
            {
                id: 1,
                context: 123456
            },
            {
                id: 1,
                context: 123456
            }, {
                id: 1,
                context: 123456
            },
        ]
    };

    /* const handleRoute = () => {
         history.push("/register");
     }*/

    /*const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            APIService.Login(values).then(data => {
                console.log(data);
                if (data === Status.SUCCESS) {
                    handleRoute2();
                } else {
                    setError(true);
                }
            });
        }
    });*/

    return (
        <Fragment>
            <div className="mainPageBackground" style={{backgroundImage: `url(${background})`}}>
                <Navbar fixed="top" bg="light">
                    <Container className="mainPageContainer">
                        <img className="littleLogo" src={littleLogo}/>
                        <Navbar.Brand href="#home">MoneyBuffer</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Statistics</Nav.Link>
                            <Nav.Link href="#account">Your Account</Nav.Link>
                            <div className="separatorLine"/>
                            <Nav.Link href="#logout">Log Out</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Container>
                </Navbar>
                <div className="tables">
                    <div>
                        <div className="incomeTitle"><h1>Incomes</h1></div>
                        {income.listItems.map((listItem: any) => (
                            <div className="asdfg">
                                <li key={listItem.id}>{listItem.context}</li>
                            </div>
                        ))}
                        <div className="totalIncome"><h1>Total income:</h1></div>
                    </div>
                    <div className="expensesTable">
                        <div className="expensesTitle"><h1>Expenses</h1></div>
                        {income.listItems.map((listItem: any) => (
                            <div>
                                <li key={listItem.id}>{listItem.context}</li>
                            </div>
                        ))}
                        <div className="totalIncome"><h1>Total expenses:</h1></div>
                    </div>
                </div>
                <div className="med">
                    <h1 className="balance">Your </h1>
                    <h1 className="balance2">balance:</h1>
                    <ChartsPage/>
                </div>
            </div>
        </Fragment>
    );
}