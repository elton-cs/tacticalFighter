import { Field, Struct, ZkProgram } from "o1js";

export class Player extends Struct({
    health: Field,
    stamina: Field
}) {}

export class PlayerSet extends Struct({
    p1: Player,
    p2: Player,
}) {}

function generateProofOfGameStart(statsFromPlayer: Player): PlayerSet {
    let set = new PlayerSet({p1: statsFromPlayer, p2: statsFromPlayer})
    return set
}

export const StartGameCircuit = ZkProgram({
    name: 'Start Game Circuit',
    publicInput: Player,
    publicOutput: PlayerSet,

    methods: {
        generateProofOfGameStart: {
            privateInputs: [],
            method: generateProofOfGameStart
        }
    },
})

export class StartGameCircuitProof extends ZkProgram.Proof(
    StartGameCircuit
){}