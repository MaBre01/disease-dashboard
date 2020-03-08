import { API_ROUTE } from "../config/api";

export const getContractedByCity = async () => {
    const url = API_ROUTE + '/cities/information';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
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