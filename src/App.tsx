import { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import { RoutineListPage } from './pages/RoutineListPage'
import { RoutineEditorPage } from './pages/RoutineEditorPage'
import { SessionPage } from './pages/SessionPage'
import './App.css'

type Page = 'list' | 'editor' | 'session'

function AppContent() {
  const { state } = useApp()
  const [currentPage, setCurrentPage] = useState<Page>('list')
  const [selectedRoutineId, setSelectedRoutineId] = useState<string>('')

  const handleSelectRoutine = (id: string) => {
    setSelectedRoutineId(id)
    setCurrentPage('editor')
  }

  const handleStartSession = () => {
    setCurrentPage('session')
  }

  return (
    <div className="app">
      <header>
        <h1>💪 Gym Routine Tracker</h1>
        {currentPage !== 'list' && (
          <button onClick={() => setCurrentPage('list')} className="btn-back">
            ← Back to Routines
          </button>
        )}
      </header>
      <main>
        {currentPage === 'list' && (
          <RoutineListPage
            onSelectRoutine={(id) => {
              setSelectedRoutineId(id)
              setCurrentPage('editor')
            }}
          />
        )}
        {currentPage === 'editor' && selectedRoutineId && (
          <div>
            <RoutineEditorPage
              routineId={selectedRoutineId}
              onBack={() => setCurrentPage('list')}
            />
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              {state.routines.find((r) => r.id === selectedRoutineId)?.exercises.length ? (
                <button onClick={handleStartSession} className="btn-primary btn-large">
                  Start Session
                </button>
              ) : (
                <p>Add exercises to start a session</p>
              )}
            </div>
          </div>
        )}
        {currentPage === 'session' && state.currentSession && (
          <SessionPage
            routineId={state.currentSession.routineId}
            onFinish={() => setCurrentPage('list')}
          />
        )}
      </main>
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
