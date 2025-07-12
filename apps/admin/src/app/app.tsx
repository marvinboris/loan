import { useAuthWatcher, useRequest } from '@creditwave/hooks';
import { BreadcrumbProvider, Toast, toastShow } from '@creditwave/ui';
import { initializeHttpClient } from '@creditwave/utils';
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
  AppLayout,
  AuthLayout,
  CollectionCase,
  CollectionCaseAllocation,
  CollectionDailyReport,
  CollectionMonthlyReport,
  CollectionRecords,
  CollectionTeamDailyReport,
  CollectionTeamMonthlyReport,
  FinancialLoanInquiry,
  FinancialReconciliation,
  FinancialRepaymentInquiries,
  Forgot,
  Login,
  OperationAccount,
  Reset,
  TelemarketingDailyReport,
  TelemarketingMonthlyReport,
  TelemarketingNewCustomers,
  TelemarketingOldCustomers,
  TelemarketingRegisteredCustomers,
  TelemarketingTeamDailyReport,
  TelemarketingTeamMonthlyReport,
} from './pages';

export function App() {
  useAuthWatcher();
  const { error } = useRequest();

  React.useEffect(() => {
    // Initialiser l'instance HTTP au démarrage de l'app
    initializeHttpClient(import.meta.env.VITE_API_URL);
  }, []);

  React.useEffect(() => {
    if (error) toastShow({ type: 'error', text: error });
  }, [error]);

  return (
    <BreadcrumbProvider>
      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}

      <Toast />

      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/operation/account" element={<OperationAccount />} />

          <Route
            path="/collection/collection-records"
            element={<CollectionRecords />}
          />
          <Route
            path="/collection/case-allocation"
            element={<CollectionCaseAllocation />}
          />
          <Route
            path="/collection/collection-case"
            element={<CollectionCase />}
          />
          <Route
            path="/collection/performance-management/team-daily"
            element={<CollectionTeamDailyReport />}
          />
          <Route
            path="/collection/performance-management/team-monthly"
            element={<CollectionTeamMonthlyReport />}
          />
          <Route
            path="/collection/performance-management/daily"
            element={<CollectionDailyReport />}
          />
          <Route
            path="/collection/performance-management/monthly"
            element={<CollectionMonthlyReport />}
          />

          <Route
            path="/financial/reconciliation"
            element={<FinancialReconciliation />}
          />
          <Route
            path="/financial/loan-inquiry"
            element={<FinancialLoanInquiry />}
          />
          <Route
            path="/financial/repayment-inquiries"
            element={<FinancialRepaymentInquiries />}
          />

          <Route
            path="/telemarketing/registered-customers"
            element={<TelemarketingRegisteredCustomers />}
          />
          <Route
            path="/telemarketing/old-customers"
            element={<TelemarketingOldCustomers />}
          />
          <Route
            path="/telemarketing/new-customers"
            element={<TelemarketingNewCustomers />}
          />
          <Route
            path="/telemarketing/performance-management/team-daily"
            element={<TelemarketingTeamDailyReport />}
          />
          <Route
            path="/telemarketing/performance-management/team-monthly"
            element={<TelemarketingTeamMonthlyReport />}
          />
          <Route
            path="/telemarketing/performance-management/daily"
            element={<TelemarketingDailyReport />}
          />
          <Route
            path="/telemarketing/performance-management/monthly"
            element={<TelemarketingMonthlyReport />}
          />

          <Route
            path="/"
            element={
              <Navigate to="/telemarketing/performance-management/monthly" />
            }
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/reset" element={<Reset />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      {/* END: routes */}
    </BreadcrumbProvider>
  );
}

export default App;
