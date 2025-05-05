/**
 * Represents the payload for a withdrawal relayer request.
 */
export interface WithdrawalRelayerPayload {
  /** Relayer address (0xAdDrEsS) */
  processooor: string;
  /** Transaction data (hex encoded) */
  data: string;
}

/**
 * Represents the proof payload for a relayer request.
 */
export interface ProofRelayerPayload {
  pi_a: string[];
  pi_b: string[][];
  pi_c: string[];
}

/**
 * Represents the request body for a relayer operation.
 */
export interface RelayRequestBody {
  /** Withdrawal details */
  withdrawal: WithdrawalRelayerPayload;
  /** Public signals as string array */
  publicSignals: string[];
  /** Proof details */
  proof: ProofRelayerPayload;
  /** Pool scope */
  scope: string;
  /** Chain ID to process the request on */
  chainId: string | number;
}

// GET /fees
export type FeesResponse = {
  feeBPS: string;
  feeReceiverAddress: string;
};

/**
 * Represents the response from a relayer operation.
 */
export interface RelayerResponse {
  /** Indicates if the request was successful */
  success: boolean;
  /** Timestamp of the response */
  timestamp: number;
  /** Unique request identifier (UUID) */
  requestId: string;
  /** Optional transaction hash */
  txHash?: string;
  /** Optional error message */
  error?: string;
}
