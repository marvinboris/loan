import { useApi, useTitle } from '@creditwave/hooks';
import { LoanProps, Section, Loan } from '@creditwave/ui';
import moment from 'moment';

export default function Page() {
  useTitle('Request history');

  const { data, loading } = useApi<{ data: LoanProps[]; success: boolean }>(
    '/customer/applications'
  );

  return (
    <Section loading={loading}>
      {(
        data?.data || [
          {
            amount: 5000,
            interest: 50,
            date: moment().subtract(2, 'd').toDate(),
            active: true,
          },
          {
            amount: 7000,
            interest: 70,
            date: moment().subtract(2, 'w').toDate(),
          },
          {
            amount: 7000,
            interest: 70,
            date: moment().subtract(2, 'w').toDate(),
          },
          {
            amount: 7000,
            interest: 70,
            date: moment().subtract(2, 'w').toDate(),
          },
          {
            amount: 7000,
            interest: 70,
            date: moment().subtract(2, 'w').toDate(),
          },
        ]
      ).map((item, index) => (
        <Loan key={index} {...item} />
      ))}
    </Section>
  );
}
