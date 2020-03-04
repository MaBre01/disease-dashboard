import * as fromApi from '../api/diseases';

export const GET_DISEASES = "GET_DISEASES";

export const allDiseases = diseases => ({
    type: GET_DISEASES,
    payload: diseases
});

export const getDiseases = () => async dispatch => {
    const diseases = await fromApi.getDiseases();
    dispatch(allDiseases(diseases));
};