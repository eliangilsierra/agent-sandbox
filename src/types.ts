export type ExerciseCategory = 'strength' | 'cardio' | 'mobility'

export interface Exercise {
  id: string
  name: string
  description?: string
  category: ExerciseCategory
  custom: boolean
}

export interface ExerciseInRoutine {
  id: string
  exerciseId: string
  sets: number
  reps: number
}

export interface Routine {
  id: string
  name: string
  description?: string
  restSeconds: number
  exercises: ExerciseInRoutine[]
  createdAt: number
  updatedAt: number
}

export interface Session {
  id: string
  routineId: string
  startedAt: number
  pausedAt?: number
  resumedAt?: number
  completed: boolean
  elapsedSeconds: number
  currentExerciseIndex: number
  currentSet: number
  restTimeRemaining?: number
}
