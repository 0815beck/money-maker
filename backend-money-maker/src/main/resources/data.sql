INSERT INTO account (name) VALUES ('Nico');
INSERT INTO account (name) VALUES ('Corinna');
INSERT INTO account (name) VALUES ('Ronja');

INSERT INTO category (name) VALUES ('rent');
INSERT INTO category (name) VALUES ('salary');
INSERT INTO category (name) VALUES ('groceries');
INSERT INTO category (name) VALUES ('entertainment');
INSERT INTO category (name) VALUES ('clothing');
INSERT INTO category (name) VALUES ('transportation');

INSERT INTO fixed_cost (amount, description, start, account_id, category_id) VALUES
    (-450, 'monthly rent', '2024-09-01', 1, 1),
    (2240, 'salary web dev', '2024-10-03', 1, 2),
    (-9.99, 'netflix abo', '2024-10-14', 1,4);

INSERT INTO transaction (amount, description, timestamp, account_id, category_id) VALUES
  (-450, 'monthly rent', '2024-09-01', 1,1),
  (-450, 'monthly rent', '2024-10-01', 1, 1),
  (-450, 'monthly rent', '2024-11-01', 1, 1),
  (2240, 'salary web dev', '2024-10-03', 1, 2),
  (2240, 'salary web dev', '2024-11-03', 1, 2),
  (-9.99, 'netflix abo', '2024-10-14', 1, 4),
  (-9.99, 'netflix abo', '2024-11-14', 1, 4),
  (-50,'edeka', '2024-11-13', 1, 3);

INSERT INTO fixed_cost_transactions (fixed_cost_id, transaction_id) VALUES
    (1,1), (1,2), (1,3),
    (2,4), (2,5),
    (3,6), (3,7);







