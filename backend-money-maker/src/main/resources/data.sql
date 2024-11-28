INSERT INTO account (name)
VALUES ('Nico');
INSERT INTO account (name)
VALUES ('Corinna');
INSERT INTO account (name)
VALUES ('Ronja');

INSERT INTO category (name, img_url)
VALUES ('rent', 'https://img.icons8.com/?size=100&id=4823&format=png&color=000000'),
       ('salary', 'https://img.icons8.com/?size=100&id=jiAKUZAnt9go&format=png&color=000000'),
       ('groceries', 'https://img.icons8.com/?size=100&id=r1zeTmH4eIib&format=png&color=000000'),
       ('entertainment', 'https://img.icons8.com/?size=100&id=11441&format=png&color=000000'),
       ('clothing',     'https://img.icons8.com/?size=100&id=85007&format=png&color=000000'),
       ('transportation',     'https://img.icons8.com/?size=100&id=241&format=png&color=000000'),

INSERT INTO fixed_cost (amount, description, start, account_id, category_id)
VALUES (-450, 'monthly rent', '2024-09-01', 1, 1), (2240, 'salary web dev', '2024-10-03', 1, 2), (-9.99, 'netflix abo', '2024-10-14', 1, 4), (10.25, 'amazon prime abo', '2024-11-28', 1, 4);

INSERT INTO transaction (amount, description, timestamp, account_id, category_id, is_fixed_cost)
VALUES (-450, 'monthly rent', '2024-09-01', 1, 1, true),
       (-450, 'monthly rent', '2024-10-01', 1, 1, true),
       (-450, 'monthly rent', '2024-11-01', 1, 1, true),
       (2240, 'salary web dev', '2024-10-03', 1, 2, true),
       (2240, 'salary web dev', '2024-11-03', 1, 2, true),
       (-9.99, 'netflix abo', '2024-10-14', 1, 4, true),
       (-9.99, 'netflix abo', '2024-11-14', 1, 4, true),
       (-50, 'edeka', '2024-11-13', 1, 3, false);

INSERT INTO fixed_cost_transactions (fixed_cost_id, transaction_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (2, 4),
       (2, 5),
       (3, 6),
       (3, 7);