const scores = [80, 100, 20, 55, 65, 80, 41, 85]

function average(scores) {
    let sum = scores.reduce((acc, score) => acc + score, 0)
    let avg = sum / scores.length
    const sortScores = scores.sort((a, b) => a-b)
    let best = sortScores[sortScores.length - 1]
    let worst = sortScores[0]
    return {avg: avg, best: best,worst: worst}
}
console.log(average(scores));