import PageLayout from "../components/layout/PageLayout";

import InvestmentSummary from "../components/dashboard/v2/InvestmentSummary";
import PortfolioOverview from "../components/dashboard/v2/PortfolioOverview";
import InvestmentPlans from "../components/dashboard/v2/InvestmentPlans";
import AssetAllocation from "../components/dashboard/v2/AssetAllocation";
import InvestmentPerformance from "../components/dashboard/v2/InvestmentPerformance";
import InvestmentHistory from "../components/dashboard/v2/InvestmentHistory";

export default function Investments() {
  return (
    <PageLayout>
      <InvestmentSummary />

      <PortfolioOverview />

      <InvestmentPlans />

      <AssetAllocation />

      <InvestmentPerformance />

      <InvestmentHistory />
    </PageLayout>
  );
}