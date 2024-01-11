# Tactical Fighter

## A turn-based PvP fighter

A turn based 1v1 fighting game building on rps fundamentals.

Objective: Defeat the other player by reducing their health points (HP) to 0.

Player Stats:
1. Health Points (HP). Starts at 10 HP.
2. Stamina Points (SP). Starts at 0 SP.

Each player starts with the following moveset:
- Charge: Gains 1 SP.
- Strike: Deals 1 HP. Costs 1 SP. 
- Block: Negates one Strike.
- Focus: Doubles Strike damage. Costs 1 SP. Focused Strike deals half damage when blocked. 
- Reflect: Reflects any Strike. Costs 1 SP. Deals half damage to attacker.

But how does it ZK:

Single game gets played using recursive zero knowledge proofs.

Recursive zkp mechanics:
1. Player (1/2) iniates a round.
2. Player 1 submits a move for round 1.
3. Player 1 sends proof to Player 2.
4. Player 2 submits a move for round 1.
5. Player 2 sends proof back to Player 1.
6. Player 1 validates round result.
7. Player 1 sends result to Player 2.
8. Player 2 initiates new round.
9. Game loops from 1 to 8 until one player wins.

Final state get published on chain.