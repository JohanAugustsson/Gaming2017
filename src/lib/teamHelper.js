export const switchTeam = (matches, player) => {
    const matchId = Object.keys(matches)[0];

    return {
        ...matches, [matchId]: {
            ...matches[matchId], players: {
                ...matches[matchId].players, [player.name]: {
                    ...matches[matchId].players[player.name],
                    playsForTeam: player.playsForTeam
                }
            }
        }
    }
};
