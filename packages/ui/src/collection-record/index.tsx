import { CollectionRecord as CollectionRecordProps } from '@creditwave/types';
import { useConfig } from '@creditwave/hooks';
import { Card } from '../card';
import { TextLine } from '../text-line';

export { CollectionRecordProps };

export function CollectionRecord({ ...item }: CollectionRecordProps) {
  const { theme } = useConfig();

  return (
    <Card
      style={({ pressed }) => [
        {
          gap: 4,
          paddingVertical: 12,
          paddingHorizontal: 12,
          marginHorizontal: -12,
        },
        pressed && { backgroundColor: theme.primary + '22' },
      ]}
    >
      <TextLine
        label="Connection"
        value={
          {
            connected: 'Connected',
            no_answer: 'No answer',
            wrong_number: 'Wrong number',
          }[item.connection]
        }
      />

      <TextLine
        label="Willingness to pay"
        value={
          item.willingness_to_pay
            ? {
                high: 'Yes',
                refusal: 'No',
              }[item.willingness_to_pay]
            : 'No'
        }
      />

      <TextLine label="Contact target" value={item.target_contact} />

      <TextLine label="Remark" value={item.mark} />
    </Card>
  );
}
