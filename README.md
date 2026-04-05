# FinanceTrack

A clean, modern personal finance dashboard built with Next.js, React, and TypeScript. Track income, expenses, and gain actionable financial insights in real-time.

## Features

- **Dashboard Overview**: Real-time summary of total balance, income, and expenses
- **Transaction Management**: Add, edit, and delete transactions with full history
- **Smart Filtering**: Search and filter by category, transaction type, and date
- **Financial Analytics**: 
  - Monthly balance trends with interactive charts
  - Category-based spending breakdown
  - Savings rate calculation
  - Month-over-month change tracking
- **Role-Based UI**: Simulated Admin and Viewer roles with different permissions
- **Persistent Storage**: All data automatically saved to browser local storage
- **Dark/Light Mode**: Theme-aware UI with automatic system preference detection
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile

---

## How This Meets Assignment Requirements

- **Dashboard Overview**:
  - Summary cards (balance, income, expenses)
  - Time-based chart (monthly trends)
  - Category chart (spending breakdown)

- **Transactions Section**:
  - Full transaction table with filtering, search, and sorting

- **Role-Based UI**:
  - Simulated Admin and Viewer roles
  - Admin can add, edit, and delete transactions
  - Viewer has read-only access

- **Insights Section**:
  - Savings rate calculation
  - Highest spending category
  - Monthly comparisons and trends

- **State Management**:
  - Managed using Zustand with persistence middleware

- **UI/UX**:
  - Clean and intuitive layout
  - Fully responsive design
  - Dark/light mode support
  - Handles empty states gracefully

---

## Tech Stack

- **Framework**: Next.js 16.2
- **Language**: TypeScript 5.7
- **State Management**: Zustand with persist middleware
- **Styling**: Tailwind CSS 4.2
- **UI Components**: shadcn/ui + Radix UI
- **Charts**: Recharts 2.15
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd finance-dashboard

# Install dependencies
npm install

# Start development server
npm run dev