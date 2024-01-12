import { Field, Struct } from "o1js";

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