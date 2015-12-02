# DailyFBB-Engine

The Purpose of DailyFBB-Engine is to generate "the best lineup", or the lineup with the highest projected point output in a given day. 
The data powering this script is from numberfire (www.numberfire.com).

The current iteration of this script only works with numberfire data & fanduel (www.fanduel.com) pricing. 

Hopefully this script can help set the best lineup without effort.

# How to use it

Prerequisites:
	node
	or-tools (https://developers.google.com/optimization/installing)

1) Download all files from this page, and make sure they are at the same level in a folder.

2) In Terminal, move into the folder (ex cd /Downloads/DailyFBB-Engine )

3) Once in the folder in Terminal, make sure to run numberfire.py, and write the results to output.json

		node numberfire.js > output.json
		
4) Once the output file is updated, run queryNF.js in terminal

		node queryNF.js
		
5) Then run analysis.js in terminal and output to players.csv

		node analysis.js > players.csv
6) Finally, run optimize.py

		python2.7 optimize.py

That's it.


  
  
