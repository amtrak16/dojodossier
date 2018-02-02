/*
 * action types
 */
export const NEWDOSSIER = 'NEWDOSSIER';
export const ADDNEWITEM = 'ADDNEWITEM';

/*
 * action creators
 */
export function newDossier(payload) {
    return { type: NEWDOSSIER, payload: payload }
}
export function addNewItem(payload) {
    return { type: ADDNEWITEM, payload: payload }
}