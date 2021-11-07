import './UserAccountCSS.css';
import React, {Fragment, useEffect, useState} from "react";
import background from "../main-page/mainPageBackground.jpg";
import {Button, Container, FloatingLabel, FormControl, Nav, Navbar, Image} from "react-bootstrap";
import littleLogo from "../main-page/signin_icon.png";
import {useHistory} from "react-router-dom";
import {APIService} from "../../APIService";
//import * as SmartGallery from "./react-native-smart-gallery";

export const UserAccount = () => {

    useEffect(() => {
        APIService.GetUserData().then(response => setUserData(response[0]));
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

    interface userObject {
        name: string,
        email: string,
        password: string
    }

    const [userData, setUserData] = useState({} as userObject);

    const images = [
        'https://source.unsplash.com/random/400x400',
        'https://source.unsplash.com/random/400x400',
        'https://source.unsplash.com/random/400x400',
    ];

    const [imagePicker, setImagePicker] = useState(false);

    return (
        <Fragment>
            {/*{imagePicker && <SmartGallery*/}
            {/*    rootStyle={{boxShadow: '2px 2px 4px #000'}}*/}
            {/*    images={images}*/}
            {/*    onImageSelect={(event: any, src: any) => window.open(src)}*/}
            {/*/>}*/}
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
                <div className="account">
                    <div className="AccountBackground">
                        <div className="imageContainer">
                            <div className="profileLabel">Your Profile</div>
                            <Image className="userImage" src={littleLogo} rounded/>
                            <Button variant="outline-secondary" className="selectButtonUser" onClick={() => setImagePicker(true)}>Select a
                                picture</Button>{' '}
                            <Button variant="outline-secondary" className="deleteButtonUser" onClick={() => {
                                APIService.DeleteUser().then();
                                handleRouteToLogOut()}}>Delete account</Button>{' '}
                        </div>
                        <div>
                            <form>
                                <div className="infoContainer">
                                    <div className="labelContainer">
                                        <div className="infoLabel">Basic Infos</div>
                                        <div className="nameLabel">Name</div>
                                        <div className="emailLabel">E-mail Address</div>
                                        <div className="passwordLabel">Password</div>
                                    </div>
                                    <div className="fieldContainer">
                                        <FloatingLabel controlId="floatingInput" label="Name"
                                                       className="FloatingLabelsUser">
                                            <FormControl
                                                id="name"
                                                name="name"
                                                type="name"
                                                placeholder="Name"
                                                onChange={(event) => setUserData({...userData, name: event.target.value})}
                                                value={userData.name}
                                            />
                                        </FloatingLabel>
                                        <FloatingLabel controlId="floatingInput" label="E-mail Address"
                                                       className="FloatingLabelsUser">
                                            <FormControl
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="E-mail address"
                                                onChange={(event) => setUserData({...userData, email: event.target.value})}
                                                value={userData.email}
                                            />
                                        </FloatingLabel>
                                        <div className="passwordDivUser">
                                            <FloatingLabel controlId="floatingInput" label="Password"
                                                           className="FloatingLabelsUserPassword">
                                                <FormControl
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    placeholder="Password"
                                                    value=""
                                                />
                                            </FloatingLabel>
                                            <Button variant="outline-secondary" className="ChangeButtonUser" onClick={(values) => APIService.UpdateUserData(values).then(setUserData)}>Change</Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <Button variant="outline-secondary" className="userButtons">Make a Household</Button>
                            <Button variant="outline-secondary" className="userButtons2" onClick={(values) => APIService.UpdateUserData(values).then(setUserData)}>Save</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}