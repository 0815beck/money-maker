import { Account } from './account';
import { Category } from './category';

export interface Transaction {
  id?: number;
  amount: number;
  timestamp: Date;
  description?: string;
  category: Category;
  account: Account;
}
