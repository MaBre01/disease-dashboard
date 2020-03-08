import { API_ROUTE } from "../config/api";

export const getDiseases = async () => {
    const url = API_ROUTE + '/diseases';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return await response.json();
        }

        return console.error(response);
    } catch (err) {
        return console.error(err);
    }
};

export const getDisease = async (diseaseId) => {
    const url = API_ROUTE + '/diseases/' + diseaseId;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return await response.json();
        }

        return console.error(response);
    } catch (err) {
        return console.error(err);
    }
};

export const getInfectedCountByYear = async (diseaseId, year) => {
    const url = API_ROUTE + '/diseases/' + diseaseId + '/information/' + year;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return await response.json();
        }

        return console.error(response);
    } catch (err) {
        return console.error(err);
    }
};

export const getInfectedCountByGender = async (diseaseId) => {
    const url = API_ROUTE + '/diseases/' + diseaseId + '/information/gender';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return await response.json();
        }

        return console.error(response);
    } catch (err) {
        return console.error(err);
    }
};

export const getInfectedCountByDiseaseByYear = async (diseaseId) => {
    const url = API_ROUTE + '/diseases/' + diseaseId + '/information/contracted_by_year';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return await response.json();
        }

        return console.error(response);
    } catch (err) {
        return console.error(err);
    }
};