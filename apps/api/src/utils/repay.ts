export async function repay(account: string, amount: number) {
  try {
    console.log(
      `An amount of "${amount} XAF" has been sent from the account "${account}".`
    );

    return true;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return false;
  }
}
