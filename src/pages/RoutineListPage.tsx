import { useState } from 'react'
import { useApp } from '../context/AppContext'
import '../styles/pages.css'

export function RoutineListPage({ onSelectRoutine }: { onSelectRoutine: (id: string) => void }) {
  const { state, dispatch } = useApp()
  const [showNewRoutineModal, setShowNewRoutineModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [newRest, setNewRest] = useState(60)

  const handleCreateRoutine = () => {
    if (newName.trim()) {
      dispatch({
        type: 'CREATE_ROUTINE',
        name: newName,
        restSeconds: newRest,
      })
      setNewName('')
      setNewRest(60)
      setShowNewRoutineModal(false)
    }
  }

  const handleDeleteRoutine = (id: string) => {
    if (confirm('Delete this routine?')) {
      dispatch({ type: 'DELETE_ROUTINE', id })
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>My Routines</h1>
        <button onClick={() => setShowNewRoutineModal(true)} className="btn-primary">
          New Routine
        </button>
      </div>

      {state.routines.length === 0 ? (
        <p className="empty-state">No routines yet. Create one to get started!</p>
      ) : (
        <div className="routine-list">
          {state.routines.map((routine) => (
            <div key={routine.id} className="routine-card">
              <div className="routine-card-content">
                <h3>{routine.name}</h3>
                {routine.description && <p>{routine.description}</p>}
                <p className="routine-info">
                  {routine.exercises.length} exercises • {routine.restSeconds}s rest
                </p>
              </div>
              <div className="routine-card-actions">
                <button onClick={() => onSelectRoutine(routine.id)} className="btn-secondary">
                  Edit
                </button>
                <button onClick={() => handleDeleteRoutine(routine.id)} className="btn-danger">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showNewRoutineModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>New Routine</h2>
            <input
              type="text"
              placeholder="Routine name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="input"
            />
            <label>
              Rest between sets (seconds):
              <input
                type="number"
                min="10"
                max="300"
                value={newRest}
                onChange={(e) => setNewRest(parseInt(e.target.value))}
                className="input"
              />
            </label>
            <div className="modal-actions">
              <button onClick={handleCreateRoutine} className="btn-primary">
                Create
              </button>
              <button onClick={() => setShowNewRoutineModal(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
