import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { getAllRoutines, createRoutine, deleteRoutine, updateRoutine, addExerciseToRoutine } from '../storage/routineStorage'
import { getAllExercises, createCustomExercise, deleteCustomExercise } from '../storage/exerciseStorage'

describe('Routine Storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should create a routine', () => {
    const routine = createRoutine('Chest Day', 60, 'Focus on bench press')
    expect(routine).toBeDefined()
    expect(routine.name).toBe('Chest Day')
    expect(routine.restSeconds).toBe(60)
  })

  it('should retrieve all routines', () => {
    createRoutine('Chest', 60)
    createRoutine('Legs', 60)
    const routines = getAllRoutines()
    expect(routines).toHaveLength(2)
  })

  it('should update a routine', () => {
    const routine = createRoutine('Workout', 60)
    const updated = updateRoutine(routine.id, { name: 'Updated Workout', restSeconds: 90 })
    expect(updated?.name).toBe('Updated Workout')
    expect(updated?.restSeconds).toBe(90)
  })

  it('should delete a routine', () => {
    const routine = createRoutine('Temporary', 60)
    deleteRoutine(routine.id)
    const routines = getAllRoutines()
    expect(routines).toHaveLength(0)
  })

  it('should add exercise to routine', () => {
    const routine = createRoutine('Test', 60)
    const updated = addExerciseToRoutine(routine.id, 'sq', 3, 10)
    expect(updated?.exercises).toHaveLength(1)
    expect(updated?.exercises[0].sets).toBe(3)
    expect(updated?.exercises[0].reps).toBe(10)
  })
})

describe('Exercise Storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should load predefined exercises', () => {
    const exercises = getAllExercises()
    expect(exercises.length).toBeGreaterThan(30)
    expect(exercises.some((e) => e.name === 'Squat')).toBe(true)
  })

  it('should create a custom exercise', () => {
    const exercise = createCustomExercise('Custom Exercise', 'Test desc')
    expect(exercise.name).toBe('Custom Exercise')
    expect(exercise.custom).toBe(true)
  })

  it('should include custom exercises in getAllExercises', () => {
    createCustomExercise('My Exercise')
    const exercises = getAllExercises()
    const custom = exercises.filter((e) => e.custom)
    expect(custom).toHaveLength(1)
  })

  it('should delete custom exercise', () => {
    const exercise = createCustomExercise('Temporary Exercise')
    deleteCustomExercise(exercise.id)
    const exercises = getAllExercises()
    const remaining = exercises.filter((e) => e.id === exercise.id)
    expect(remaining).toHaveLength(0)
  })
})
