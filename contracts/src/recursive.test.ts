import { Player, StartGameCircuit, StartGameCircuitProof, SubmitMoveCircuit, SubmitMoveCircuitProof } from './recursive';
import { Bool, Field } from 'o1js';

describe('Start Game', () => {
    beforeAll(async () => {
        await StartGameCircuit.compile();
        await SubmitMoveCircuit.compile();
    })

    let proof0: StartGameCircuitProof
    let proof1: SubmitMoveCircuitProof
    let proof2: SubmitMoveCircuitProof


    it('create start game proof', async () => {
        let playerStats = new Player({
            health: Field(10),
            stamina: Field(0),
        })
        console.log(playerStats)
        
        proof0 = await StartGameCircuit.startNewGame(playerStats)

        let output = proof0.publicOutput
        console.log(output.moveState.p1Move.toJSON())
        console.log(output.moveState.p2Move.toJSON())
    })

    it('player 1 submits a move',async () => {
        let plMove = Field(1)
        proof1 = await SubmitMoveCircuit.submitMove(proof0, Bool(true), plMove)
        let output = proof1.publicOutput
        console.log(output.moveState.p1Move.toJSON())
        console.log(output.moveState.p2Move.toJSON())
    })
})