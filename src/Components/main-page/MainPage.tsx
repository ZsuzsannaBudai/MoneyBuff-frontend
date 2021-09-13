import {useHistory} from "react-router-dom";

export const MainPage = () => {
    const history = useHistory();

   /* const handleRoute = () => {
        history.push("/register");
    }*/

    return(
        <h1>Welcome</h1>
    );
}