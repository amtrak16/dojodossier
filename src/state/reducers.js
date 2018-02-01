import {
    SELECTPERSON,
    RETURNTOSEARCH
} from './actions'

const initialState = {
    dossier: [{name: '', items: []}]
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case SELECTPERSON:
            return { ...state, peopleSelect: action.payload.peopleSelect, peopleSelected: action.payload.peopleSelected};
        case RETURNTOSEARCH:
            return { ...state, peopleSelect: action.payload.peopleSelect};
        default:
            return state;
    }
}

export default reducer;