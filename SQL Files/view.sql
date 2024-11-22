select * from category;

select * from fixed_cost;

select account.name, transaction.*, fixed_cost.*  from 
	transaction, fixed_cost, account, fixed_cost_transaction 
    where 
		account.id = 1 and 
        transaction.account_id = account.id and 
        fixed_cost_transaction.transaction_id = transaction.id and
        fixed_cost_transaction.fixed_cost_id = fixed_cost.id;
