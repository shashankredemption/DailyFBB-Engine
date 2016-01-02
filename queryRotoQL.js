var rotoqlData = require('./rotoql.json')
var length = rotoqlData.length
var omnibus = {}

for (var i = 0; i < length; i++) {
	var nameAndPosition = rotoqlData[i]["name"]
	var name = separate(nameAndPosition)[0]
	var position = separate(nameAndPosition)[1]
	var salary = rotoqlData[i]["salary"]
	var points = rotoqlData[i]["projection"]
	var team = rotoqlData[i]["team"]
	var info = {
		"position":position,
		"salary":salary,
		"team":team,
		"projection":points
	};
	omnibus[name] = info
}

function separate(s) {
    var n = s.split(" ");
    var position = n.splice(n.length - 1, 1)
    return [n.join(' '), position.join()];
}

exports.rotoql = omnibus;