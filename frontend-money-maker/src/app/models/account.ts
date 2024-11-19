import {FixedCost} from './fixed-cost';
import {Transaction} from './transaction';

export interface Account {
  id?: number;
  name: string;
  fixedCosts: FixedCost[];
  transactions: Transaction[];
}
