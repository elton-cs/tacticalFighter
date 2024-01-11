import { Field, Struct, ZkProgram } from "o1js";

class Player extends Struct({
    health: Field,
    stamina: Field
}) {}

class PlayerSet extends Struct({
    p1: Player,
    p2: Player,
}) {}

function generateProofOfGameStart(statsFromPlayer: Player): PlayerSet {
    let set = new PlayerSet({p1: statsFromPlayer, p2: statsFromPlayer})
    return set
}

const StartGameCircuit = ZkProgram({
    name: 'start-game',
    publicInput: Player,
    publicOutput: PlayerSet,

    methods: {
        generateProofOfGameStart: {
            privateInputs: [],
            method: generateProofOfGameStart
        }
    },
})