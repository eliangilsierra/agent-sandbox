import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { Routine, Session, Exercise } from '../types'
import { getAllRoutines, createRoutine as createRoutineStorage, deleteRoutine as deleteRoutineStorage, updateRoutine as updateRoutineStorage, addExerciseToRoutine as addExerciseToRoutineStorage, removeExerciseFromRoutine as removeExerciseFromRoutineStorage } from '../storage/routineStorage'
import { getActiveSession, createSession as createSessionStorage, saveSession as saveSessionStorage, clearSession as clearSessionStorage } from '../storage/sessionStorage'
import { getAllExercises } from '../storage/exerciseStorage'

type AppState = {
  routines: Routine[]
  exercises: Exercise[]
  currentSession: Session | null
}

type AppAction =
  | { type: 'LOAD_DATA' }
  | { type: 'CREATE_ROUTINE'; name: string; restSeconds: number; description?: string }
  | { type: 'DELETE_ROUTINE'; id: string }
  | { type: 'UPDATE_ROUTINE'; id: string; name: string; description?: string; restSeconds: number }
  | { type: 'ADD_EXERCISE_TO_ROUTINE'; routineId: string; exerciseId: string; sets: number; reps: number }
  | { type: 'REMOVE_EXERCISE_FROM_ROUTINE'; routineId: string; exerciseInRoutineId: string }
  | { type: 'START_SESSION'; routineId: string }
  | { type: 'UPDATE_SESSION'; updates: Partial<Omit<Session, 'id'>> }
  | { type: 'CLEAR_SESSION' }

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        routines: getAllRoutines(),
        exercises: getAllExercises(),
        currentSession: getActiveSession(),
      }

    case 'CREATE_ROUTINE': {
      const routine = createRoutineStorage(action.name, action.restSeconds, action.description)
      return {
        ...state,
        routines: [...state.routines, routine],
      }
    }

    case 'DELETE_ROUTINE':
      deleteRoutineStorage(action.id)
      return {
        ...state,
        routines: state.routines.filter((r) => r.id !== action.id),
      }

    case 'UPDATE_ROUTINE': {
      const updated = updateRoutineStorage(action.id, {
        name: action.name,
        description: action.description,
        restSeconds: action.restSeconds,
      })
      return {
        ...state,
        routines: state.routines.map((r) => (r.id === action.id ? updated || r : r)),
      }
    }

    case 'ADD_EXERCISE_TO_ROUTINE': {
      const updated = addExerciseToRoutineStorage(action.routineId, action.exerciseId, action.sets, action.reps)
      return {
        ...state,
        routines: state.routines.map((r) => (r.id === action.routineId ? updated || r : r)),
      }
    }

    case 'REMOVE_EXERCISE_FROM_ROUTINE': {
      const updated = removeExerciseFromRoutineStorage(action.routineId, action.exerciseInRoutineId)
      return {
        ...state,
        routines: state.routines.map((r) => (r.id === action.routineId ? updated || r : r)),
      }
    }

    case 'START_SESSION': {
      const session = createSessionStorage(action.routineId)
      return {
        ...state,
        currentSession: session,
      }
    }

    case 'UPDATE_SESSION':
      if (state.currentSession) {
        const updated = { ...state.currentSession, ...action.updates }
        saveSessionStorage(updated)
        return { ...state, currentSession: updated }
      }
      return state

    case 'CLEAR_SESSION':
      clearSessionStorage()
      return { ...state, currentSession: null }

    default:
      return state
  }
}

type AppContextType = {
  state: AppState
  dispatch: React.Dispatch<AppAction>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    routines: [],
    exercises: [],
    currentSession: null,
  })

  React.useEffect(() => {
    dispatch({ type: 'LOAD_DATA' })
  }, [])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
