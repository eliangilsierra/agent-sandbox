import { useState } from 'react'
import { useApp } from '../context/AppContext'
import '../styles/pages.css'

export function RoutineEditorPage({ routineId, onBack }: { routineId: string; onBack: () => void }) {
  const { state, dispatch } = useApp()
  const routine = state.routines.find((r) => r.id === routineId)
  const [name, setName] = useState(routine?.name || '')
  const [description, setDescription] = useState(routine?.description || '')
  const [restSeconds, setRestSeconds] = useState(routine?.restSeconds || 60)
  const [showAddExercise, setShowAddExercise] = useState(false)
  const [selectedExerciseId, setSelectedExerciseId] = useState('')
  const [sets, setSets] = useState(3)
  const [reps, setReps] = useState(10)

  if (!routine) return <div>Routine not found</div>

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_ROUTINE',
      id: routineId,
      name,
      description,
      restSeconds,
    })
    onBack()
  }

  const handleAddExercise = () => {
    if (selectedExerciseId) {
      dispatch({
        type: 'ADD_EXERCISE_TO_ROUTINE',
        routineId,
        exerciseId: selectedExerciseId,
        sets,
        reps,
      })
      setSelectedExerciseId('')
      setSets(3)
      setReps(10)
      setShowAddExercise(false)
    }
  }

  const handleRemoveExercise = (exerciseInRoutineId: string) => {
    dispatch({
      type: 'REMOVE_EXERCISE_FROM_ROUTINE',
      routineId,
      exerciseInRoutineId,
    })
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Edit Routine</h1>
        <button onClick={onBack} className="btn-secondary">
          Back
        </button>
      </div>

      <div className="form-group">
        <label>Routine Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
          rows={2}
        />
      </div>

      <div className="form-group">
        <label>Rest between sets (seconds)</label>
        <input
          type="number"
          min="10"
          max="300"
          value={restSeconds}
          onChange={(e) => setRestSeconds(parseInt(e.target.value))}
          className="input"
        />
      </div>

      <div className="form-section">
        <div className="section-header">
          <h2>Exercises ({routine.exercises.length})</h2>
          <button onClick={() => setShowAddExercise(true)} className="btn-primary">
            Add Exercise
          </button>
        </div>

        {routine.exercises.length === 0 ? (
          <p className="empty-state">No exercises yet</p>
        ) : (
          <div className="exercise-list">
            {routine.exercises.map((ex) => {
              const exercise = state.exercises.find((e) => e.id === ex.exerciseId)
              return (
                <div key={ex.id} className="exercise-item">
                  <div>
                    <h4>{exercise?.name || 'Unknown'}</h4>
                    <p>{ex.sets} sets × {ex.reps} reps</p>
                  </div>
                  <button
                    onClick={() => handleRemoveExercise(ex.id)}
                    className="btn-danger-small"
                  >
                    Remove
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {showAddExercise && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Exercise</h2>
            <select
              value={selectedExerciseId}
              onChange={(e) => setSelectedExerciseId(e.target.value)}
              className="input"
            >
              <option value="">Select exercise...</option>
              {state.exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))}
            </select>
            <label>
              Sets:
              <input
                type="number"
                min="1"
                value={sets}
                onChange={(e) => setSets(parseInt(e.target.value))}
                className="input"
              />
            </label>
            <label>
              Reps:
              <input
                type="number"
                min="1"
                value={reps}
                onChange={(e) => setReps(parseInt(e.target.value))}
                className="input"
              />
            </label>
            <div className="modal-actions">
              <button onClick={handleAddExercise} className="btn-primary">
                Add
              </button>
              <button onClick={() => setShowAddExercise(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="form-actions">
        <button onClick={handleSave} className="btn-primary">
          Save
        </button>
        <button onClick={onBack} className="btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  )
}
