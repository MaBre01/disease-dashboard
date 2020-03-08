import { API_ROUTE } from "../config/api";

export const getPeople = async () => {
    const url = API_ROUTE + '/people';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (response.status !== 200) {
            return console.error(response);
        }

        return await response.json();
    } catch (err) {
        return console.error(err);
    }
};

export const getPeoplePage = async (page) => {
    const url = API_ROUTE + '/people?page=' + page;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (response.status !== 200) {
            return console.error(response);
        }

        return await response.json();
    } catch (err) {
        return console.error(err);
    }
};