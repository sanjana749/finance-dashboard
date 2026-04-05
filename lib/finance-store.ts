"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useState, useEffect } from "react"

export type TransactionType = "income" | "expense"
export type UserRole = "viewer" | "admin"

export type Category =
  | "salary"
  | "freelance"
  | "investment"
  | "food"
  | "transport"
  | "utilities"
  | "entertainment"
  | "shopping"
  | "healthcare"
  | "other"

export interface Transaction {
  id: string
  date: string
  amount: number
  category: Category
  type: TransactionType
  description: string
}

interface FinanceState {
  transactions: Transaction[]
  role: UserRole
  searchQuery: string
  filterCategory: Category | "all"
  filterType: TransactionType | "all"
  sortBy: "date" | "amount"
  sortOrder: "asc" | "desc"

  // Actions
  setRole: (role: UserRole) => void
  addTransaction: (transaction: Omit<Transaction, "id">) => void
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  setSearchQuery: (query: string) => void
  setFilterCategory: (category: Category | "all") => void
  setFilterType: (type: TransactionType | "all") => void
  setSortBy: (sortBy: "date" | "amount") => void
  setSortOrder: (order: "asc" | "desc") => void
}

// Mock data
const mockTransactions: Transaction[] = [
  { id: "1", date: "2026-04-01", amount: 5000, category: "salary", type: "income", description: "Monthly Salary" },
  { id: "2", date: "2026-04-02", amount: 120, category: "food", type: "expense", description: "Grocery Shopping" },
  { id: "3", date: "2026-04-03", amount: 50, category: "transport", type: "expense", description: "Uber Rides" },
  { id: "4", date: "2026-04-04", amount: 800, category: "freelance", type: "income", description: "Design Project" },
  { id: "5", date: "2026-04-05", amount: 200, category: "utilities", type: "expense", description: "Electricity Bill" },
  { id: "6", date: "2026-03-28", amount: 5000, category: "salary", type: "income", description: "Monthly Salary" },
  { id: "7", date: "2026-03-25", amount: 150, category: "entertainment", type: "expense", description: "Concert Tickets" },
  { id: "8", date: "2026-03-20", amount: 350, category: "shopping", type: "expense", description: "New Clothes" },
  { id: "9", date: "2026-03-15", amount: 1200, category: "freelance", type: "income", description: "Web Development" },
  { id: "10", date: "2026-03-10", amount: 85, category: "healthcare", type: "expense", description: "Doctor Visit" },
  { id: "11", date: "2026-03-05", amount: 250, category: "investment", type: "income", description: "Dividend Income" },
  { id: "12", date: "2026-03-01", amount: 5000, category: "salary", type: "income", description: "Monthly Salary" },
  { id: "13", date: "2026-02-28", amount: 180, category: "food", type: "expense", description: "Restaurant" },
  { id: "14", date: "2026-02-25", amount: 75, category: "transport", type: "expense", description: "Gas" },
  { id: "15", date: "2026-02-20", amount: 500, category: "freelance", type: "income", description: "Logo Design" },
  { id: "16", date: "2026-02-15", amount: 300, category: "utilities", type: "expense", description: "Internet + Phone" },
  { id: "17", date: "2026-02-10", amount: 90, category: "entertainment", type: "expense", description: "Streaming Services" },
  { id: "18", date: "2026-02-05", amount: 420, category: "shopping", type: "expense", description: "Electronics" },
  { id: "19", date: "2026-02-01", amount: 5000, category: "salary", type: "income", description: "Monthly Salary" },
  { id: "20", date: "2026-01-28", amount: 600, category: "investment", type: "income", description: "Stock Sale" },
]

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: mockTransactions,
      role: "admin",
      searchQuery: "",
      filterCategory: "all",
      filterType: "all",
      sortBy: "date",
      sortOrder: "desc",

      setRole: (role) => set({ role }),

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            { ...transaction, id: crypto.randomUUID() },
            ...state.transactions,
          ],
        })),

      updateTransaction: (id, updatedTransaction) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updatedTransaction } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setFilterCategory: (filterCategory) => set({ filterCategory }),
      setFilterType: (filterType) => set({ filterType }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
    }),
    {
      name: "finance-storage",
    }
  )
)

