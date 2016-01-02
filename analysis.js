var nfData = require('./queryNF.js')
var rotoqlData = require('./queryRotoQL.js')
rotoqlData = rotoqlData.rotoql
nfDataLength = nfData.nf.length;

mergedArray = []
csvContent = "position, player, projection, salary\n"

for (var i = 0; i < nfDataLength; i++) {
	var name = nfData.nf[i][0]
	var pos = nfData.nf[i][1]
	var sal = nfData.nf[i][2]
	var nf_points = nfData.nf[i][3]
	var team = nfData.nf[i][6]["abbrev"]

	var teams = ["BKN", "BOS", "SAC", "PHX"]
	if (teams.indexOf(team) < 0) {
		if (rotoqlData[name]) {
			var rotoql_points = rotoqlData[name].projection
			var avg_points = (nf_points + rotoql_points) / 2
			var player = '' + pos + ", " + name + ", " + avg_points + ", " + sal + "\n"
			csvContent += player
		};
	};
};

console.log(csvContent)