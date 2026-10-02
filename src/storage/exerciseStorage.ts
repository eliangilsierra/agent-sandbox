import { Exercise } from '../types'
import { exerciseCatalog } from '../data/exerciseCatalog'

const STORAGE_KEY_EXERCISES = 'gym-app:exercises'

export interface ExerciseStorage {
  predefined: Exercise[]
  custom: Exercise[]
}

function loadFromStorage(): ExerciseStorage {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_EXERCISES)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Failed to load exercises from storage:', e)
  }
  return { predefined: exerciseCatalog, custom: [] }
}

function saveToStorage(data: ExerciseStorage): void {
  try {
    localStorage.setItem(STORAGE_KEY_EXERCISES, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save exercises to storage:', e)
  }
}

export function getAllExercises(): Exercise[] {
  const storage = loadFromStorage()
  return [...storage.predefined, ...storage.custom]
}

export function getExerciseById(id: string): Exercise | undefined {
  return getAllExercises().find((e) => e.id === id)
}

export function createCustomExercise(name: string, description?: string): Exercise {
  const exercise: Exercise = {
    id: `custom_${Date.now()}`,
    name,
    description,
    category: 'strength',
    custom: true,
  }
  const storage = loadFromStorage()
  storage.custom.push(exercise)
  saveToStorage(storage)
  return exercise
}

export function deleteCustomExercise(id: string): void {
  const storage = loadFromStorage()
  storage.custom = storage.custom.filter((e) => e.id !== id)
  saveToStorage(storage)
}
