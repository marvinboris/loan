import { useApi, useTitle } from '@creditwave/hooks';
import { Section, Loan, LoanType } from '@creditwave/ui';
import { ScrollView, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { repaymentService } from '../../../services';

export default function Page() {
  const { t } = useTranslation();

  useTitle(t('applications.title'));

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
