from ortools.linear_solver import pywraplp

import csv

class Player:
    def __init__(self, opts):
        self.name = opts['player']
        self.position = opts['position'].upper()
        self.salary = int(opts['salary'])
        self.projected = float(opts['projection'])

    def __repr__(self):
        return "[{0: <2}] {1: <20}(${2}, {3})".format(self.position, self.name, self.salary, self.projected)

class Roster:
    POSITION_ORDER = {
        "PG": 0,
        "SG": 1,
        "SF": 2,
        "PF": 3,
        "C": 4
    }

    def __init__(self):
        self.players = []

    def add_player(self, player):
        self.players.append(player)

    def spent(self):
        return sum(map(lambda x: x.salary, self.players))

    def projected(self):
        return sum(map(lambda x: x.projected, self.players))

    def position_order(self, player):
        return self.POSITION_ORDER[player.position]

    def sorted_players(self):
        return sorted(self.players, key=self.position_order)

    def __repr__(self):
        s = '\n'.join(str(x) for x in self.sorted_players())
        s += "\n\nProjected Score: %s" % self.projected()
        s += "\tCost: $%s" % self.spent()
        return s

SALARY_CAP = 60000

POSITION_LIMITS = [
    ["PG", 2],
    ["SG", 2],
    ["SF", 2],
    ["PF", 2],
    ["C",  1]
]

ROSTER_SIZE = 9

position_map = {}

def get_correct_positions():
    with open('fanduel.csv', 'rb') as fanduel_csvfile:
        fanduel_data = csv.DictReader(fanduel_csvfile, skipinitialspace=True)

        for row in fanduel_data:
            position = row['Position']
            first_name = row['First Name']
            last_name = row['Last Name']
            position_map[first_name + ' ' + last_name] = position
            
def run(index):
    solver = pywraplp.Solver('FD', pywraplp.Solver.CBC_MIXED_INTEGER_PROGRAMMING)

    all_players = []
    get_correct_positions()
    with open('analysis/players' + str(index) + '.csv', 'rb') as csvfile:
        csvdata = csv.DictReader(csvfile, skipinitialspace=True)

        for row in csvdata:
            name = row['player']
            row['position'] = position_map[name]
            all_players.append(Player(row))

    variables = []

    for player in all_players:
        variables.append(solver.IntVar(0, 1, player.name))
        
    objective = solver.Objective()
    objective.SetMaximization()

    for i, player in enumerate(all_players):
        objective.SetCoefficient(variables[i], player.projected)

    salary_cap = solver.Constraint(0, SALARY_CAP)
    for i, player in enumerate(all_players):
        salary_cap.SetCoefficient(variables[i], player.salary)

    for position, limit in POSITION_LIMITS:
        position_cap = solver.Constraint(0, limit)

        for i, player in enumerate(all_players):
            if position == player.position:
                position_cap.SetCoefficient(variables[i], 1)

    size_cap = solver.Constraint(ROSTER_SIZE, ROSTER_SIZE)
    for variable in variables:
        size_cap.SetCoefficient(variable, 1)

    solution = solver.Solve()

    if solution == solver.OPTIMAL:
        roster = Roster()

        for i, player in enumerate(all_players):
            if variables[i].solution_value() == 1:
                roster.add_player(player)

        # print "Optimal roster for: $%s\n" % SALARY_CAP
        # print roster
        return roster

    else:
        print "No solution :("


if __name__ == "__main__":
    rosters = []
    final_roster = {}
    for i in range(1,100):
        rosters.append(run(i))

    for roster in rosters:
        for player in roster.players:
            if player.name in final_roster:
                final_roster[player.name][1] += 1 
            else:
                final_roster[player.name] = [player.position, 1]
 
    sorted_final_roster = sorted(final_roster.items(), key=lambda (k, v): v, reverse=True)
    print sorted_final_roster

    solver = pywraplp.Solver('FD', pywraplp.Solver.CBC_MIXED_INTEGER_PROGRAMMING)

    all_players = sorted_final_roster

    variables = []

    for player in all_players:
        variables.append(solver.IntVar(0, 1, player[0]))
        
    objective = solver.Objective()
    objective.SetMaximization()

    for i, player in enumerate(all_players):
        objective.SetCoefficient(variables[i], player[1][1])

    for position, limit in POSITION_LIMITS:
        position_cap = solver.Constraint(0, limit)

        for i, player in enumerate(all_players):
            if position == player[1][0]:
                position_cap.SetCoefficient(variables[i], 1)

    size_cap = solver.Constraint(ROSTER_SIZE, ROSTER_SIZE)
    for variable in variables:
        size_cap.SetCoefficient(variable, 1)

    solution = solver.Solve()

    if solution == solver.OPTIMAL:
        roster = []

        for i, player in enumerate(all_players):
            if variables[i].solution_value() == 1:
                roster.append(player)

        print "Optimal roster for: $%s\n" % SALARY_CAP
        print roster

    else:
        print "No solution :("


