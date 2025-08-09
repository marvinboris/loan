import { useApi, useTitle } from '@creditwave/hooks';
import { CollectionLoan, CollectionLoanProps, Section } from '@creditwave/ui';
import { router } from 'expo-router';
import { RefreshControl, ScrollView } from 'react-native';

export default function Page() {
  useTitle('Finished clients');

  const { data, loading, refetch } = useApi<{
    data: CollectionLoanProps[];
    success: boolean;
  }>('/collection/finished');

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refetch} />
      }
    >
      <Section loading={loading}>
        {(data?.data || []).map((item, index) => (
          <CollectionLoan
            key={index}
            {...item}
            onPress={(item) => router.push('/' + item.loan_number)}
          />
        ))}
      </Section>
    </ScrollView>
  );
}
