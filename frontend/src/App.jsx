import { useState } from 'react'

function App() {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateSQL = async () => {
    if (!question.trim()) {
      setError('Please enter a question')
      return
    }

    setLoading(true)
    setError('')
    setResponse(null)

    try {
      const res = await fetch('https://schemax-backend.onrender.com/generate-sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })

      if (!res.ok) {
        throw new Error('Backend request failed')
      }

      const data = await res.json()
      setResponse(data)
    } catch (err) {
      setError('Could not connect to backend. Make sure FastAPI is running.')
    } finally {
      setLoading(false)
    }
  }

  const rows = response?.results || []
  const columns = rows.length > 0 ? Object.keys(rows[0]) : []

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-950">SchemaX</h1>
          <p className="mt-2 text-slate-600">
            AI-Powered Natural Language to SQL Query Generator
          </p>
        </header>

        <section className="rounded-lg bg-white p-6 shadow-sm">
          <label className="block text-sm font-medium text-slate-700">
            English Query Input
          </label>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Example: Show all employees whose salary is greater than 50000"
            className="mt-2 h-28 w-full resize-none rounded-md border border-slate-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <button
            onClick={generateSQL}
            disabled={loading}
            className="mt-4 rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading ? 'Generating...' : 'Generate SQL'}
          </button>

          {error && (
            <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}
        </section>

        {response && (
          <div className="mt-6 space-y-6">
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Generated SQL</h2>
              <pre className="mt-3 overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-green-300">
                {response.generated_sql}
              </pre>
            </section>

            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">SQL Validation</h2>
              <p
                className={`mt-3 rounded-md p-3 text-sm ${
                  response.is_valid
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {response.validation_message}
              </p>
            </section>

            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Results Table</h2>

              {rows.length === 0 ? (
                <p className="mt-3 text-slate-600">No results found.</p>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-200">
                        {columns.map((column) => (
                          <th key={column} className="border border-slate-300 px-3 py-2">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {rows.map((row, index) => (
                        <tr key={index} className="odd:bg-white even:bg-slate-50">
                          {columns.map((column) => (
                            <td key={column} className="border border-slate-300 px-3 py-2">
                              {row[column]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

export default App