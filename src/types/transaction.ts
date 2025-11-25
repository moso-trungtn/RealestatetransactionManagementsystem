export type TransactionStatus = 'Pre-contract' | 'Under Contract' | 'Closed';
export type TransactionType = 'Purchase' | 'Listing' | 'Lease Listing';

export interface Transaction {
  id: string;
  clientName: string;
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  price: number;
  type: TransactionType;
  status: TransactionStatus;
  closingDate?: string;
  listDate?: string;
  contractDate?: string;
  image: string;
  mlsNumber?: string;
  modifiedDate?: string;
  lostDeals?: number;
}
