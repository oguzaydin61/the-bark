import type { 
  CustomerRequest, 
  Project,
 
  PurchaseRequest, 
  FinanceRecord, 
  ActivityLog 
} from '../types/index';




export const CUSTOMER_REQUESTS: CustomerRequest[] = [
  { id: 'REQ-101', customerName: 'Ahmet Yılmaz', company: 'Yılmaz A.Ş.', title: 'Alpha CRM Yükseltmesi', description: 'Mevcut CRM altyapısının buluta taşınması.', estimatedBudget: 50000, status: 'Pending', date: '2026-07-10', projectId: 'PRJ-001' },
  { id: 'REQ-102', customerName: 'Elena Popescu', company: 'Popescu Logistics', title: 'Beta Ofis Genişletme & API', description: 'Lojistik takip API entegrasyonu.', estimatedBudget: 30000, status: 'Converted', date: '2026-07-12', projectId: 'PRJ-002' },
  { id: 'REQ-103', customerName: 'Can Demir', company: 'Demir Teknoloji', title: 'Gamma Mobil Uygulama', description: 'Cross-platform mobil uygulama geliştirme.', estimatedBudget: 20000, status: 'Pending', date: '2026-07-15', projectId: 'PRJ-003' },
  { id: 'REQ-104', customerName: 'Mehmet Kaya', company: 'Kaya Gıda', title: 'SEO ve Pazarlama Paketi', description: 'E-ticaret sitesi SEO optimizasyonu.', estimatedBudget: 15000, status: 'Pending', date: '2026-07-18' },
  { id: 'REQ-105', customerName: 'Sofia Rossi', company: 'Rossi Design', title: 'Güvenlik Denetimi ve Penetrasyon', description: 'Sistem güvenlik açıkları tespiti.', estimatedBudget: 10000, status: 'Pending', date: '2026-07-20' }
]

export const PROJECTS: Project[] = [
  {
    id: 'PRJ-001',
    requestId: 'REQ-101',
    customerName: 'Ahmet Yılmaz',
    company: 'Yılmaz A.Ş.',
    name: 'Alpha CRM Yükseltmesi',
    budget: 50000,
    spentBudget: 5000,
    status: 'Aktif',
    startDate: '2026-07-11',
    tasks: [
      'Bulut sunucu mimarisinin hazırlanması',
      'Veritabanı migration işlemlerinin tamamlanması',
      'UI/UX arayüzlerinin entegre edilmesi'
    ],
    needs: [
      { id: 101, name: 'Cloud Server Sunucu Paketi', estimatedPrice: 4500, status: 'Satın Alma Talebi Oluşturuldu' },
      { id: 102, name: 'UI Kit Lisansı', estimatedPrice: 500, status: 'Satın Alma Talebi Oluşturuldu' }
    ]
  },
  {
    id: 'PRJ-002',
    requestId: 'REQ-102',
    customerName: 'Elena Popescu',
    company: 'Popescu Logistics',
    name: 'Beta Ofis Genişletme & API',
    budget: 30000,
    spentBudget: 2100,
    status: 'Aktif',
    startDate: '2026-07-13',
    tasks: [
      'REST API uç noktalarının (endpoints) yazılması',
      'Güvenlik sertifikalarının tanımlanması'
    ],
    needs: [
      { id: 103, name: 'SSL Sertifikası', estimatedPrice: 2100, status: 'Satın Alma Talebi Oluşturuldu' },
      { id: 104, name: 'Ergonomik Ofis Koltukları', estimatedPrice: 2500, status: 'Beklemede' }
    ]
  },
  {
    id: 'PRJ-003',
    requestId: 'REQ-103',
    customerName: 'Can Demir',
    company: 'Demir Teknoloji',
    name: 'Gamma Mobil Uygulama',
    budget: 20000,
    spentBudget: 0,
    status: 'Aktif',
    startDate: '2026-07-16',
    tasks: [
      'React Native proje kurulumu',
      'Figma tasarımlarının incelenmesi'
    ],
    needs: []
  }
]

export const PURCHASES_DATA: PurchaseRequest[] = [
  { id: '#REQ-2049', projectId: 'PRJ-001', projectName: 'Alpha CRM Yükseltmesi', item: 'Bulut Sunucu Yükseltmesi', estimatedPrice: 4500, supplier: 'AWS Cloud', actualPrice: '4500', status: 'Approved', date: '2026-07-14' },
  { id: '#REQ-2045', projectId: 'PRJ-001', projectName: 'Alpha CRM Yükseltmesi', item: 'UI Kit Lisansı', estimatedPrice: 500, supplier: 'Tailwind UI', actualPrice: '500', status: 'Approved', date: '2026-07-15' },
  { id: '#REQ-2030', projectId: 'PRJ-002', projectName: 'Beta Ofis Genişletme & API', item: 'SSL Sertifikası', estimatedPrice: 2100, supplier: 'DigiCert', actualPrice: '2100', status: 'Approved', date: '2026-07-16' },
  { id: '#REQ-2051', projectId: 'PRJ-002', projectName: 'Beta Ofis Genişletme & API', item: 'Ergonomik Ofis Koltukları', estimatedPrice: 2500, supplier: 'Tedarikçi A.Ş.', actualPrice: '2500', status: 'Pending', date: '2026-07-20' },
  { id: '#REQ-2053', projectId: 'PRJ-003', projectName: 'Gamma Mobil Uygulama', item: 'Dijital Reklam Bütçesi', estimatedPrice: 12000, supplier: 'Google Ads', actualPrice: '12000', status: 'Rejected', date: '2026-07-19' }
]

export const FINANCE_DATA: FinanceRecord[] = [
  { id: 'FIN-1001', projectId: 'PRJ-001', projectName: 'Alpha CRM Yükseltmesi', customerName: 'Ahmet Yılmaz', item: 'Bulut Sunucu Yükseltmesi', supplier: 'AWS Cloud', amount: 4500, date: '2026-07-14', purchaseRequestId: '#REQ-2049' },
  { id: 'FIN-1002', projectId: 'PRJ-001', projectName: 'Alpha CRM Yükseltmesi', customerName: 'Ahmet Yılmaz', item: 'UI Kit Lisansı', supplier: 'Tailwind UI', amount: 500, date: '2026-07-15', purchaseRequestId: '#REQ-2045' },
  { id: 'FIN-1003', projectId: 'PRJ-002', projectName: 'Beta Ofis Genişletme & API', customerName: 'Elena Popescu', item: 'SSL Sertifikası', supplier: 'DigiCert', amount: 2100, date: '2026-07-16', purchaseRequestId: '#REQ-2030' }
]

export const ACTIVITY_LOGS: ActivityLog[] = [
  { id: 'LOG-001', type: 'CONVERT_PROJECT', title: 'Talep Projeye Dönüştürüldü', description: 'Ahmet Yılmaz talebi Alpha CRM projesine dönüştürüldü.', date: '2026-07-11 10:30' },
  { id: 'LOG-002', type: 'APPROVE_PURCHASE', title: 'Satın Alma Onaylandı', description: '#REQ-2049 ($4,500 - AWS Cloud) onaylandı ve Finans kaydı oluşturuldu.', date: '2026-07-14 14:20' },
  { id: 'LOG-003', type: 'REJECT_PURCHASE', title: 'Satın Alma Reddedildi', description: '#REQ-2053 ($12,000 - Google Ads) talebi reddedildi.', date: '2026-07-19 16:45' }
]