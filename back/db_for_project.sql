create table category
(id serial primary key,
name text
);

insert into category
(name)
values
('iPhone'),
('iPad'),
('Watch'),
('Airpods');

select * from category;

create table colors
(id serial primary key,
name text
);

insert into colors
(name)
values
('серебристый'),
('золотой'),
('"черный космос"'),
('"темный фиолет"'),
('белый');

select * from colors;

create table memory
(id serial primary key,
capacity varchar(20)
);


insert into memory
(capacity)
values
('16 ГБ'),
('32 ГБ'),
('64 ГБ'),
('128 ГБ'),
('256 ГБ'),
('512 ГБ'),
('1 ТБ');

insert into memory
values
(0,'0');

select * from memory;

create table clients
(id serial primary key,
name varchar(50)
);


insert into clients
(name)
values
('Джон Доу'),
('Джейн Доу'),
('Вася Пупкин'),
('Хон Гильдон');

select * from clients;

create table dict
(id serial primary key,
name text,
category_id smallint,
release_year int,
constraint fk_category_id 
foreign key (category_id)
references category(id)
);


insert into dict
(name,category_id,release_year)
values
('iPhone 14 Pro Max', 1, 2022),
('iPhone 14 Pro', 1, 2022),
('iPhone 14 Plus', 1, 2022),
('iPhone 14', 1, 2022),
('iPhone SE (3-го поколения)', 1, 2022),
('iPhone 13 Pro Max', 1, 2021),
('iPhone 13 Pro', 1, 2021),
('iPhone 13', 1, 2021),
('iPhone 13 mini', 1, 2021),
('iPhone 12 Pro Max', 1, 2020),
('iPhone 12 Pro', 1, 2020),
('iPhone 12', 1, 2020),
('iPhone 12 mini', 1, 2020),
('iPhone SE (2-го поколения)', 1, 2020),
('iPhone 11 Pro', 1, 2019),
('iPhone 11 Pro Max', 1, 2019),

('iPad Pro (12,9 дюйма, 6-го поколения)', 2, 2022),
('iPad Pro (11 дюймов, 4-го поколения)', 2, 2022),
('iPad Pro 12,9 дюйма (5-го поколения)', 2, 2021),
('iPad Pro 11 дюймов (3-го поколения)', 2, 2021),
('iPad Pro 12,9 дюйма (4-го поколения)', 2, 2020),

('Apple Watch Ultra (GPS + Cellular)', 3, 2022),
('Apple Watch Series 8 (GPS)', 3, 2022),
('Apple Watch Series 8 (GPS + Cellular), алюминий', 3, 2021),
('Apple Watch Series 8 (GPS + Cellular), нержавеющая сталь', 3, 2021),

('AirPods Pro (2-го поколения)', 4, 2022),
('AirPods (3-го поколения)', 4, 2021),
('AirPods Max', 4, 2020),
('AirPods Pro', 4, 2019),
('AirPods (2-го поколения)', 4, 2019),
('AirPods (1-го поколения)', 4, 2017);

select * from dict;


create view dict_view as 
select d.name, c.name as category, d.release_year
from dict d
inner join category c
on c.id = d.category_id
order by d.id;

select * from dict_view;

create table prices
(id serial primary key, price double precision);
;

insert into prices
(price)
values
(600000),
(700000),
(400000),
(300000);

select * from prices;


create table goods
(id serial primary key,
product int,
color_id int,
capacity_id int,
units int,
price_id int,
constraint fk_product foreign key (product) references dict(id),
constraint fk_memory foreign key (capacity_id) references memory(id),
constraint fk_color foreign key (color_id) references colors(id),
constraint fk_price foreign key(price_id) references prices
);

-- Watch
do
$$
declare 
	r record;
	re record;
	rec record;

	i int := 1;
	j int;
	counter int := 1;
begin
	
	for r in (select * from dict 
		where category_id = 3 order by id)
	loop
		for j in 1..5 
		loop
			raise notice '%), %), %, | %', i, j, r.id, counter;
			
		insert into goods
				(product, color_id, capacity_id, units, price_id)
					values
						(r.id, j, 2, 100, 3);
					
			counter = counter + 1;
		
		end loop;
		i = i + 1;
	
	end loop;
end;
$$

-- Airpods
do
$$
declare 
	r record;
	re record;
	rec record;

	i int := 1;
	j int;
	counter int := 1;
begin
	
	for r in (select * from dict 
		where category_id = 4 order by id)
	loop
		for j in 1..5 
		loop
			raise notice '%), %), %, | %', i, j, r.id, counter;
			
		insert into goods
				(product, color_id, capacity_id, units, price_id)
					values
						(r.id, j, 2, 100,4);
					
			counter = counter + 1;
		
		end loop;
		i = i + 1;
	
	end loop;
end;
$$


-- iPhone, iPad
do
$$
declare 
	r record;
	re record;
	rec record;

	i int := 1;
	j int;
	k int;
	counter int := 1;
begin
	
	for r in (select * from dict 
		where category_id in (1,2) order by id)
	loop
		for j in 1..5 
		loop
			
		
			for k in 4..7 
			loop
				raise notice '%), %), %), % | %', i, j, k, r.id, counter;	
					insert into goods
					(product, color_id, capacity_id, units,price_id)
						values
							(r.id, j, k, 100, (SELECT floor(random() * (2 - 1 + 1) + 1)::int));
				counter = counter + 1;
			end loop;
			
		
		

		end loop;
		i = i + 1;
	
	end loop;

end;
$$


select * from goods;

create view goods_view as 
select 
g.id, d.name as product, ca.name as category, d.release_year,
c.name as color, m.capacity, g.units, pr.price
from goods g
inner join dict d
on d.id = g.product
inner join colors c
on c.id = g.color_id
inner join memory m
on m.id = g.capacity_id
inner join category ca
on ca.id = d.category_id
inner join prices pr
on g.price_id = pr.id
order by g.product, g.id
;

select * from goods_view;

-- basket
create table basket
(id serial primary key,
dato date,
 client_id int,
 num serial,
 constraint fk_client
 foreign key (client_id)
 references clients (id)
);

-- basket detail
create table basket_detail
(id serial primary key,
basket_id bigint,
good_id bigint,
units int,
dato timestamp,
constraint fk_basket
foreign key (basket_id)
references basket (id),
constraint fk_good
foreign key (good_id)
references goods (id)
);

alter table basket
alter column dato
set default current_date;

alter table basket_detail
alter column dato
set default current_timestamp;
