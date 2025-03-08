// You can put logic in different files if you want
import { Field, Group, Poseidon, Provable, } from "o1js";
import { ProofOfAssetsPrivateInput, ProofOfAssetsPublicInput } from "./types.js";
export const NUM_ASSETS = Number(process.env.NUM_ASSETS) ?? 100

/**
 * This is the proof that the known addresses are a subset of the addresses array
 * @param addresses Is the set of all addresses and the balance of each address
 * @param selectorArray Is the dynamic array of known addresses
 */
export async function ProofOfAssets(
    publicInput: ProofOfAssetsPublicInput,
    privateInput: ProofOfAssetsPrivateInput
): Promise<{ publicOutput: Group }> {
    let commitment: Group = Group.generator
    // Commitment to the balances = `(1 + total_balance)` * `G` + `address` * `G1` + ...
    for (let i = 0; i < NUM_ASSETS; i++) {
        const balance = Provable.if(privateInput.selectorArray[i]!, publicInput.balances[i]!, Field(0))
        // The bliding factor are scaled by the address in field itself
        const blindingFactor = Provable.if(privateInput.selectorArray[i]!, publicInput.addresses[i]!, Field(0))
        const basePoint = Group.generator.scale(balance)
        const blidingPoint = Poseidon.hashToGroup(commitment.toFields()).scale(blindingFactor)
        commitment = basePoint.add(blidingPoint)
    }
    return {
        publicOutput: commitment,
    }
}


