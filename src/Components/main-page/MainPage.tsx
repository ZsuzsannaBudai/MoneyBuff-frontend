import {useHistory} from "react-router-dom";
import {Fragment} from "react";
import "./MainPageSCSS.css";
import background from "./mainPageBackground.jpg";
import {Button, Navbar, Table} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {FormControl} from "react-bootstrap";
import littleLogo from "./signin_icon.png";

import {useFormik} from "formik";
import {APIService} from "../../APIService";
import {Status} from "../../Enums";
import ChartsPage from "./donutChartMainPage";
import decor from "../welcome-page/decor2.png";

export const MainPage = () => {

    //let val = ChartsPage;
    const history = useHistory();

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
                <div className="incomeTable">
                    <Table>
                        <thead>
                        <tr>
                            <th>Income:</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>""</tr>
                        <tr>""</tr>
                        <tr>""</tr>
                        <tr>""</tr>
                        <tr>""</tr>
                        <tr>""</tr>
                        <tr>Total income:</tr>
                        </tbody>
                    </Table>
                </div>
                <div className="expenseTable">
                    <Table>
                        <thead>
                        <tr>
                            <th>Income:</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>""</tr>
                        <tr>""</tr>
                        <tr>""</tr>
                        <tr>""</tr>
                        <tr>""</tr>
                        <tr>""</tr>
                        <tr>Total income:</tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </Fragment>
    );
}