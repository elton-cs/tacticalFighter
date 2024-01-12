import { Bool, Field, Provable, ZkProgram } from "o1js";
import { Action, GameSet, MoveState, Player } from "./types";


function checkSingleCharge(move1: Field, move2: Field): Bool {
    return move1.equals(Action.charge).or(move2.equals(Action.charge))
}

function checkSingleStrike(move1: Field, move2: Field): Bool {
    return move1.equals(Action.strike).or(move2.equals(Action.strike))
}

function verifyRound(gameState: GameSet): GameSet {
    // covers all block cases
    let p1Health = gameState.p1.health
    let p1Stamina = gameState.p1.stamina
    let p1Move = gameState.moveState.p1Move

    let p2Health = gameState.p2.health
    let p2Stamina = gameState.p2.stamina
    let p2Move = gameState.moveState.p2Move

    // covers all charge cases
    let oneUsedCharge = checkSingleCharge(p1Move, p2Move)
    p1Stamina = Provable.if(
        oneUsedCharge.and(p1Move.equals(Action.charge)),
        p1Stamina.add(Field(1)),
        p1Stamina
    )
    p2Stamina = Provable.if(
        oneUsedCharge.and(p2Move.equals(Action.charge)),
        p2Stamina.add(Field(1)),
        p2Stamina
    )
    // covers all strike cases
    let oneUsedStrike = checkSingleStrike(p1Move, p2Move)
    p2Health = Provable.if(
        oneUsedStrike.and(p1Move.equals(Action.strike)),
        p2Health.sub(Field(1)),
        p2Health
    )
    p1Health = Provable.if(
        oneUsedStrike.and(p2Move.equals(Action.strike)),
        p1Health.sub(Field(1)),
        p1Health
    )

    let p1 = new Player({
        health: p1Health,
        stamina:p1Stamina
    })
    let p2 = new Player({
        health: p2Health,
        stamina:p2Stamina
    })

    let newGameState = new GameSet({
        p1: p1,
        p2: p2,
        moveState: new MoveState({p1Move: Field(0), p2Move: Field(0)})
    })

    return newGameState
}
export const VerifyRoundCircuit = ZkProgram({
    name: 'Verify Single Round',
    publicInput: GameSet,
    publicOutput: GameSet,

    methods: {
        verifyRound: {
            privateInputs: [],
            method: verifyRound
        }
    }
})