export const getDiseases = async () => {
    const url = 'http://api-disease.mickael-danjoux.com/api/diseases';

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

export const getDisease = async (diseaseId) => {
    const url = 'http://api-disease.mickael-danjoux.com/api/diseases/' + diseaseId;

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

export const fetchDiseasesBetweenDates = async (beginDate, endDate) => {
    const url = 'http://api-disease.mickael-danjoux.com/api/diseases/';

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