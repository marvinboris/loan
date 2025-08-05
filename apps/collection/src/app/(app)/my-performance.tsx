import { useApi, useTitle } from '@creditwave/hooks';
import { CollectionLoan, CollectionLoanProps, Section } from '@creditwave/ui';
import { router } from 'expo-router';

export default function Page() {
  useTitle('My performance');

  const { data, loading } = useApi<{
    data: CollectionLoanProps[];
    success: boolean;
  }>('/collection/my-performance');

  return (
    <Section loading={loading}>
      {(data?.data || []).map((item, index) => (
        <CollectionLoan
          key={index}
          {...item}
          onPress={(item) => router.push('/' + item.loanNumber)}
        />
      ))}
    </Section>
  );
}
