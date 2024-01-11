import { Player, StartGameCircuit } from './recursive';
import { Field } from 'o1js';

describe('Start Game', () => {
    beforeAll(async () => {
        const {verificationKey} = await StartGameCircuit.compile();
    })

    it('create start game proof', async () => {
        let playerStats = new Player({
            health: Field(10),
            stamina: Field(0),
        })
        console.log(playerStats)
        
        const proof0 = await StartGameCircuit.generateProofOfGameStart(playerStats)

        let output = proof0.publicOutput
        console.log(output)
    })
})