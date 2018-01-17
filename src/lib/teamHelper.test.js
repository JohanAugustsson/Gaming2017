import {switchTeam} from "./teamHelper";
const startMatch = {
    "1515849665586": {
        "players": {
            "Johan": {
                "playsForTeam": 0,
                "name": "Johan"
            },
            "Peter": {
                "playsForTeam": 0,
                "name": "Peter"
            }
        },
        "serie": "innebandy2018",
        "typ": "innebandy"
    }
}

test('switchTeam should switch to team 1', () => {

    const changedPlayer = {
        name: "Johan",
            playsForTeam: 1
    };

    const expected = {
        "1515849665586": {
            "players": {
                "Johan": {
                    "playsForTeam": 1,
                    "name": "Johan"
                },
                "Peter": {
                    "playsForTeam": 0,
                    "name": "Peter"
                }
            },
            "serie": "innebandy2018",
            "typ": "innebandy"
        }
    }
    const result = switchTeam(startMatch, changedPlayer);

    expect(result).toEqual(expected)

})