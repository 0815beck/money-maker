drop table if exists fixed_cost_transaction;
drop table if exists fixed_cost_transactions;
drop table if exists transaction;
drop table if exists transactions;
drop table if exists fixed_cost;
drop table if exists category;
drop table if exists account;

create table account (
	id bigint auto_increment primary key,
    name varchar(255)
);

create table category (
	id bigint auto_increment primary key,
    img_url varchar(500),
    name varchar(255)
);

create table fixed_cost (
	id bigint auto_increment primary key,
    amount decimal(38, 2),
    description varchar(500),
    start date,
    account_id bigint,
    category_id bigint,
    foreign key (account_id) references account(id),
    foreign key (category_id) references category(id)
);

create table transaction (
	id bigint auto_increment primary key,
    amount decimal(38, 2),
    description varchar(500),
    timestamp date,
    account_id bigint,
    category_id bigint,
    foreign key (account_id) references account(id),
    foreign key (category_id) references category(id)
);

create table fixed_cost_transactions (
	fixed_cost_id bigint,
    transaction_id bigint,
    foreign key (fixed_cost_id) references fixed_cost(id),
    foreign key (transaction_id) references transaction(id)
);