
export interface CustomerRequest {
  id: string
  customerName: string
  company: string
  title: string
  description: string
  estimatedBudget: number
  status: 'Pending' | 'Rejected' | 'Converted';
  date: string
  projectId?: string
}


export interface ProjectNeed {
  id: number
  name: string
  estimatedPrice: number
  status: 'Beklemede' | 'Satın Alma Talebi Oluşturuldu'
}

export interface Project {
  id: string
  name: string
  customerName: string
  company: string
  budget: number
  spentBudget: number
  startDate: string
  status: string
  tasks: string[]
  needs: ProjectNeed[]
}

export interface ProjectsState {
  items: Project[]
}
export interface FinanceState {
  items: FinanceRecord[]
}


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


export interface FinanceRecord {
  id: string
  projectName: string
  customerName?: string
  item: string
  supplier?: string
  purchaseRequestId?: string
  date: string
  amount: number
  type?: 'INCOME' | 'EXPENSE'
}

export interface ActivityLog {
  id: string
  type: 'CONVERT_PROJECT' | 'CREATE_PURCHASE' | 'APPROVE_PURCHASE' | 'REJECT_PURCHASE'
  title: string
  description: string
  date: string
}