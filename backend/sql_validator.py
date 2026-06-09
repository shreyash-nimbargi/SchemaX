import re


BLOCKED_KEYWORDS = [
    "DROP",
    "DELETE",
    "UPDATE",
    "INSERT",
    "ALTER",
    "TRUNCATE",
    "CREATE",
    "REPLACE",
    "GRANT",
    "REVOKE"
]


def clean_sql(sql: str):
    cleaned = sql.strip()

    if cleaned.startswith("```sql"):
        cleaned = cleaned.replace("```sql", "").replace("```", "").strip()
    elif cleaned.startswith("```"):
        cleaned = cleaned.replace("```", "").strip()

    return cleaned


def validate_sql(sql: str):
    cleaned_sql = clean_sql(sql)

    if not cleaned_sql:
        return False, "SQL query is empty", cleaned_sql

    upper_sql = cleaned_sql.upper()

    if not upper_sql.startswith("SELECT"):
        return False, "Only SELECT queries are allowed", cleaned_sql

    for keyword in BLOCKED_KEYWORDS:
        pattern = r"\b" + keyword + r"\b"
        if re.search(pattern, upper_sql):
            return False, f"Blocked keyword found: {keyword}", cleaned_sql

    semicolon_count = cleaned_sql.count(";")

    if semicolon_count > 1:
        return False, "Multiple SQL statements are not allowed", cleaned_sql

    if ";" in cleaned_sql and not cleaned_sql.endswith(";"):
        return False, "Invalid semicolon usage", cleaned_sql

    return True, "SQL query is valid", cleaned_sql