"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFinanceStore, getFinancialSummary } from "@/lib/finance-store"
import { formatCurrency } from "@/lib/utils"
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function SummaryCards() {
  const transactions = useFinanceStore((state) => state.transactions)
  const { totalIncome, totalExpenses, balance } = getFinancialSummary(transactions)

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-border/50 bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Balance
          </CardTitle>
          <div className="rounded-lg bg-primary/10 p-2">
            <Wallet className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {formatCurrency(balance)}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Updated just now
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Income
          </CardTitle>
          <div className="rounded-lg bg-success/10 p-2">
            <TrendingUp className="h-4 w-4 text-success" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">
              {formatCurrency(totalIncome)}
            </span>
            <span className="flex items-center text-xs font-medium text-success">
              <ArrowUpRight className="h-3 w-3" />
              12%
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            vs. last month
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Expenses
          </CardTitle>
          <div className="rounded-lg bg-destructive/10 p-2">
            <TrendingDown className="h-4 w-4 text-destructive" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">
              {formatCurrency(totalExpenses)}
            </span>
            <span className="flex items-center text-xs font-medium text-destructive">
              <ArrowDownRight className="h-3 w-3" />
              5%
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            vs. last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
