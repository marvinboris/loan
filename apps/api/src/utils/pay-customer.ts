import { iwomiPay } from '../lib';
import { providerDetection } from './provider-detection';

export async function payCustomer(account: string, amount: number) {
  try {
    const type = providerDetection(account);
    if (!type) throw new Error('Invalid account number');

    const tel = account.split(' ').join('');

    const result = await iwomiPay.payment({
      amount: amount.toString(),
      motif: 'Loan approved',
      op_type: 'debit',
      type,
      tel,
    });
    let status = result.status;
    while (status === '1000') {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      const res = await iwomiPay.check(result.internal_id);
      status = res.status;
    }
    const success = status === '01';
    if (success)
      console.log(
        `An amount of "${amount} XAF" has been sent to the account "${tel}".`
      );
    else throw new Error(result.message);

    return success;
  } catch (error) {
    console.error('Error paying customer:', error);
    return false;
  }
}
