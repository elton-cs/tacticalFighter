import { Bool, Field, Provable, SelfProof, ZkProgram } from "o1js";
import { GameSet, MoveState, Player } from "./types";

function startNewGame(defaultGameSet: GameSet, defaultPlayerStats: Player): GameSet {
    let defaultMoveSet = new MoveState({
        p1Move: Field(0),
        p2Move: Field(0),
    })
    let standardGameSet = new GameSet({
        p1: defaultPlayerStats,
        p2: defaultPlayerStats,
        moveState: defaultMoveSet
    })
    return standardGameSet
}
function submitMove(oldGameSet: GameSet, prevProof: SelfProof<GameSet, GameSet>, isPlayer1: Bool, playerMove: Field): GameSet {
    prevProof.verify()
    playerMove.assertGreaterThanOrEqual(Field(1))
    playerMove.assertLessThanOrEqual(Field(3))

    let oldP1Move = prevProof.publicOutput.moveState.p1Move
    let oldP2Move = prevProof.publicOutput.moveState.p2Move

    let newP1Move = Provable.if(
        isPlayer1,
        playerMove,
        oldP1Move,
    )
    let newP2Move = Provable.if(
        isPlayer1,
        oldP2Move,
        playerMove,
    )
    let newMoveState = new MoveState({
        p1Move: newP1Move,
        p2Move: newP2Move
    })
    let newGameSet = new GameSet({
        p1: prevProof.publicOutput.p1,
        p2: prevProof.publicOutput.p2,
        moveState: newMoveState
    })
    return newGameSet
}
export const GameCircuit = ZkProgram({
    name: 'Game Circuit',
    publicInput: GameSet,
    publicOutput: GameSet,

    methods: {
        startNewGame: {
            privateInputs: [Player],
            method: startNewGame
        },

        submitMove: {
            privateInputs: [SelfProof<GameSet, GameSet>, Bool, Field],
            method: submitMove,
        }
    }
})
export class GameCircuitProof extends ZkProgram.Proof(
    GameCircuit
){}