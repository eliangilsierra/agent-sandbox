import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import '../styles/pages.css'

export function SessionPage({ routineId, onFinish }: { routineId: string; onFinish: () => void }) {
  const { state, dispatch } = useApp()
  const routine = state.routines.find((r) => r.id === routineId)
  const session = state.currentSession

  const [isPaused, setIsPaused] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(session?.elapsedSeconds || 0)
  const [restTimeRemaining, setRestTimeRemaining] = useState<number | null>(null)

  if (!routine || !session) return <div>Session not found</div>

  const currentExercise = routine.exercises[session.currentExerciseIndex]
  const exerciseData = state.exercises.find((e) => e.id === currentExercise?.exerciseId)

  // Session timer
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => {
        const newSeconds = prev + 1
        dispatch({ type: 'UPDATE_SESSION', updates: { elapsedSeconds: newSeconds } })
        return newSeconds
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isPaused, dispatch])

  // Rest timer
  useEffect(() => {
    if (!restTimeRemaining || restTimeRemaining <= 0) return
    const interval = setInterval(() => {
      setRestTimeRemaining((prev) => {
        if (!prev || prev <= 1) {
          // Play sound
          playSound()
          dispatch({ type: 'UPDATE_SESSION', updates: { restTimeRemaining: undefined } })
          return null
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [restTimeRemaining, dispatch])

  const playSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()
    oscillator.connect(gain)
    gain.connect(audioContext.destination)
    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    gain.gain.setValueAtTime(0.3, audioContext.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)

    if (navigator.vibrate) navigator.vibrate(200)
  }

  const handleNextExercise = () => {
    const nextIndex = session.currentExerciseIndex + 1
    if (nextIndex < routine.exercises.length) {
      dispatch({
        type: 'UPDATE_SESSION',
        updates: {
          currentExerciseIndex: nextIndex,
          currentSet: 1,
          restTimeRemaining: undefined,
        },
      })
    }
  }

  const handleCompleteSet = () => {
    if (session.currentSet < currentExercise.sets) {
      dispatch({
        type: 'UPDATE_SESSION',
        updates: {
          currentSet: session.currentSet + 1,
          restTimeRemaining: routine.restSeconds,
        },
      })
      setRestTimeRemaining(routine.restSeconds)
    } else {
      handleNextExercise()
    }
  }

  const handleFinishSession = () => {
    if (confirm('Finish session?')) {
      dispatch({ type: 'CLEAR_SESSION' })
      onFinish()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="page session-page">
      <div className="session-timers">
        <div className="timer-card">
          <div className="timer-label">Session Time</div>
          <div className="timer-value">{formatTime(elapsedSeconds)}</div>
        </div>
        {restTimeRemaining !== null && (
          <div className="timer-card rest-timer">
            <div className="timer-label">Rest</div>
            <div className="timer-value">{restTimeRemaining}s</div>
          </div>
        )}
      </div>

      <div className="exercise-display">
        <h2>{exerciseData?.name || 'Finished'}</h2>
        {currentExercise && (
          <div className="exercise-details">
            <p className="progress">
              Exercise {session.currentExerciseIndex + 1} of {routine.exercises.length}
            </p>
            <p className="sets-reps">
              Set {session.currentSet} of {currentExercise.sets} • {currentExercise.reps} reps
            </p>
          </div>
        )}
      </div>

      <div className="session-controls">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="btn-primary"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        {!restTimeRemaining && currentExercise && (
          <button onClick={handleCompleteSet} className="btn-secondary">
            Set Complete
          </button>
        )}
        <button onClick={handleFinishSession} className="btn-danger">
          Finish Session
        </button>
      </div>
    </div>
  )
}
