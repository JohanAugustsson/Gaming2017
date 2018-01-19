import {sortByKeyName} from "./utils";

const players = {
    "Petter": {
        "playsForTeam": 0,
        "name": "Petter",
        "five": "what"
    },
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
    },
    "Ost": {
        "playsForTeam": 0,
        "name": "Ost",
        "five": "what"
    }
};

test('sortByKeyName should sort object in alphabetical order ', () => {
    // Arrange
    const expected = {
        "Johan": {
            "playsForTeam": 1,
            "name": "Johan",
            "another": 1,
            "third": 3
        },
        "Ost": {
            "playsForTeam": 0,
            "name": "Ost",
            "five": "what"
        },
        "Peter": {
            "playsForTeam": 0,
            "name": "Peter",
            "five": "what"
        },
        "Petter": {
            "playsForTeam": 0,
            "name": "Petter",
            "five": "what"
        }
    };

    // Act
    let result = sortByKeyName(players);

    // Assert
    expect(result).toEqual(expected);
});
