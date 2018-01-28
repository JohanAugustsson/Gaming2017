import {MatchResultService} from '../services/match-results-service.js';
//E:\Webb Utveckling\Gaming2017\src\services\match-results-service.js

export const createPlayer = (newPlayer)=>{
  
  MatchResultService.getPlayerList().then(response=>{
    return response;



  });

}
