/* eslint-disable @typescript-eslint/no-unused-vars */
import { Commitment, MerkleProof, RagequitProof, Withdrawal, WithdrawalProof } from '~/types';

export function generateMerkleProof(_leaves: bigint[], _leaf: bigint): MerkleProof {
  // console.log('Leaves:', _leaves);
  // console.log('Leaf:', _leaf);

  return {
    root: BigInt('0x1234'),
    siblings: [BigInt(1), BigInt(2), BigInt(3)],
    indices: [0, 1, 0],
  };
}

export async function proveWithdrawal(
  _commitment: Commitment,
  _withdrawAmount: bigint,
  _stateMerkleProof: MerkleProof,
  _aspMerkleProof: MerkleProof,
  _stateRoot: bigint,
  _aspRoot: bigint,
  _withdrawal: Withdrawal,
): Promise<WithdrawalProof> {
  // console.log(
  //   'Commitment: ' + _commitment,
  //   'Withdraw amount: ' + _withdrawAmount,
  //   'State merkle proof: ' + _stateMerkleProof,
  //   'ASP merkle proof: ' + _aspMerkleProof,
  //   'State root: ' + _stateRoot,
  //   'ASP root: ' + _aspRoot,
  //   'Withdrawal: ' + _withdrawal,
  // );

  return {
    proof: {
      pA: ['0x1234', '0x5678'],
      pB: [
        ['0x91011', '0x1213'],
        ['0x1415', '0x1617'],
      ],
      pC: ['0x1819', '0x2021'],
    },
    publicSignals: ['1', '2', '3', '4', '5', '6', '7', '8'],
  };
}

export async function proveCommitment(
  _value: Commitment['preimage']['value'],
  _label: Commitment['preimage']['label'],
  _nullifier: Commitment['preimage']['nullifier'],
  _secret: Commitment['preimage']['secret'],
): Promise<RagequitProof> {
  return {
    pA: [BigInt(1), BigInt(2)],
    pB: [
      [BigInt(3), BigInt(4)],
      [BigInt(5), BigInt(6)],
    ],
    pC: [BigInt(7), BigInt(8)],
    pubSignals: [BigInt(1), BigInt(2), BigInt(3), BigInt(4), BigInt(5)],
  };
}
