// --- CUSTOMER REQUEST TYPES ---
export interface CustomerRequest {
  id: string
  customerName: string
  company: string
  title: string
  description: string
  estimatedBudget: number
  status: 'Pending' | 'Converted'
  date: string
  projectId?: string
}

// --- PROJECT TYPES ---
export interface ProjectNeed {
  id: number
  name: string
  estimatedPrice: number
  status: string
}

export interface Project {
  id: string
  requestId?: string
  customerName: string
  company: string
  name: string
  budget: number
  spentBudget: number
  status: string
  startDate: string
  tasks: string[]
  needs: ProjectNeed[]
}

// --- PURCHASE REQUEST TYPES ---
export interface PurchaseRequest {
  id: string
  projectId: string
  projectName: string
  item: string
  estimatedPrice: number
  supplier: string
  actualPrice: string
  status: 'Pending' | 'Approved' | 'Rejected'
  date: string
}

// --- FINANCE TYPES ---
export interface FinanceRecord {
  id: string
  projectId: string
  projectName: string
  customerName: string
  item: string
  supplier: string
  amount: number
  date: string
  purchaseRequestId: string
}

// --- ACTIVITY LOG TYPES ---
export interface ActivityLog {
  id: string
  type: 'CONVERT_PROJECT' | 'CREATE_PURCHASE' | 'APPROVE_PURCHASE' | 'REJECT_PURCHASE'
  title: string
  description: string
  date: string
}