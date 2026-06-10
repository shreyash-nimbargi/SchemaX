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
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-6 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-700 sm:px-3 sm:py-1 sm:text-xs">
              Natural Language to SQL
            </div>
            <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl md:text-4xl">SchemaX</h1>
            <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
              Ask questions in English, generate safe SELECT queries with Gemini,
              and view live MySQL results in one place.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center sm:gap-3">
            <div className="rounded-lg border border-slate-200 bg-white px-1.5 py-2 shadow-sm sm:px-4 sm:py-3">
              <p className="text-sm font-bold sm:text-lg">5</p>
              <p className="text-[10px] text-slate-500 sm:text-xs">Tables</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-1.5 py-2 shadow-sm sm:px-4 sm:py-3">
              <p className="text-sm font-bold sm:text-lg">SELECT</p>
              <p className="text-[10px] text-slate-500 sm:text-xs">Only</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-1.5 py-2 shadow-sm sm:px-4 sm:py-3">
              <p className="text-sm font-bold sm:text-lg">AI</p>
              <p className="text-[10px] text-slate-500 sm:text-xs">Gemini</p>
            </div>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr]">
          <section className="h-fit overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold sm:text-lg">English Query</h2>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">Type a database question.</p>
              </div>
              <span className="w-fit rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-600 sm:text-xs">
                MySQL
              </span>
            </div>

            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Example: Show all employees whose salary is greater than 50000"
              className="h-32 w-full resize-none rounded-lg border border-slate-300 bg-slate-50 p-3 text-sm leading-6 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 sm:h-36 sm:p-4"
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
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">
                Try examples
              </p>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.map((sample) => (
                  <button
                    key={sample}
                    onClick={() => setQuestion(sample)}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] text-slate-600 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 active:bg-cyan-100 sm:px-3 sm:py-2 sm:text-xs"
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
                <div className="grid gap-5 lg:grid-cols-1 xl:grid-cols-[1fr_260px]">
                  <section className="overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h2 className="text-base font-semibold sm:text-lg">Generated SQL</h2>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold sm:px-3 sm:py-1 sm:text-xs ${
                          response.is_valid
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {response.is_valid ? 'Valid' : 'Blocked'}
                      </span>
                    </div>
                    <pre className="max-h-64 overflow-x-auto rounded-lg bg-slate-950 p-3 text-[10px] leading-5 text-cyan-100 sm:p-4 sm:text-xs sm:leading-6 md:text-sm">
                      {response.generated_sql}
                    </pre>
                  </section>

                  <section className="overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                    <h2 className="text-base font-semibold sm:text-lg">Validation</h2>
                    <p
                      className={`mt-3 rounded-lg border p-3 text-xs sm:text-sm ${
                        response.is_valid
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-red-200 bg-red-50 text-red-700'
                      }`}
                    >
                      {response.validation_message}
                    </p>
                    <div className="mt-4 rounded-lg bg-slate-50 p-4">
                      <p className="text-xl font-bold sm:text-2xl">{response.total_rows ?? rows.length}</p>
                      <p className="text-xs text-slate-500 sm:text-sm">Rows returned</p>
                    </div>
                  </section>
                </div>

                <section className="overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-base font-semibold sm:text-lg">Results Table</h2>
                      <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                        Live rows returned from the validated query.
                      </p>
                    </div>
                  </div>

                  {rows.length === 0 ? (
                    <p className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-600 sm:mt-5">
                      No results found.
                    </p>
                  ) : (
                    <div className="mt-4 max-h-[520px] overflow-auto rounded-lg border border-slate-200 sm:mt-5">
                      <table className="w-full min-w-max border-collapse text-left text-sm">
                        <thead className="sticky top-0 bg-slate-100">
                          <tr>
                            {columns.map((column) => (
                              <th
                                key={column}
                                className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700 whitespace-nowrap"
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
