import { Account } from "./account";
import { Category } from "./category";
import { Transaction } from "./transaction";

export interface FixedCost {
    id?: number|null;
    amount: number;
    start: Date;
    description?: string;
    category: Category;
    account: Account;
    generatedTransactions: Transaction[];
}
