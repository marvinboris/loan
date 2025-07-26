import { TextLine, TextLineProps } from '../text-line';

export type AmountLineProps = Omit<TextLineProps, 'value'> & {
  amount: number;
};

export function AmountLine({ label, amount, bold }: AmountLineProps) {
  return (
    <TextLine label={label} value={amount.toLocaleString('en')} bold={bold} />
  );
}
