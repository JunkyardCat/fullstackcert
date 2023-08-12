CREATE TABLE blogs (
id SERIAL PRIMARY KEY,
author text,
url text NOT NULL,
title text NOT NULL,
likes integer DEFAULT 0);

insert into blogs (author, url, title, likes) values ('Dan Abramov','www.dan.com','On let vs const', 0);
insert into blogs (author, url, title, likes) values ('Laurenz Albe','www.laurenz.com','Gaps in sequences in PostgreSQL', 0);