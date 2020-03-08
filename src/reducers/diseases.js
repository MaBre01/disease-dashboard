import * as fromDiseaseActions from '../actions/disease';

let initialState = {
    diseases: []
};

const DiseasesReducer = (state = initialState, action) => {
    switch (action.type) {
        case fromDiseaseActions.GET_DISEASES:
            return {...state, diseasesData: action.payload};
        default:
            return state;
    }
};

export default DiseasesReducer;