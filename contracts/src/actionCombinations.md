# Possible Move Permutations

Moveset = [charge, strike, block] = [C(1),S(2),B(3)]

12 (Player 1 or 2):
CC - add 1 stamina to both
CS - remove 1 health to p1
CB - add 1 stamina to p1
SC - remove 1 health to p2
SS - do nothing
SB - do nothing
BC - add 1 stamina to p2
BS - do nothing
BB - do nothing

organized for least Provable.if checks:

CB - add 1 stamina to p1 *
BC - add 1 stamina to p2 *
CC - add 1 stamina to both *
CS - remove 1 health from p1 *
SC - remove 1 health from p2 *
SS - remove 1 health from both *
SB - do nothing
BS - do nothing
BB - do nothing