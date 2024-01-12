import { Bool, Field, Provable, Struct, ZkProgram } from "o1js";

export class Player extends Struct({
    health: Field,
    stamina: Field
}) {}

export class MoveState extends Struct({
    p1Move: Field,
    p2Move: Field,
}) {}

export class GameSet extends Struct({
    p1: Player,
    p2: Player,
    moveState: MoveState,
}) {}


function startNewGame(statsFromPlayer: Player): GameSet {
    let startMoveState = new MoveState({p1Move: Field(0), p2Move: Field(0)})
    let gameSet = new GameSet({p1: statsFromPlayer, p2: statsFromPlayer, moveState: startMoveState})
    return gameSet
}
export const StartGameCircuit = ZkProgram({
    name: 'Start Game Circuit',
    publicInput: Player,
    publicOutput: GameSet,

    methods: {
        startNewGame: {
            privateInputs: [],
            method: startNewGame
        }
    },
})
export class StartGameCircuitProof extends ZkProgram.Proof(
    StartGameCircuit
){}


function submitMove(prevProof: StartGameCircuitProof, isPlayer1: Bool, playerMove: Field): GameSet {
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
export const SubmitMoveCircuit = ZkProgram({
    name: 'Submit Move Circuit',
    publicOutput: GameSet,

    methods: {
        submitMove: {
            privateInputs: [StartGameCircuitProof, Bool, Field],
            method: submitMove
        }
    },
})
export class SubmitMoveCircuitProof extends ZkProgram.Proof(
    SubmitMoveCircuit
){}