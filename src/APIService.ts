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

    public static Register(values: any) {
        return fetch(`${API_URL}/users/RegisterNewUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(response => response.json());
    }

    public static SavingIncomes(values: any) {
        return fetch(`${API_URL}/incomes/SavingIncomes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(response => response.json());
    }

    public static SavingExpenses(values: any) {
        return fetch(`${API_URL}/expenses/SavingExpenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(response => response.json());
    }

    public static GetIncomes() {
        return fetch(`${API_URL}/incomes/GetIncomes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json());
    }

    public static GetExpenses() {
        return fetch(`${API_URL}/expenses/GetExpenses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json());
    }

    public static DeleteIncomes(id: number) {
        return fetch(`${API_URL}/incomes/DeleteIncomes`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                incomeID: id
            })
        }).then(response => response.json());
    }

    public static DeleteExpenses(id: number) {
        return fetch(`${API_URL}/expenses/DeleteExpenses`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                expenseID: id
            })
        }).then(response => response.json());
    }

    public static UpdateIncomes(badge: string, income: number) {
        return fetch(`${API_URL}/incomes/UpdateIncomes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                badge,
                incomeID: income
            })
        }).then(response => response.json());
    }

    public static UpdateExpenses(badge: string, expense: number) {
        return fetch(`${API_URL}/expenses/UpdateExpenses`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                badge,
                expenseID: expense
            })
        }).then(response => response.json());
    }

    public static GetUserData() {
        return fetch(`${API_URL}/users/GetUserData`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

    public static UpdateUserData(newUserData: any) {
        return fetch(`${API_URL}/users/UpdateUserData`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserData)
        }).then(response => response.json());
    }

    public static DeleteUser() {
        return fetch(`${API_URL}/users/DeleteUser`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    public static saveUserSavings(values: any) {
        return fetch(`${API_URL}/users/UserSavings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(response => response.json());
    }
}