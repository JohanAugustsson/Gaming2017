import {getAvailablePlayers, switchTeam} from "./teamHelper";
import {getPropertyValueFromObjectsInObject, removeObjectsThatContainsInList} from './utils';

jest.mock('./utils', () => ({
    getPropertyValueFromObjectsInObject: jest.fn(),
    removeObjectsThatContainsInList: jest.fn()
}));

const startMatch = {
    "1515849665586": {
        "players": {
            "Johan": {
                "isHomeTeam": true,
                "name": "Johan",
                "another": 1
            },
            "Peter": {
                "isHomeTeam": true,
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

const availablePlayers = {
    "Johan": {
        "isHomeTeam": true,
        "name": "Johan",
        "another": 12
    },
    "Peter": {
        "isHomeTeam": true,
        "name": "Peter",
        "five": "should"
    },
    "Pontus": {
        "isHomeTeam": false,
        "name": "Pontus",
        "another": 1
    },
    "Rickard": {
        "isHomeTeam": false,
        "name": "Rickard",
        "five": "hi"
    }
}

test('switchTeam should switch to team 1', () => {
    //Arrange
    const changedPlayer = {
        name: "Johan",
        isHomeTeam: true,
        third: 3
    };

    const changedProperty = {"isHomeTeam": true};

    const expected = {
        "1515849665586": {
            "players": {
                "Johan": {
                    "isHomeTeam": true,
                    "name": "Johan",
                    "another": 1,
                    "third": 3
                },
                "Peter": {
                    "isHomeTeam": true,
                    "name": "Peter",
                    "five": "what"
                }
            },
            "serie": "innebandy2018",
            "typ": "innebandy"
        }
    };

    // Act
    const result = switchTeam(startMatch, changedPlayer, changedProperty);

    //Assert
    expect(result).toEqual(expected)

});


test('switchTeam should add player with properties and update changed property when players list is null', () => {
    //Arrange
    const changedPlayer = {
        name: "Johan",
        isHomeTeam: true,
        third: 3
    };

    const changedProperty = {"isHomeTeam": false};

    const expected = {
        "1515849665586": {
            "players": {
                "Johan": {
                    "name": "Johan",
                    "isHomeTeam": false,
                    "third": 3
                }
            },
            "serie": "innebandy2018",
            "typ": "innebandy"
        }
    };

    // Act
    const result = switchTeam(startMatchEmptyPlayer, changedPlayer, changedProperty);

    //Assert
    expect(result).toEqual(expected)

});

test('getAvailablePlayers should add new players to list of players', () => {
    //Arrange
    const playersInMatch = ["Johan", "Peter"];
    const playersToAdd = {
        "Pontus": {
            "isHomeTeam": false,
            "name": "Pontus",
            "another": 1
        },
        "Rickard": {
            "isHomeTeam": false,
            "name": "Rickard",
            "five": "hi"

    }};
   getPropertyValueFromObjectsInObject.mockImplementation(()=> playersInMatch);
   removeObjectsThatContainsInList.mockImplementation(()=> playersToAdd);

    const expected = {
        "Johan": {
            "isHomeTeam": true,
            "name": "Johan",
            "another": 1
        },
        "Peter": {
            "isHomeTeam": true,
            "name": "Peter",
            "five": "what"
        },
        "Pontus": {
            "isHomeTeam": false,
            "name": "Pontus",
            "another": 1
        },
        "Rickard": {
            "isHomeTeam": false,
            "name": "Rickard",
            "five": "hi"
        }
    };

    // Act
    const result = getAvailablePlayers(startMatch[1515849665586].players, availablePlayers);

    //Assert
    expect(getPropertyValueFromObjectsInObject).toBeCalledWith(startMatch[1515849665586].players, 'name');
    expect(removeObjectsThatContainsInList).toBeCalledWith(playersInMatch, availablePlayers);
    expect(result).toEqual(expected);
    expect(result["Johan"].isHomeTeam).toEqual(expected["Johan"].isHomeTeam);
    expect(getPropertyValueFromObjectsInObject).toHaveBeenCalled();
});
