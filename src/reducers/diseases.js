import * as fromDiseaseActions from '../actions/disease';

let initialState = {
    diseases: []
};

const DiseasesReducer = (state = initialState, action) => {
    switch (action.type) {
        case fromDiseaseActions.GET_DISEASES:
            let tmp = (action.payload) ? action.payload : [];
            return {...state, diseases: [...tmp]};
        default:
            return state;
    }
};

export default DiseasesReducer;