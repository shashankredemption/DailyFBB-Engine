var nfData = require('./queryNF.js')

nfDataLength = nfData.nf.length;

mergedArray = []
csvContent = "position, player, projection, salary\n"

for (var i = 0; i < nfDataLength; i++) {
	var name = nfData.nf[i][0]
	var pos = nfData.nf[i][1]
	var sal = nfData.nf[i][2]
	var nf_points = nfData.nf[i][3]
	var team = nfData.nf[i][6]["abbrev"]
	// console.log(team)
	var teams = ["POR", "PHX", "LAL", "SA"]
	// ['OKC', 'UTA', 'MIN', 'DEN', 'POR', 'PHO', 'LAL', 'SA']
	if (teams.indexOf(team) >= 0) {
		var player = '' + pos + ", " + name + ", " + nf_points + ", " + sal + "\n"
		csvContent += player
	}
}

console.log(csvContent)