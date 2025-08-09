import { useApi, useTitle } from '@creditwave/hooks';
import { Section, Loan, LoanType } from '@creditwave/ui';
import { repaymentService } from '../../../services';
import { ScrollView, RefreshControl } from 'react-native';

export default function Page() {
  useTitle('Request history');

  const { data, loading, refetch } = useApi<{
    data: LoanType[];
    success: boolean;
  }>('/customer/applications');

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refetch} />
      }
    >
      <Section loading={loading}>
        {(data?.data || []).map((item, index) => (
          <Loan
            key={index}
            {...item}
            onSubmit={async (data) => {
              const result = await repaymentService.submit(data);
              if (result.success) refetch();
              return result;
            }}
          />
        ))}
      </Section>
    </ScrollView>
  );
}
