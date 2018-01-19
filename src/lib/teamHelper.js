import {sortByKey} from "./utils";

/**
 * Lägger till spelare med dess properties samt ny property i en match
 * @param matches .
 * @param player player som ska ändras, kan utökas med nya properties
 * @param changedProperty changedProperty utökad eller ändrad property för en spelare
 * @returns {*} matcher med uppdaterade spelare
 */
export const switchTeam = (matches, player, changedProperty) => {
    const matchId = Object.keys(matches)[0];
    const changedPropertyId = Object.keys(changedProperty)[0];
    return {
        ...matches, [matchId]: {
            ...matches[matchId], players: {
                ...matches[matchId].players, [player.name]: {
                    ...(matches[matchId].players ? {...matches[matchId].players[player.name]} : {}),
                    ...player, [changedPropertyId]: changedProperty[changedPropertyId],
                }
            }
        }
    }
};

// Todo: refakturera kod, implementera test.
/**
 * Sammanställer objekt av spelare. Filterar ut tillgängliga spelare från availablePlayers
 * som inte redan finns i playersInMatch och lägger till dem.
 * @param playersInMatch spelare i matchen
 * @param availablePlayers tillgänliga spelare
 * @returns {{}} objekt med tillgänliga spelare
 */
export const getPlayers = (playersInMatch, availablePlayers) => {
    if (playersInMatch) {
        let playerNamesInMatch = Object.keys(playersInMatch).map(val => playersInMatch[val].name);
        let playersNotParticipating = Object.keys(availablePlayers).filter(player => {
            return (playerNamesInMatch.indexOf(player) === -1);
        });
        let playersToAdd;
        playersNotParticipating.map(player => playersToAdd = {...playersToAdd, [player]: availablePlayers[player]});

        return sortByKey({...playersInMatch, ...playersToAdd});

    } else return sortByKey(availablePlayers);
};
