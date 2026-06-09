import { useState } from 'react'

const sampleQuestions = [
  'Show all employees',
  'Show all employees whose salary is greater than 50000',
  'Show employee names with their department names',
  'Count employees in each department',
  'Show employees and their project names',
]

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
    <div className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
              Natural Language to SQL
            </div>
            <h1 className="text-4xl font-bold text-slate-950">SchemaX</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Ask questions in English, generate safe SELECT queries with Gemini,
              and view live MySQL results in one place.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-lg font-bold">5</p>
              <p className="text-xs text-slate-500">Tables</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-lg font-bold">SELECT</p>
              <p className="text-xs text-slate-500">Only</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-lg font-bold">AI</p>
              <p className="text-xs text-slate-500">Gemini</p>
            </div>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <section className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">English Query</h2>
                <p className="mt-1 text-sm text-slate-500">Type a database question.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                MySQL
              </span>
            </div>

            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Example: Show all employees whose salary is greater than 50000"
              className="h-36 w-full resize-none rounded-lg border border-slate-300 bg-slate-50 p-4 text-sm leading-6 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
            />

            <button
              onClick={generateSQL}
              disabled={loading}
              className="mt-4 w-full rounded-lg bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-cyan-300"
            >
              {loading ? 'Generating SQL...' : 'Generate SQL'}
            </button>

            {error && (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Try examples
              </p>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.map((sample) => (
                  <button
                    key={sample}
                    onClick={() => setQuestion(sample)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-5">
            {!response && !loading && (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
                <p className="text-lg font-semibold text-slate-800">Results will appear here</p>
                <p className="mt-2 text-sm text-slate-500">
                  Generate a query to view SQL, validation status, and database rows.
                </p>
              </div>
            )}

            {loading && (
              <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
                <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />
                <div className="mt-4 h-24 animate-pulse rounded-lg bg-slate-100" />
                <div className="mt-4 h-40 animate-pulse rounded-lg bg-slate-100" />
              </div>
            )}

            {response && (
              <>
                <div className="grid gap-5 xl:grid-cols-[1fr_260px]">
                  <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h2 className="text-lg font-semibold">Generated SQL</h2>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          response.is_valid
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {response.is_valid ? 'Valid' : 'Blocked'}
                      </span>
                    </div>
                    <pre className="max-h-64 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm leading-6 text-cyan-100">
                      {response.generated_sql}
                    </pre>
                  </section>

                  <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold">Validation</h2>
                    <p
                      className={`mt-3 rounded-lg border p-3 text-sm ${
                        response.is_valid
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-red-200 bg-red-50 text-red-700'
                      }`}
                    >
                      {response.validation_message}
                    </p>
                    <div className="mt-4 rounded-lg bg-slate-50 p-4">
                      <p className="text-2xl font-bold">{response.total_rows ?? rows.length}</p>
                      <p className="text-sm text-slate-500">Rows returned</p>
                    </div>
                  </section>
                </div>

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">Results Table</h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Live rows returned from the validated query.
                      </p>
                    </div>
                  </div>

                  {rows.length === 0 ? (
                    <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                      No results found.
                    </p>
                  ) : (
                    <div className="mt-5 max-h-[520px] overflow-auto rounded-lg border border-slate-200">
                      <table className="w-full min-w-max border-collapse text-left text-sm">
                        <thead className="sticky top-0 bg-slate-100">
                          <tr>
                            {columns.map((column) => (
                              <th
                                key={column}
                                className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700"
                              >
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>

                        <tbody>
                          {rows.map((row, index) => (
                            <tr key={index} className="border-b border-slate-100 last:border-0 hover:bg-cyan-50/50">
                              {columns.map((column) => (
                                <td key={column} className="px-4 py-3 text-slate-700">
                                  {String(row[column] ?? '')}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
