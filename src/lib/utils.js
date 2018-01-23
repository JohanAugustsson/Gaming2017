/**
 * Sorterar inskickat objekt i alfabetisk ordning.
 * @param unsorted unsorted lista som ska sorteras
 * @returns {*} sorterat objekt
 */
export const sortByKeyName = (unsorted) => {
    if(unsorted) {
        return Object.keys(unsorted).sort().reduce((value, key) => {value[key] = unsorted[key]; return value}, {});
    }else return {};
};


/**
 * Hämtar angivet property värde i varje objekt enligt: object[key][nameOfProperty]
 * @param objectsInObject objekt som värdena ska extraheras ur
 * @param nameOfProperty namn på den property som ska hämtas ur varje objekt
 * @returns {Array} värde
 */
export const getPropertyValueFromObjectsInObject = (objectsInObject, nameOfProperty) => {
    return Object.keys(objectsInObject).map(key => objectsInObject[key][nameOfProperty]);
};

/**
 * Tar bort objekt från availableObjects som förekommer i inskickad lista.
 * @param keyNameList namn på de objekt som skall sorteras bort
 * @param availableObjects .
 * @returns {{}} filtrerat objekt
 */
export const removeObjectsThatContainsInList = (keyNameList, availableObjects) => {
    let keyNamesToKeep = Object.keys(availableObjects).filter(key => {
        return (keyNameList.indexOf(key) === -1);
    });

    let temp = {};
    keyNamesToKeep.map(key => temp = {...temp, [key]: availableObjects[key]});

    return temp;
};

