CREATE TABLE department(
    id INT IDENTITY(1,1) PRIMARY KEY,
    dep_name VARCHAR(100) NOT NULL
);
GO;

CREATE TABLE emp (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    salary DECIMAL(12,2) NOT NULL,
    role VARCHAR(255) NOT NULL,
    dep_id INT,
    manager_id INT NULL,
    FOREIGN KEY (manager_id) REFERENCES emp(id),
    FOREIGN KEY (dep_id) REFERENCES department(id)
);
GO;


INSERT INTO department (dep_name)
VALUES
    ( 'HR'),
    ( 'IT'),
    ( 'Finance');
GO;

INSERT INTO emp (name, salary, role, dep_id, manager_id)
VALUES
    ('Omar Khaled', 12000, 'manager', 2, NULL),   -- IT
    ('Mona Ali', 9500, 'manager', 1, NULL),       -- HR
    ('Karim Hassan', 18000, 'manager', 3, NULL);  -- Finance
GO;

INSERT INTO emp (name, salary, role, dep_id, manager_id)
VALUES
    ('Laila Youssef', 22000, 'employee', 2, 1),   -- IT, manager Omar
    ('Hassan Ibrahim', 15500, 'employee', 1, 2),  -- HR, manager Mona
    ('Nora Adel', 32000, 'employee', 3, 3),       -- Finance, manager Karim
    ('Jane Smith', 6000, 'employee', 1, 2),       -- HR
    ('Ali Hassan', 4500, 'employee', 2, 1),       -- IT
    ('Sara Ahmed', 7000, 'employee', 3, 3);       -- Finance
GO;

create procedure getEmployeeOfEveryDepartmentConsiderManger
AS 
BEGIN
select department.dep_name , m.name, STRING_AGG(e.name,',') as emp_name from department inner join emp m ON m.dep_id = department.id inner join emp e on m.id = e.manager_id where m.role = 'manager' and m.manager_id is null group by m.name,department.dep_name  ;
END;
GO;

create procedure depSalaryUpdate @Dep varchar(30)
AS 
BEGIN
UPDATE emp SET salary+=1000 where dep_id = (select id from department where dep_name=@Dep);
END;
GO;

create procedure getSecondHighestSalary 
AS 
BEGIN
SELECT TOP 1 * FROM (SELECT TOP 2 * FROM emp ORDER BY salary DESC) AS TOP_2 ORDER BY TOP_2.salary ;
END;
GO;

CREATE PROCEDURE getHighestDepartmentSalary 
AS 
BEGIN
SELECT TOP 1 d.dep_name , sum(e.salary) as total_salary FROM emp e inner join department d ON e.dep_id = d.id group by d.dep_name  order by total_salary desc ;  
END;
GO;

create procedure add1000
AS 
BEGIN
UPDATE emp SET salary+=1000;
END;
GO;

create procedure add25p 
AS 
BEGIN 
UPDATE emp SET salary=salary*1.25
END;
GO;

create procedure addByFilter 
AS 
BEGIN 
UPDATE emp SET  salary= CASE
    WHEN salary > 10000 AND salary <= 20000
        THEN salary*1.25
    WHEN salary > 20000 AND salary <= 30000
        THEN salary*1.30
    WHEN salary>30000
        THEN salary*1.40
    ELSE salary
    END;
END;
GO;

EXEC add25p;
EXEC add1000;
EXEC addByFilter;
EXEC depSalaryUpdate @Dep='Finance';
EXEC getSecondHighestSalary;
EXEC getHighestDepartmentSalary;
EXEC getEmployeeOfEveryDepartmentConsiderManger;
SELECT CURRENT_TIMESTAMP;