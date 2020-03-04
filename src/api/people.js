// const url = 'http://api-disease.mickael-danjoux.com/api/people';
const url = 'http://127.0.0.1:8000/api/people';

export const getPeople = async () => {
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