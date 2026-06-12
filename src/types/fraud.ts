export interface Fraud {
  id: number;
  impostorDetails: string;
  contactInfo: string;
  comments: string;
  createdAt: string;
}

export interface FraudFormData {
  impostorDetails: string;
  contactInfo: string;
  comments: string;
}
