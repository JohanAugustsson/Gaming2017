export class Player {
	constructor(name,id) {
		this.name = name;
    this.assist = 0;
    this.id= id;
    this.isHomeTeam= null;
    this.matchesPlayed= 0;
    this.matchesHome= 0;
    this.matchesAway= 0;
    this.matchesWins= 0;
    this.goalTotal= 0;
    this.goalHome= 0;
    this.goalAway= 0;
    this.goalFor= 0;
    this.goalAgainst= 0;
    this.matchesDraw = 0;
	}

}
