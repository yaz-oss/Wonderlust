import { useEffect, useState } from 'react'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
    return item ? JSON.parse(item) as T : initialValue
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  const setStoredValue = (newValue: T) => {
    setValue(newValue)
  }

  return [value, setStoredValue] as const
}
