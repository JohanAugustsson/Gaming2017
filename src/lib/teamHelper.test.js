import {getAvailablePlayers, switchTeam} from "./teamHelper";
import {getPropertyValueFromObjectsInObject, removeObjectsThatContainsInList} from './utils';

jest.mock('./utils', () => ({
    getPropertyValueFromObjectsInObject: jest.fn(),
    removeObjectsThatContainsInList: jest.fn()
}));

//noinspection JSAnnotator
// utils.getPropertyValueFromObjectsInObject = jest.fn();

//noinspection JSAnnotator
// utils.removeObjectsThatContainsInList = jest.fn();

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

const availablePlayers = {
    "Johan": {
        "playsForTeam": 1,
        "name": "Johan",
        "another": 12
    },
    "Peter": {
        "playsForTeam": 123,
        "name": "Peter",
        "five": "should"
    },
    "Pontus": {
        "playsForTeam": 0,
        "name": "Pontus",
        "another": 1
    },
    "Rickard": {
        "playsForTeam": 0,
        "name": "Rickard",
        "five": "hi"
    }
}

test('switchTeam should switch to team 1', () => {
    //Arrange
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

    // Act
    const result = switchTeam(startMatch, changedPlayer, changedProperty);

    //Assert
    expect(result).toEqual(expected)

});


test('switchTeam should add player with properties and update changed property when players list is null', () => {
    //Arrange
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
            "playsForTeam": 0,
            "name": "Pontus",
            "another": 1
        },
        "Rickard": {
            "playsForTeam": 0,
            "name": "Rickard",
            "five": "hi"

    }};
   getPropertyValueFromObjectsInObject.mockImplementation(()=> playersInMatch);
   removeObjectsThatContainsInList.mockImplementation(()=> playersToAdd);

    const expected = {
        "Johan": {
            "playsForTeam": 0,
            "name": "Johan",
            "another": 1
        },
        "Peter": {
            "playsForTeam": 0,
            "name": "Peter",
            "five": "what"
        },
        "Pontus": {
            "playsForTeam": 0,
            "name": "Pontus",
            "another": 1
        },
        "Rickard": {
            "playsForTeam": 0,
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
    expect(result["Johan"].playsForTeam).toEqual(expected["Johan"].playsForTeam);
    expect(getPropertyValueFromObjectsInObject).toHaveBeenCalled();
});
