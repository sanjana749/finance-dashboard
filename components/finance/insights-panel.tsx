"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useFinanceStore, getInsights, categoryLabels } from "@/lib/finance-store"
import { formatCurrency } from "@/lib/utils"
import { TrendingUp, TrendingDown, PiggyBank, Activity, Lightbulb } from "lucide-react"

export function InsightsPanel() {
  const transactions = useFinanceStore((state) => state.transactions)
  const insights = getInsights(transactions)

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <CardTitle className="text-foreground">Insights</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Key observations from your financial data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Highest Spending Category */}
        {insights.highestSpendingCategory && (
          <div className="flex items-start gap-4 rounded-lg bg-secondary/50 p-4">
            <div className="rounded-lg bg-chart-4/10 p-2">
              <Activity className="h-5 w-5 text-chart-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Highest Spending Category
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {categoryLabels[insights.highestSpendingCategory.category]}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {formatCurrency(insights.highestSpendingCategory.amount)} spent
              </p>
            </div>
          </div>
        )}

        {/* Monthly Change */}
        <div className="flex items-start gap-4 rounded-lg bg-secondary/50 p-4">
          <div
            className={`rounded-lg p-2 ${
              insights.monthlyChange >= 0
                ? "bg-destructive/10"
                : "bg-success/10"
            }`}
          >
            {insights.monthlyChange >= 0 ? (
              <TrendingUp className="h-5 w-5 text-destructive" />
            ) : (
              <TrendingDown className="h-5 w-5 text-success" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              Monthly Expense Change
            </p>
            <p
              className={`mt-1 text-2xl font-bold ${
                insights.monthlyChange >= 0 ? "text-destructive" : "text-success"
              }`}
            >
              {insights.monthlyChange >= 0 ? "+" : ""}
              {insights.monthlyChange.toFixed(1)}%
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {insights.monthlyChange >= 0
                ? "You spent more this month"
                : "Great job! You spent less this month"}
            </p>
          </div>
        </div>

        {/* Savings Rate */}
        <div className="flex items-start gap-4 rounded-lg bg-secondary/50 p-4">
          <div className="rounded-lg bg-primary/10 p-2">
            <PiggyBank className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Savings Rate</p>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {insights.savingsRate.toFixed(1)}%
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {insights.savingsRate >= 20
                ? "Excellent! You're saving well"
                : insights.savingsRate >= 10
                ? "Good savings rate, keep it up!"
                : "Consider ways to increase savings"}
            </p>
          </div>
        </div>

        {/* Total Transactions */}
        <div className="rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Total Transactions
            </p>
            <p className="text-lg font-bold text-foreground">
              {insights.totalTransactions}
            </p>
          </div>
        </div>

        {/* Tips */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm font-medium text-primary">Quick Tip</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {insights.highestSpendingCategory
              ? `Your ${categoryLabels[
                  insights.highestSpendingCategory.category
                ].toLowerCase()} expenses are your biggest outflow. Consider setting a budget for this category.`
              : "Start tracking your expenses to get personalized insights!"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
