import { API_ROUTE } from "../config/api";

export const getContracted = async () => {
    const url = API_ROUTE + '/contracted_diseases';

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

export const getContractedByYear = async (year) => {
    const url = API_ROUTE + '/contracted_diseases/information/' + year;

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