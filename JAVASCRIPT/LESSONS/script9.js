const teams = [
    { id: 1, name: "Tel Aviv Lions", city: "Tel Aviv", wins: 10, losses: 2, players: ["John", "Mike", "Sarah"] },
    { id: 2, name: "Jerusalem Bears", city: "Jerusalem", wins: 8, losses: 4, players: ["Tom", "Anna", "Emily"] },
    { id: 3, name: "Be'er Sheva Goats", city: "Be'er Sheva", wins: 54, losses: 7, players: ["Chris", "Alex", "Rachel"] },
    { id: 4, name: "Eilat Eagles", city: "Eilat", wins: 3, losses: 9, players: ["David", "Sophie", "Linda"] }
];

function findTopTeam(teams) { // finds the team with the most wins
    return teams.reduce((acc, team) => {
        if (team.wins > acc.wins) {
            return team;
        }
        return acc;
    })
}
console.log(findTopTeam(teams));

function addPlayerToTeam(teamName, playerName) { //adds a player to a team
    const team = teams.find(team => team.name === teamName)
    if (!team) {return "Team not found"}
    team.players.push(playerName)
    return `Player ${playerName} added to team ${teamName}`
}

console.log(addPlayerToTeam("Tel Aviv Lions", "Daniel"));

// function calculateWinLossRatio() { //returns another object for every team with their name and w/o ratio
//     return teams.map(team => {
//         return { name: team.name, ratio: team.wins / team.losses }
//     })
// }

// console.log(calculateWinLossRatio());

function calculateWinLossRatio2() {
    return teams.map((team) => ({
        name: team.name, ratio: !team.losses ? team.wins : Number((team.wins / team.losses).toFixed(2))}))
}//toFixed(2) is used to round the number to 2 decimal places

console.log(calculateWinLossRatio2());

function findTeamByCity(city) { //finds a team by it's city
    return teams.find(team => team.city === city)
}

console.log(findTeamByCity("Be'er Sheva"));

function deleteTeamById(id) { //deletes a team by their id
    const team = teams.find(team => team.id === id)
    if (!team) {return "Team not found"}
    teams.splice(teams.indexOf(team),1)
    return `Team with id: ${id} deleted`
}

function deleteTeamById2(id) {
    const index = teams.findIndex((team) => team.id === id)
    if (index === -1) {return `Team with id: ${id} not found`} //checks if the team is real
    const deletedTeam = teams.splice(index, 1) //deletes the team
    return `Team ${deletedTeam[0].name} has been deleted`
}
console.log(deleteTeamById2(2));

// console.log(deleteTeamById(1));
// console.log(teams);

function calculateTotalPlayers() { //returns the total amount of players
    return teams.reduce((acc, team) => acc + team.players.length, 0)
}
console.log(calculateTotalPlayers());

// function generateLeagueTable() { //sorts teams by wins in descending order
//     return teams.sort((a, b) => b.wins - a.wins)
// }

function  generateLeagueTable() {
    return [...teams].sort((a, b) => b.wins - a.wins).map((team) => {
        return {name: team.name, wins: team.wins, losses: team.losses}
    })
}
console.log(generateLeagueTable());
console.log(teams);