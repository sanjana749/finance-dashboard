"use client"

import { DashboardHeader } from "@/components/finance/dashboard-header"
import { SummaryCards } from "@/components/finance/summary-cards"
import { BalanceChart } from "@/components/finance/balance-chart"
import { SpendingChart } from "@/components/finance/spending-chart"
import { TransactionsTable } from "@/components/finance/transactions-table"
import { InsightsPanel } from "@/components/finance/insights-panel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutDashboard, Receipt, Lightbulb } from "lucide-react"
import { useHydration } from "@/lib/finance-store"
import { Spinner } from "@/components/ui/spinner"

export default function FinanceDashboard() {
  const hydrated = useHydration()

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="size-8" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-6">
        {/* Mobile Tabs */}
        <div className="block lg:hidden">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="transactions" className="gap-2">
                <Receipt className="h-4 w-4" />
                <span className="hidden sm:inline">Transactions</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="gap-2">
                <Lightbulb className="h-4 w-4" />
                <span className="hidden sm:inline">Insights</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <SummaryCards />
              <BalanceChart />
              <SpendingChart />
            </TabsContent>
            
            <TabsContent value="transactions">
              <TransactionsTable />
            </TabsContent>
            
            <TabsContent value="insights">
              <InsightsPanel />
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="space-y-6">
            {/* Summary Cards */}
            <SummaryCards />

            {/* Charts Row */}
            <div className="grid gap-6 lg:grid-cols-2">
              <BalanceChart />
              <SpendingChart />
            </div>

            {/* Transactions and Insights Row */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <TransactionsTable />
              </div>
              <div>
                <InsightsPanel />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            FinanceTrack Dashboard - Built for Zorvyn Assignment
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            By Sanjana B
          </p>
        </div>
      </footer>
    </div>
  )
}
