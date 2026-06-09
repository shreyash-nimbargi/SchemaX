from fastapi import FastAPI
from pydantic import BaseModel
from database import get_connection
from context_builder import build_database_context
from gemini_service import generate_sql_with_gemini
from sql_validator import validate_sql
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://schemax.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    question: str


@app.get("/")
def home():
    return {"message": "SchemaX backend is running"}


@app.get("/employees")
def get_employees():
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM employees")
    employees = cursor.fetchall()

    cursor.close()
    connection.close()

    return {
        "total": len(employees),
        "data": employees
    }


@app.get("/schema-context")
def get_schema_context():
    context = build_database_context()

    return {
        "message": "Database context generated successfully",
        "context": context
    }


@app.post("/generate-sql")
def generate_sql(request: QueryRequest):
    context = build_database_context()

    generated_sql = generate_sql_with_gemini(
        context=context,
        question=request.question
    )

    is_valid, validation_message, cleaned_sql = validate_sql(generated_sql)

    if not is_valid:
        return {
            "question": request.question,
            "generated_sql": cleaned_sql,
            "is_valid": is_valid,
            "validation_message": validation_message,
            "results": []
        }

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute(cleaned_sql)
    results = cursor.fetchall()

    cursor.close()
    connection.close()

    return {
        "question": request.question,
        "generated_sql": cleaned_sql,
        "is_valid": is_valid,
        "validation_message": validation_message,
        "total_rows": len(results),
        "results": results
    }