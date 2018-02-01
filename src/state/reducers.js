import {
    NEWDOSSIER,
    SELECTPERSON,
} from './actions'

class Dossier {
    constructor(
        id,
        title,
        items
    ) {
        this.id = id;
        this.title = title;
        this.items = items;
    }
}

const initialState = {
    dossier: [{id: 0, title: 'Initial', items: []}]
}
function reducer(state = initialState, action) {
    console.log(action.type) 
    switch (action.type) {
        case NEWDOSSIER:
            const newDoss = new Dossier(action.payload.id, action.payload.title, action.payload.items)
            return { ...state, newDoss };
            console.log(newDoss)
        case SELECTPERSON:
            return { ...state, peopleSelect: action.payload.peopleSelect, peopleSelected: action.payload.peopleSelected};
        default:
            console.log('In reducer default')
            return state;
    }
}

export default reducer;