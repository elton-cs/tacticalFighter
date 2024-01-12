import { Field, Struct } from "o1js";
import { GameSet, MoveState, Player } from "./types";

export function printGameState(someGameState: GameSet) {
    let p1Health = someGameState.p1.health.toString() 
    let p1Stamina = someGameState.p1.stamina.toString()
    let p1Move = someGameState.moveState.p1Move.toString()

    let p2Health = someGameState.p2.health.toString() 
    let p2Stamina = someGameState.p2.stamina.toString()
    let p2Move = someGameState.moveState.p2Move.toString()

    console.log(`
    (Player 1) HP: ${p1Health} | SP: ${p1Stamina} || Move: ${p1Move} \n
    (Player 2) HP: ${p2Health} | SP: ${p2Stamina} || Move: ${p2Move} 
    `)
}