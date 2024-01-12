import { GameCircuitProof, GameCircuit } from './recursive';
import { Bool, Field } from 'o1js';
import { GameSet, MoveState, Player } from './types';
import { printGameState } from './printFunctions';

describe('Start Game', () => {
    beforeAll(async () => {
        await GameCircuit.compile();
    })

    let setPlayerStats = new Player({
        health: Field(10),
        stamina: Field(0),
    })
    let defaultMoveSet = new MoveState({
        p1Move: Field(0),
        p2Move: Field(0),
    })
    let setDefaultGameSet = new GameSet({
        p1: setPlayerStats,
        p2: setPlayerStats,
        moveState: defaultMoveSet
    })

    let proof0: GameCircuitProof
    let proof1: GameCircuitProof
    let proof2: GameCircuitProof

    it('create new game', async () => {
        proof0 = await GameCircuit.startNewGame(setDefaultGameSet, setPlayerStats)
        let output = proof0.publicOutput
        printGameState(output)
    })

    it('player 1 submits a move', async () => {
        let plMove = Field(1)
        proof1 = await GameCircuit.submitMove(proof0.publicOutput, proof0, Bool(true), plMove)
        let output = proof1.publicOutput
        printGameState(output)
    })

    it('player 2 submits a move', async () => {
        let p2Move = Field(3)
        proof2 = await GameCircuit.submitMove(proof1.publicOutput, proof1, Bool(false), p2Move)
        let output = proof2.publicOutput
        printGameState(output)
    })
})