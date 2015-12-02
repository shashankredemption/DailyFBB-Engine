var nfData = require('./queryNF.js')

nfDataLength = nfData.nf.length;

mergedArray = []
csvContent = "position, player, projection, salary\n"

for (var i = 0; i < nfDataLength; i++) {
	var name = nfData.nf[i][0]
	var pos = nfData.nf[i][1]
	var sal = nfData.nf[i][2]
	var nf_points = nfData.nf[i][3]
	var player = '' + pos + ", " + name + ", " + nf_points + ", " + sal + "\n"
	csvContent += player
}

console.log(csvContent)