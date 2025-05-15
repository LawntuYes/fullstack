const teams = [
    { id: 1, name: "Tel Aviv Lions", city: "Tel Aviv", wins: 10, losses: 2, players: ["John", "Mike", "Sarah"] },
    { id: 2, name: "Jerusalem Bears", city: "Jerusalem", wins: 8, losses: 4, players: ["Tom", "Anna", "Emily"] },
    { id: 3, name: "Be'er Sheva Goats", city: "Be'er Sheva", wins: 54, losses: 7, players: ["Chris", "Alex", "Rachel"] },
    { id: 4, name: "Eilat Eagles", city: "Eilat", wins: 3, losses: 9, players: ["David", "Sophie", "Linda"] }
];

function findTopTeam() {
    return teams.reduce((acc, curr) => {
        return curr.wins > acc.wins ? curr : acc;
    }, teams[0])
}

function addPlayerToTeam(teamName, playerName) {
    const team = teams.find(team => team.name === teamName)
    
    if (!team) {return "Team not found"}//if there is a "return" in if, the "else" part of if-else is not needed
    
    team.players.push(playerName)
    
    return `Player ${playerName} added to team ${teamName}`
}
console.log(addPlayerToTeam("Be'er Sheva Goats", "Misha"));

function calculateWinLossRatio() {
    return teams.map((tean) => ({
        name: team.name, ratio: team.losses === 0 ? team.wins : Number((team.wins / team.losses).toFixed(2))}))
}//toFixed(2) is used to round the number to 2 decimal places

console.log(calculateWinLossRatio());

function findTeamByCity(city) {
    const teamsExsits = teams.filter((team) => team.city === city)
    if(teamsExits.length === 0) {return "No teams found"}
    // return !teamsExsits.length ? teamsExsits : "No teams found"

}

function deleteTeamById(id) {
    const index = teams.findIndex((team) => team.id === id)
    if (index === -1) {return `Team with id: ${id} not found`} //checks if the team exists
    const deletedTeam = teams.splice(index, 1)//deletes the team
    return `Team ${deletedTeam[0].name} has been deleted`
}

function calculateTotalPlayers() {
    return teams.reduce((acc, curr) => acc + curr.players.length, 0)
}

function  generateLeagueTable() {
    return [...teams].sort((a, b) => b.wins - a.wins).map((team) => {
        return {name: team.name, wins: team.wins, losses: team.losses}
    })
}
