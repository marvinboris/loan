import { iwomiCash, pixpayCash } from '../lib';
import { providerDetection } from './provider-detection';

export async function payCustomer(account: string, amount: number) {
  try {
    const type = providerDetection(account);
    if (!type) throw new Error('Invalid account number');

    const tel = account.split(' ').join('');

    // const success = await iwomiCash(type, 'debit')(tel, amount);
    const success = await pixpayCash(type, 'cashin')(tel, amount);

    if (success)
      console.log(
        `An amount of "${amount} XAF" has been sent to the account "${tel}".`
      );

    return success;
  } catch (error) {
    console.error('Error paying customer:', error);
    return undefined;
  }
}
