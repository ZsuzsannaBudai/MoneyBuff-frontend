import {API_URL} from "./Components/environments";

export class APIService {
    public static Login(values: any) {
        return fetch(`${API_URL}/users/UserLogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(response => response.json());
    }

    public static Register(values: any){
        return fetch(`${API_URL}/users/RegisterNewUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(response => response.json());
    }
}