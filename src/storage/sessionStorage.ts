import { Session } from '../types'

const STORAGE_KEY_SESSION = 'gym-app:session'

export function getActiveSession(): Session | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_SESSION)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Failed to load session from storage:', e)
  }
  return null
}

export function createSession(routineId: string): Session {
  const session: Session = {
    id: `session_${Date.now()}`,
    routineId,
    startedAt: Date.now(),
    completed: false,
    elapsedSeconds: 0,
    currentExerciseIndex: 0,
    currentSet: 1,
  }
  saveSession(session)
  return session
}

export function saveSession(session: Session): void {
  try {
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session))
  } catch (e) {
    console.error('Failed to save session to storage:', e)
  }
}

export function updateSession(updates: Partial<Omit<Session, 'id'>>): void {
  const current = getActiveSession()
  if (!current) return

  const updated: Session = { ...current, ...updates }
  saveSession(updated)
}

export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_SESSION)
  } catch (e) {
    console.error('Failed to clear session:', e)
  }
}
