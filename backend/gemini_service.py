import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


def generate_sql_with_gemini(context: str, question: str):
    model = genai.GenerativeModel("gemini-2.5-flash")

    prompt = f"""
{context}

User Question:
{question}

Return only the SQL query.
"""

    response = model.generate_content(prompt)

    return response.text.strip()