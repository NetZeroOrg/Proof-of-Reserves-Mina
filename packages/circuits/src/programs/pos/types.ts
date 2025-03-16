import { Group, Proof, Struct } from "o1js";
import { ProofOfAsset } from "../por";

export class ProofOfSolvencyPublicInputs extends Struct({
    liabilitiesCommitment: Group,
    assetsCommitment: Group,
    liabiltiesRangeCheckProof: Proof<void, void>,
    assetProof: ProofOfAsset
}) { }
