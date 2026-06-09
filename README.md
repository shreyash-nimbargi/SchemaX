# SchemaX

SchemaX is an AI-powered Natural Language to SQL Query Generator built using FastAPI, React, MySQL, and Google Gemini 2.5 Flash.

The project allows users to ask database questions in plain English. The backend converts the question into an SQL query using Gemini, validates the generated SQL, executes it on a MySQL database, and displays the results.

## Project Objective

The objective of this project is to make database querying easier by allowing users to interact with a database using natural language instead of manually writing SQL queries.

Example:

```text
User Input:
Show all employees whose salary is greater than 50000
Generated SQL:
SELECT * FROM employees WHERE salary > 50000;


## Features

- Natural language query input
- Gemini 2.5 Flash integration
- Context engineering using database schema
- SQL query generation
- SQL validation for safety
- MySQL query execution
- Generated SQL display
- Result table display
- Clean React + Tailwind CSS frontend
- FastAPI backend

## Tech Stack

### Frontend

- React
- Tailwind CSS
- Vite

### Backend

- FastAPI
- Python
- MySQL Connector

### Database

- MySQL

### AI Model

- Google Gemini 2.5 Flash

## Database Tables

The project uses 5 related tables:

- `employees`
- `departments`
- `projects`
- `attendance`
- `employee_projects`

The database supports:

- `SELECT`
- `WHERE`
- `JOIN`
- `GROUP BY`
- `ORDER BY`
- `COUNT`
- `AVG`
- `SUM`

User Question
↓
FastAPI Backend
↓
Context Builder
↓
Gemini 2.5 Flash
↓
SQL Generation
↓
SQL Validation
↓
MySQL Execution
↓
Results Display

SchemaX/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── context_builder.py
│   ├── gemini_service.py
│   ├── sql_validator.py
│   ├── requirements.txt
│   └── .env
│
├── database/
│   ├── schema.sql
│   ├── test_queries.sql
│   └── README.md
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