// Selector for filtered and sorted transactions
export function getFilteredTransactions(state: FinanceState): Transaction[] {
  let filtered = [...state.transactions]

  // Apply search filter
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase()
    filtered = filtered.filter(
      (t) =>
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
    )
  }

  // Apply category filter
  if (state.filterCategory !== "all") {
    filtered = filtered.filter((t) => t.category === state.filterCategory)
  }

  // Apply type filter
  if (state.filterType !== "all") {
    filtered = filtered.filter((t) => t.type === state.filterType)
  }

  // Apply sorting
  filtered.sort((a, b) => {
    if (state.sortBy === "date") {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return state.sortOrder === "asc" ? dateA - dateB : dateB - dateA
    } else {
      return state.sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
    }
  })

  return filtered
}

// Compute financial summary
export function getFinancialSummary(transactions: Transaction[]) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  return { totalIncome, totalExpenses, balance }
}

// Get spending by category
export function getSpendingByCategory(transactions: Transaction[]) {
  const expenses = transactions.filter((t) => t.type === "expense")
  const categoryMap = new Map<Category, number>()

  expenses.forEach((t) => {
    const current = categoryMap.get(t.category) || 0
    categoryMap.set(t.category, current + t.amount)
  })

  return Array.from(categoryMap.entries())
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
}

// Get monthly balance trend
export function getMonthlyTrend(transactions: Transaction[]) {
  const monthlyData = new Map<string, { income: number; expenses: number }>()

  transactions.forEach((t) => {
    const month = t.date.substring(0, 7) // "YYYY-MM"
    const current = monthlyData.get(month) || { income: 0, expenses: 0 }

    if (t.type === "income") {
      current.income += t.amount
    } else {
      current.expenses += t.amount
    }

    monthlyData.set(month, current)
  })

  return Array.from(monthlyData.entries())
    .map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
      balance: data.income - data.expenses,
    }))
    .sort((a, b) => a.month.localeCompare(b.month))
}

// Get insights
export function getInsights(transactions: Transaction[]) {
  const spendingByCategory = getSpendingByCategory(transactions)
  const highestSpendingCategory = spendingByCategory[0] || null

  const monthlyTrend = getMonthlyTrend(transactions)
  const currentMonth = monthlyTrend[monthlyTrend.length - 1]
  const previousMonth = monthlyTrend[monthlyTrend.length - 2]

  let monthlyChange = 0
  if (currentMonth && previousMonth) {
    monthlyChange =
      ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses) * 100
  }

  const { totalIncome, totalExpenses } = getFinancialSummary(transactions)
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0

  return {
    highestSpendingCategory,
    monthlyChange,
    savingsRate,
    totalTransactions: transactions.length,
  }
}

export const categoryLabels: Record<Category, string> = {
  salary: "Salary",
  freelance: "Freelance",
  investment: "Investment",
  food: "Food & Dining",
  transport: "Transport",
  utilities: "Utilities",
  entertainment: "Entertainment",
  shopping: "Shopping",
  healthcare: "Healthcare",
  other: "Other",
}

export const categoryColors: Record<Category, string> = {
  salary: "hsl(var(--chart-1))",
  freelance: "hsl(var(--chart-2))",
  investment: "hsl(var(--chart-3))",
  food: "hsl(var(--chart-4))",
  transport: "hsl(var(--chart-5))",
  utilities: "hsl(var(--chart-1))",
  entertainment: "hsl(var(--chart-2))",
  shopping: "hsl(var(--chart-3))",
  healthcare: "hsl(var(--chart-4))",
  other: "hsl(var(--chart-5))",
}

// Hook to check if the store has been hydrated from localStorage
export function useHydration() {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return hydrated
}
