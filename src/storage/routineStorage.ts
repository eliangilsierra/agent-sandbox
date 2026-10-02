import { Routine, ExerciseInRoutine } from '../types'

const STORAGE_KEY_ROUTINES = 'gym-app:routines'

function loadFromStorage(): Routine[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_ROUTINES)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Failed to load routines from storage:', e)
  }
  return []
}

function saveToStorage(routines: Routine[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_ROUTINES, JSON.stringify(routines))
  } catch (e) {
    console.error('Failed to save routines to storage:', e)
  }
}

export function getAllRoutines(): Routine[] {
  return loadFromStorage()
}

export function getRoutineById(id: string): Routine | undefined {
  return loadFromStorage().find((r) => r.id === id)
}

export function createRoutine(
  name: string,
  restSeconds: number,
  description?: string,
): Routine {
  const routine: Routine = {
    id: `routine_${Date.now()}`,
    name,
    description,
    restSeconds,
    exercises: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
  const routines = loadFromStorage()
  routines.push(routine)
  saveToStorage(routines)
  return routine
}

export function updateRoutine(
  id: string,
  updates: Partial<Omit<Routine, 'id' | 'createdAt'>>,
): Routine | undefined {
  const routines = loadFromStorage()
  const index = routines.findIndex((r) => r.id === id)
  if (index === -1) return undefined

  const updated: Routine = {
    ...routines[index],
    ...updates,
    updatedAt: Date.now(),
  }
  routines[index] = updated
  saveToStorage(routines)
  return updated
}

export function deleteRoutine(id: string): void {
  const routines = loadFromStorage()
  const filtered = routines.filter((r) => r.id !== id)
  saveToStorage(filtered)
}

export function addExerciseToRoutine(
  routineId: string,
  exerciseId: string,
  sets: number,
  reps: number,
): Routine | undefined {
  const routine = getRoutineById(routineId)
  if (!routine) return undefined

  const exerciseInRoutine: ExerciseInRoutine = {
    id: `exercise_in_routine_${Date.now()}`,
    exerciseId,
    sets,
    reps,
  }

  routine.exercises.push(exerciseInRoutine)
  return updateRoutine(routineId, routine)
}

export function removeExerciseFromRoutine(
  routineId: string,
  exerciseInRoutineId: string,
): Routine | undefined {
  const routine = getRoutineById(routineId)
  if (!routine) return undefined

  routine.exercises = routine.exercises.filter((e) => e.id !== exerciseInRoutineId)
  return updateRoutine(routineId, routine)
}

export function updateExerciseInRoutine(
  routineId: string,
  exerciseInRoutineId: string,
  sets: number,
  reps: number,
): Routine | undefined {
  const routine = getRoutineById(routineId)
  if (!routine) return undefined

  const exercise = routine.exercises.find((e) => e.id === exerciseInRoutineId)
  if (!exercise) return undefined

  exercise.sets = sets
  exercise.reps = reps
  return updateRoutine(routineId, routine)
}
