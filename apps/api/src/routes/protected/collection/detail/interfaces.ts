import { ConnectionStatus, WillingnessToPay } from '../../../../types';

export interface MarkInput {
  connection: ConnectionStatus;
  willingnessToPay: WillingnessToPay;
  location: string;
  contactTarget: string;
  collectionResult: string;
  remark: string;
}
