import WalletOverview from "../components/dashboard/v2/WalletOverview";
import ActivityFeed from "../components/dashboard/v2/ActivityFeed";
import UpcomingPayouts from "../components/dashboard/v2/UpcomingPayouts";
import QuickActions from "../components/dashboard/v2/QuickActions";

import PageLayout from "../components/layout/PageLayout";

const Wallet = () => {
  return (
    <PageLayout>

      <WalletOverview />

      <QuickActions />

      <UpcomingPayouts />

      <ActivityFeed />

    </PageLayout>
  );
};

export default Wallet;