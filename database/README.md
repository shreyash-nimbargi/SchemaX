# Step 1: MySQL Database Setup

This folder contains the database setup for the AI-Powered Natural Language to SQL Query Generator.

## Files

- `schema.sql`: Creates the database, tables, relationships, and sample data.
- `test_queries.sql`: Contains basic and complex join queries for testing and viva explanation.

## Run Schema

Open MySQL:

```bash
mysql -u root -p
```

Run the schema file:

```sql
SOURCE C:/Users/shree/Documents/Codex/2026-06-09/you-are-a-senior-ai-engineer/database/schema.sql;
```

## Run Test Queries

```sql
SOURCE C:/Users/shree/Documents/Codex/2026-06-09/you-are-a-senior-ai-engineer/database/test_queries.sql;
```

## Tables

- `departments`: Stores company departments.
- `employees`: Stores employee details and salary.
- `projects`: Stores department projects.
- `attendance`: Stores daily employee attendance.
- `employee_projects`: Bridge table for the many-to-many relationship between employees and projects.

## Relationships

- One department has many employees.
- One department has many projects.
- One employee has many attendance records.
- One employee can work on many projects.
- One project can have many employees.

## Complex Join Concepts Covered

- `JOIN` for matching related records.
- `LEFT JOIN` for including records even when related data is missing.
- Bridge table joins using `employee_projects`.
- `GROUP BY` with `COUNT`, `AVG`, and `SUM`.
- Conditional aggregation using `CASE WHEN`.
