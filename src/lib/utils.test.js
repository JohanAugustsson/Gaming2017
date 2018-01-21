import {getPropertyValueFromObjectsInObject, removeObjectsThatContainsInList, sortByKeyName} from "./utils";

const players = {
    "Petter": {
        "isHomeTeam": false,
        "name": "Petter",
        "five": "what"
    },
    "Johan": {
        "isHomeTeam": true,
        "name": "Johan",
        "another": 1,
        "third": 3
    },
    "Peter": {
        "isHomeTeam": false,
        "name": "Peter",
        "five": "what"
    },
    "Ost": {
        "isHomeTeam": false,
        "name": "Ost",
        "five": "what"
    }
};

test('sortByKeyName should sort object in alphabetical order ', () => {
    // Arrange
    const expected = {
        "Johan": {
            "isHomeTeam": true,
            "name": "Johan",
            "another": 1,
            "third": 3
        },
        "Ost": {
            "isHomeTeam": false,
            "name": "Ost",
            "five": "what"
        },
        "Peter": {
            "isHomeTeam": false,
            "name": "Peter",
            "five": "what"
        },
        "Petter": {
            "isHomeTeam": false,
            "name": "Petter",
            "five": "what"
        }
    };

    // Act
    let result = sortByKeyName(players);

    // Assert
    expect(result).toEqual(expected);
});

test('getPropertyValueFromObjectsInObject should return names in object', () => {
    //Arrange
    const expected = ["Johan", "Ost", "Peter", "Petter"];
    //Act
    let result = getPropertyValueFromObjectsInObject(players, "name");

    //Assert
    expect(result).toContain(expected[0]);
    expect(result).toContain(expected[1]);
    expect(result).toContain(expected[2]);
    expect(result).toContain(expected[3]);
});

test('removeObjectsThatContainsInList should remove object specified in another list', () => {
    //Arrange
    const namesThatShouldBeRemoved = ["Johan", "Ost", "Peter"];

    const expected = {
        "Petter": {
            "isHomeTeam": false,
            "name": "Petter",
            "five": "what"
        }
    };

    //Act
    let result = removeObjectsThatContainsInList(namesThatShouldBeRemoved, players);

    //Assert
    expect(result).toEqual(expected);
})