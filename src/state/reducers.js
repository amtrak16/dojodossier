import {
    NEWDOSSIER,
    ADDNEWITEM,
    CLRACTIVE,
    SELDOSSIER
} from './actions'

class Dossier {
    constructor(
        curId,
        title,
        items,
        item
    ) {
        this.curId = curId;
        this.title = title;
        this.items = items;
        this.item = item;
    }
}

const initialState = {
    dossier: [{curId: false, title: '', items: [{item: ''}]}]
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case NEWDOSSIER:
            const newDoss = new Dossier(action.payload.curId, action.payload.title, action.payload.items)
            let newArr = []
            newArr.push(newDoss)
            return { ...state, dossier: state.dossier.concat(newArr) }
        case ADDNEWITEM:
            updArr = []
            state.dossier.forEach((dossier, idx) => {
                if (idx == action.payload.selId) {
                    let newItems = []
                    dossier.items.forEach((item) => {
                        newItems.push(item)
                    })
                    newItems.push(action.payload.item)
                    const updDoss = new Dossier(dossier.curId, dossier.title, newItems)
                    updArr.push(updDoss)
                } else {
                    updArr.push(dossier)
                }
            })
            return { ...state, dossier: updArr }
        case CLRACTIVE:
            let updArr = []
            state.dossier.forEach((dossier, idx) => {
                const updDoss = dossier
                updDoss.curId = false
                updArr.push(updDoss)
            })
            return { ...state, dossier: updArr }
        case SELDOSSIER:
            let selArr = []
            state.dossier.forEach((dossier, idx) => {
                if (idx == action.payload.selId) {
                    const selDoss = dossier
                    selDoss.curId = true
                    selArr.push(selDoss)
                } else {
                    selArr.push(dossier)
                }
            })
            return { ...state, dossier: selArr }
        default:
            return state;
    }
}

export default reducer;