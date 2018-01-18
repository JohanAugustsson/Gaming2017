/**
 * Lägger till spelare med dess properties samt ny property i en match
 * @param matches .
 * @param player player som ska ändras, kan utökas med nya properties
 * @param changedProperty changedProperty utökad eller ändrad property för en spelare
 * @returns {} matcher med uppdaterade spelare
 */
export const switchTeam = (matches, player, changedProperty) => {
    const matchId = Object.keys(matches)[0];
    const changedPropertyId = Object.keys(changedProperty)[0];
        return {
            ...matches, [matchId]: {
                ...matches[matchId], players: {
                    ...matches[matchId].players, [player.name]: {
                        ...(matches[matchId].players ? {...matches[matchId].players[player.name]}: {}),
                        ...player, [changedPropertyId]: changedProperty[changedPropertyId],
                    }
                }
            }
        }
};


