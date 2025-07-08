export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export interface MetricScore {
  metric: string
  score: number
  description?: string
}

export interface AuditSection {
  section: string
  details: string | MetricScore[] | unknown
}

export interface AuditResult {
  [key: string]: AuditSection[] | AuditSection
}

export interface ApiKeyModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (apiKey: string) => void
}
