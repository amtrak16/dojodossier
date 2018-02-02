import {
    NEWDOSSIER,
    ADDNEWITEM,
} from './actions'

class Dossier {
    constructor(
        id,
        title,
        items,
        item
    ) {
        this.id = id;
        this.title = title;
        this.items = items;
        this.item = item;
    }
}

const initialState = {
    dossier: [{id: 0, title: '', items: [{item: ''}]}]
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case NEWDOSSIER:
            const newDoss = new Dossier(action.payload.id, action.payload.title, action.payload.items)
            let newArr = []
            newArr.push(newDoss)
            console.log(newArr)
            return { ...state, dossier: state.dossier.concat(newArr) };
        case ADDNEWITEM:
            console.log(action.payload)
            return { ...state, dossier: state.dossier[action.payload.id].items.concat(action.payload.items)};
        default:
            return state;
    }
}

export default reducer;