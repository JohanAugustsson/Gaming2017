import {switchTeam} from "./teamHelper";
const startMatch = {
    "1515849665586": {
        "players": {
            "Johan": {
                "playsForTeam": 0,
                "name": "Johan",
                "another": 1
            },
            "Peter": {
                "playsForTeam": 0,
                "name": "Peter",
                "five": "what"
            }
        },
        "serie": "innebandy2018",
        "typ": "innebandy"
    }
};

const startMatchEmptyPlayer = {
    "1515849665586": {
        "players": null,
        "serie": "innebandy2018",
        "typ": "innebandy"
    }
};

test('switchTeam should switch to team 1', () => {

    const changedPlayer = {
        name: "Johan",
        playsForTeam: 1,
        third: 3
    };

    const changedProperty = {"playsForTeam": 1};

    const expected = {
        "1515849665586": {
            "players": {
                "Johan": {
                    "playsForTeam": 1,
                    "name": "Johan",
                    "another": 1,
                    "third": 3
                },
                "Peter": {
                    "playsForTeam": 0,
                    "name": "Peter",
                    "five": "what"
                }
            },
            "serie": "innebandy2018",
            "typ": "innebandy"
        }
    };
    const result = switchTeam(startMatch, changedPlayer, changedProperty);

    expect(result).toEqual(expected)

});


test('switchTeam should add player with properties and update changed property when players list is null', () => {

    const changedPlayer = {
        name: "Johan",
        playsForTeam: 1,
        third: 3
    };

    const changedProperty = {"playsForTeam": 2};

    const expected = {
        "1515849665586": {
            "players": {
                "Johan": {
                    "name": "Johan",
                    "playsForTeam": 2,
                    "third": 3
                }
            },
            "serie": "innebandy2018",
            "typ": "innebandy"
        }
    };
    const result = switchTeam(startMatchEmptyPlayer, changedPlayer, changedProperty);

    expect(result).toEqual(expected)

});
