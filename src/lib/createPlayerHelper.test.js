import {createPlayer} from './createPlayerHelper'

import {MatchResultService} from '../services/match-results-service.js';
//E:\Webb Utveckling\Gaming2017\src\services\match-results-service.js

export const createPlayer = (newPlayer)=>{
  let a="";
  MatchResultService.getPlayerList().then(response=>{
    a = response;

  });
  return a;
}



test('create a new player add it to current list', ()=> {

  const startCreate = [
    {"Johan":{"assist":0,"id": 1, "name": "Johan", "isHomeTeam": null}},
    {"Peter":{"assist":0,"id": 2, "name": "Peter", "isHomeTeam": null}},
    {"Niklas":{"assist":0,"id": 3, "name": "Niklas", "isHomeTeam": null}}
  ]

  const newCreate = {"Mats":{"assist":0,"id": 4, "name": "Mats", "isHomeTeam": null}}

  const expected = [
    {"Johan":{"assist":0,"id": 1, "name": "Johan", "isHomeTeam": null}},
    {"Peter":{"assist":0,"id": 2, "name": "Peter", "isHomeTeam": null}},
    {"Niklas":{"assist":0,"id": 3, "name": "Niklas", "isHomeTeam": null}},
    {"Mats":{"assist":0,"id": 4, "name": "Mats", "isHomeTeam": null}}
  ]

  const result = createPlayer(newCreate)

  expect(result).toEqual(expected)




})
