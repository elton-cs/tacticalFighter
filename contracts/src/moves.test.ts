import { GameCircuitProof, GameCircuit } from './GameCircuit';
import { Bool, Field, SelfProof } from 'o1js';
import { GameSet, MoveState, Player } from './types';
import { printGameState } from './printFunctions';
import { VerifyRoundCircuit } from './VerifyRoundCircuit';

export function makeListOfAllMoveStates(): MoveState[] {
    let moveList: MoveState[] = [];
    for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            let newMoveState = new MoveState({p1Move: Field(i), p2Move: Field(j)})
            moveList.push(newMoveState)
        }
    }
    return moveList
}

describe('Start Game', () => {
    beforeAll(async () => {
        await VerifyRoundCircuit.compile()
    })

    // let proof: SelfProof<GameSet, GameSet>
    let allMoves = makeListOfAllMoveStates()
    let defaultPlayerStats = new Player({health: Field(10), stamina: Field(0)})

    it('test case CC', async () => {
        let moveCase = allMoves[0]
        let defaultGameSet = new GameSet({p1: defaultPlayerStats, p2: defaultPlayerStats, moveState: moveCase})
        printGameState(defaultGameSet)
        let proof = await VerifyRoundCircuit.verifyRound(defaultGameSet)
        printGameState(proof.publicOutput)
    })

    it('test case CS', async () => {
        let moveCase = allMoves[1]
        let defaultGameSet = new GameSet({p1: defaultPlayerStats, p2: defaultPlayerStats, moveState: moveCase})
        printGameState(defaultGameSet)
        let proof = await VerifyRoundCircuit.verifyRound(defaultGameSet)
        printGameState(proof.publicOutput)
    })

    it('test case CB', async () => {
        let moveCase = allMoves[2]
        let defaultGameSet = new GameSet({p1: defaultPlayerStats, p2: defaultPlayerStats, moveState: moveCase})
        printGameState(defaultGameSet)
        let proof = await VerifyRoundCircuit.verifyRound(defaultGameSet)
        printGameState(proof.publicOutput)
    })

    it('test case SC', async () => {
        let moveCase = allMoves[3]
        let defaultGameSet = new GameSet({p1: defaultPlayerStats, p2: defaultPlayerStats, moveState: moveCase})
        printGameState(defaultGameSet)
        let proof = await VerifyRoundCircuit.verifyRound(defaultGameSet)
        printGameState(proof.publicOutput)
    })

    it('test case SS', async () => {
        let moveCase = allMoves[4]
        let defaultGameSet = new GameSet({p1: defaultPlayerStats, p2: defaultPlayerStats, moveState: moveCase})
        printGameState(defaultGameSet)
        let proof = await VerifyRoundCircuit.verifyRound(defaultGameSet)
        printGameState(proof.publicOutput)
    })

    it('test case SB', async () => {
        let moveCase = allMoves[5]
        let defaultGameSet = new GameSet({p1: defaultPlayerStats, p2: defaultPlayerStats, moveState: moveCase})
        printGameState(defaultGameSet)
        let proof = await VerifyRoundCircuit.verifyRound(defaultGameSet)
        printGameState(proof.publicOutput)
    })

    it('test case BC', async () => {
        let moveCase = allMoves[6]
        let defaultGameSet = new GameSet({p1: defaultPlayerStats, p2: defaultPlayerStats, moveState: moveCase})
        printGameState(defaultGameSet)
        let proof = await VerifyRoundCircuit.verifyRound(defaultGameSet)
        printGameState(proof.publicOutput)
    })

    it('test case BS', async () => {
        let moveCase = allMoves[7]
        let defaultGameSet = new GameSet({p1: defaultPlayerStats, p2: defaultPlayerStats, moveState: moveCase})
        printGameState(defaultGameSet)
        let proof = await VerifyRoundCircuit.verifyRound(defaultGameSet)
        printGameState(proof.publicOutput)
    })

    it('test case BB', async () => {
        let moveCase = allMoves[8]
        let defaultGameSet = new GameSet({p1: defaultPlayerStats, p2: defaultPlayerStats, moveState: moveCase})
        printGameState(defaultGameSet)
        let proof = await VerifyRoundCircuit.verifyRound(defaultGameSet)
        printGameState(proof.publicOutput)
    })
})