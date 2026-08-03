import PageLayout from "../components/layout/PageLayout";

import TransactionStats from "../components/dashboard/v2/TransactionStats";
import TransactionFilters from "../components/dashboard/v2/TransactionFilters";
import RecentTransactions from "../components/dashboard/v2/RecentTransactions";

export default function Transactions() {
  return (
    <PageLayout>
      <TransactionStats />
      <TransactionFilters />
      <RecentTransactions />
    </PageLayout>
  );
}