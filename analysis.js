var fs = require('fs');
var path = require('path');
var nfData = require('./queryNF.js')
var rotoqlData = require('./queryRotoQL.js')
rotoqlData = rotoqlData.rotoql
nfDataLength = nfData.nf.length;

mergedArray = []
csvContent = "position, player, projection, salary\n"

for (var j = 1; j <= 100; j++) {
	for (var i = 0; i < nfDataLength; i++) {
		var name = nfData.nf[i][0]
		var pos = nfData.nf[i][1]
		var sal = nfData.nf[i][2]
		var nf_points = nfData.nf[i][3]
		var team = nfData.nf[i][6]["abbrev"]

		var teams = []
		if (teams.indexOf(team) < 0) {
			if (rotoqlData[name]) {
				var rotoql_points = rotoqlData[name].projection
				var avg_points = (j/100) * nf_points + ((100-j)/100) * rotoql_points
				var player = '' + pos + ", " + name + ", " + avg_points + ", " + sal + "\n"
				csvContent += player
			};
		};
	};
	var file = '/analysis/players' + j + '.csv'
	console.log(file)

	fs.writeFile(path.join(__dirname, file), csvContent, function(err) {
		if (err) {
			return console.log(err);
		}

		console.log("saved")
	}) 
	csvContent = "position, player, projection, salary\n"
};


