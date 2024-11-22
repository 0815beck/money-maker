insert into account (name) values 
	('Ronja'), ('Corinna'), ('Nico');
    
insert into category (name) values 
	('groceries'), ('rent'), ('entertainment'), ('clothes');

-- Fixed Cost Table:

-- Fixed cost entries for Ronja (account_id = 1)
insert into fixed_cost (amount, description, start, account_id, category_id) values
    (50.00, 'Weekly Groceries', '2023-01-05', 1, 1),
    (750.00, 'Monthly Rent', '2023-01-01', 1, 2),
    (15.99, 'Netflix Subscription', '2023-01-10', 1, 3),
    (100.00, 'Winter Clothes', '2023-01-15', 1, 4),
    (45.00, 'Groceries for Dinner Party', '2023-02-05', 1, 1),
    (750.00, 'February Rent', '2023-02-01', 1, 2),
    (12.99, 'Spotify Premium', '2023-02-10', 1, 3),
    (80.00, 'New Shoes', '2023-02-20', 1, 4);

-- Fixed cost entries for Corinna (account_id = 2)
insert into fixed_cost (amount, description, start, account_id, category_id) values
    (65.00, 'Groceries - Weekend', '2023-01-06', 2, 1),
    (800.00, 'Monthly Rent Payment', '2023-01-01', 2, 2),
    (14.99, 'Disney+ Subscription', '2023-01-12', 2, 3),
    (50.00, 'Winter Jacket', '2023-01-18', 2, 4),
    (55.00, 'Grocery Shopping', '2023-02-07', 2, 1),
    (800.00, 'February Rent Payment', '2023-02-01', 2, 2),
    (11.99, 'Apple Music', '2023-02-13', 2, 3),
    (90.00, 'New Dress', '2023-02-22', 2, 4);

-- Fixed cost entries for Nico (account_id = 3)
insert into fixed_cost (amount, description, start, account_id, category_id) values
    (40.00, 'Groceries', '2023-01-08', 3, 1),
    (600.00, 'Monthly Rent', '2023-01-01', 3, 2),
    (9.99, 'Hulu Subscription', '2023-01-15', 3, 3),
    (120.00, 'Winter Coat', '2023-01-20', 3, 4),
    (38.00, 'Grocery Essentials', '2023-02-09', 3, 1),
    (600.00, 'February Rent', '2023-02-01', 3, 2),
    (13.99, 'YouTube Premium', '2023-02-14', 3, 3),
    (60.00, 'New Pants', '2023-02-25', 3, 4);


-- Transactions and fixed_cost_transactions for Ronja (account_id = 1)
insert into transaction (amount, description, timestamp, account_id, category_id) values
    -- Transactions linked to fixed_cost (10 entries)
    (50.00, 'Weekly Groceries', '2023-01-05', 1, 1),
    (750.00, 'Monthly Rent', '2023-01-01', 1, 2),    
    (15.99, 'Netflix Subscription', '2023-01-10', 1, 3), 
    (100.00, 'Winter Clothes', '2023-01-15', 1, 4), 
    (45.00, 'Groceries for Dinner Party', '2023-02-05', 1, 1), 
    (750.00, 'February Rent', '2023-02-01', 1, 2),   
    (12.99, 'Spotify Premium', '2023-02-10', 1, 3), 
    (80.00, 'New Shoes', '2023-02-20', 1, 4),       
    (50.00, 'Additional Rent Fee', '2023-03-01', 1, 2), 
    (5.99, 'Streaming Adjustment', '2023-03-15', 1, 3), 
    -- Independent transactions (10 entries)
    (30.00, 'Dinner with Friends', '2023-01-20', 1, 3),
    (120.00, 'Online Course', '2023-02-03', 1, 3),
    (25.00, 'Taxi Ride', '2023-02-14', 1, 3),
    (8.99, 'Coffee Shop', '2023-02-18', 1, 3),
    (300.00, 'New Laptop', '2023-03-05', 1, 4),
    (50.00, 'Birthday Gift', '2023-03-10', 1, 4),
    (60.00, 'Weekend Groceries', '2023-03-20', 1, 1),
    (20.00, 'Museum Entry', '2023-03-25', 1, 3),
    (150.00, 'Clothing Sale', '2023-04-01', 1, 4),
    (10.00, 'Parking Fee', '2023-04-05', 1, 3);
    
-- Linking fixed_cost transactions (Ronja)
insert into fixed_cost_transactions (fixed_cost_id, transaction_id) values
    (1, 1), (2, 2), (3, 3), (4, 4), (5, 5),
    (6, 6), (7, 7), (8, 8), (2, 9), (3, 10);
