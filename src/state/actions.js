/*
 * action types
 */
export const NEWDOSSIER = 'NEWDOSSIER';
export const SELECTPERSON = 'SELECTPERSON';

/*
 * action creators
 */
export function newDossier(payload) {
    return { type: NEWDOSSIER, payload: payload }
}
export function selectPerson(payload) {
    return { type: SELECTPERSON, payload: payload }
}