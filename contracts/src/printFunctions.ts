import { Field, Struct } from "o1js";
import { GameSet, MoveState, Player } from "./types";

export function printGameState(someGameState: GameSet) {
    let p1Health = someGameState.p1.health.toString() 
    let p1Stamina = someGameState.p1.stamina.toString()
    let p1Move = printMove(someGameState.moveState.p1Move)

    let p2Health = someGameState.p2.health.toString() 
    let p2Stamina = someGameState.p2.stamina.toString()
    let p2Move = printMove(someGameState.moveState.p2Move)

    console.log(`
    (Player 1) HP: ${p1Health} | SP: ${p1Stamina} || Move: ${p1Move} \n
    (Player 2) HP: ${p2Health} | SP: ${p2Stamina} || Move: ${p2Move} 
    `)
}

export function printMove(move: Field): String {
    let string: String
    if (move.toString() == "0") {
        string = "none"
    }
    else if (move.toString() == "1") {
        string = "charge"
    }
    else if (move.toString() == "2") {
        string = "strike"
    }
    else string = "block"

    return string
}