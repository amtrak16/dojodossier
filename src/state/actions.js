/*
 * action types
 */
export const NEWDOSSIER = 'NEWDOSSIER';
export const ADDNEWITEM = 'ADDNEWITEM';
export const CLRACTIVE = 'CLRACTIVE';
export const SELDOSSIER = 'SELDOSSIER';

/*
 * action creators
 */
export function newDossier(payload) {
    return { type: NEWDOSSIER, payload: payload }
}
export function addNewItem(payload) {
    return { type: ADDNEWITEM, payload: payload }
}
export function clrActive() {
    return { type: CLRACTIVE }
}
export function selDossier(payload) {
    return { type: SELDOSSIER, payload: payload  }
}
