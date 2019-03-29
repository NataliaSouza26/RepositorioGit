create database CRUD

use CRUD

CREATE TABLE Pessoa(
Id int primary key not null identity(1,1),
Nome varchar(50),
Email varchar(100),
Telefone varchar(30))

select * from pessoa