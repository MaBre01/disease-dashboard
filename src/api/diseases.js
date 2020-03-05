export const getDiseases = async () => {
    const url = 'https://api-disease.mickael-danjoux.com/api/diseases';

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
    const url = 'https://api-disease.mickael-danjoux.com/api/diseases/' + diseaseId;

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
    const url = 'https://api-disease.mickael-danjoux.com/api/diseases/' + diseaseId + '/information/' + year;

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
    const url = 'https://api-disease.mickael-danjoux.com/api/diseases/' + diseaseId + '/information/gender';

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
    const url = 'https://api-disease.mickael-danjoux.com/api/diseases/' + diseaseId + '/information/contracted_by_year';

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