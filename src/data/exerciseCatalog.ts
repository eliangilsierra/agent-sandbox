import { Exercise } from '../types'

const PREDEFINED_EXERCISES: Exercise[] = [
  // Strength exercises
  { id: 'sq', name: 'Squat', category: 'strength', custom: false, description: 'Bodyweight or weighted squats' },
  { id: 'bsq', name: 'Bulgarian Split Squat', category: 'strength', custom: false },
  { id: 'bb', name: 'Bench Press', category: 'strength', custom: false },
  { id: 'ib', name: 'Incline Bench Press', category: 'strength', custom: false },
  { id: 'dip', name: 'Dips', category: 'strength', custom: false },
  { id: 'pu', name: 'Pull-ups', category: 'strength', custom: false },
  { id: 'pb', name: 'Push-ups', category: 'strength', custom: false },
  { id: 'br', name: 'Barbell Row', category: 'strength', custom: false },
  { id: 'dl', name: 'Deadlift', category: 'strength', custom: false },
  { id: 'lo', name: 'Lift Off', category: 'strength', custom: false },
  { id: 'ohp', name: 'Overhead Press', category: 'strength', custom: false },
  { id: 'cb', name: 'Curl Biceps', category: 'strength', custom: false },
  { id: 'te', name: 'Tricep Extension', category: 'strength', custom: false },
  { id: 'lp', name: 'Leg Press', category: 'strength', custom: false },

  // Cardio exercises
  { id: 'bp', name: 'Burpees', category: 'cardio', custom: false },
  { id: 'jj', name: 'Jumping Jacks', category: 'cardio', custom: false },
  { id: 'mc', name: 'Mountain Climbers', category: 'cardio', custom: false },
  { id: 'jr', name: 'Jump Rope', category: 'cardio', custom: false },
  { id: 'sp', name: 'Sprint', category: 'cardio', custom: false },
  { id: 'rw', name: 'Rowing Machine', category: 'cardio', custom: false },
  { id: 'sb', name: 'Stationary Bike', category: 'cardio', custom: false },
  { id: 'el', name: 'Elliptical', category: 'cardio', custom: false },
  { id: 'tr', name: 'Treadmill Run', category: 'cardio', custom: false },
  { id: 'st', name: 'Stairs', category: 'cardio', custom: false },

  // Mobility exercises
  { id: 'st', name: 'Static Stretch', category: 'mobility', custom: false },
  { id: 'yg', name: 'Yoga', category: 'mobility', custom: false },
  { id: 'pl', name: 'Pilates', category: 'mobility', custom: false },
  { id: 'fr', name: 'Foam Rolling', category: 'mobility', custom: false },
  { id: 'rt', name: 'Rotations', category: 'mobility', custom: false },
  { id: 'hf', name: 'Hip Flexor Stretch', category: 'mobility', custom: false },
  { id: 'sh', name: 'Shoulder Mobility', category: 'mobility', custom: false },
  { id: 'ag', name: 'Glute Activation', category: 'mobility', custom: false },
  { id: 'dw', name: 'Dynamic Warmup', category: 'mobility', custom: false },
  { id: 'cd', name: 'Cool Down', category: 'mobility', custom: false },
]

export const exerciseCatalog = PREDEFINED_EXERCISES
