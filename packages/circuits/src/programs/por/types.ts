import { Bool, Field, Provable, Struct } from "o1js";
import { NUM_ASSETS } from ".";

export class ProofOfAssetsPublicInput extends Struct({
    addresses: Provable.Array(Field, NUM_ASSETS),
    balances: Provable.Array(Field, NUM_ASSETS)
}) { }

export class ProofOfAssetsPrivateInput extends Struct({
    selectorArray: Provable.Array(Bool, NUM_ASSETS),
}) { }