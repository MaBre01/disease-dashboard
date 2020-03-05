import { API_ROUTE } from "../config/api";

export const getPeople = async () => {
    const url = API_ROUTE + '/people';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        });

        return await response.json();
    } catch (err) {
        return console.error(err);
    }
};