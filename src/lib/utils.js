
// Todo: Implementera test
/**
 * Sorterar inskickat objekt i alfabetisk ordning.
 * @param unsorted unsorted lista som ska sorteras
 * @returns {*} sorterat objekt
 */
export const sortByKeyName = (unsorted) => {
    if(unsorted) {
        return Object.keys(unsorted).sort().reduce((value, key) => (value[key] = unsorted[key], value), {});
    }else return {};
};
