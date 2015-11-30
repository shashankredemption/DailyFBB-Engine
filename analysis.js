var nfData = require('./queryNF.js')

nfDataLength = nfData.nf.length;

mergedArray = [];

for (var i = 0; i < nfDataLength; i++){
	var player = [];
	var name = nfData.nf[i][0]
	var pos = nfData.nf[i][1]
	var sal = nfData.nf[i][2]
	var swish_points = 999
	var swish_ppp = 999
	var nf_points = nfData.nf[i][3]
	var nf_ppp = parseInt(sal / nf_points)
	var avg_points = nf_points
	var avg_ppp = nf_ppp
	var team = nfData.nf[i][6]
	if(swish_points !== 0){
		player.push(name, pos, sal, swish_points, swish_ppp, nf_points, nf_ppp, avg_points, avg_ppp, team)
		mergedArray.push(player)
	}
}

module.exports = mergedArray