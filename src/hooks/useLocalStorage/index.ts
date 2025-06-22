import { useCallback, useState } from 'react'

export const useLocalStorage = <T>(
  key: string,
  initialValue: T | (() => T)
): [T, (value: T | ((val: T) => T)) => void, () => void] => {
  const getStoredValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return typeof initialValue === 'function'
        ? (initialValue as () => T)()
        : initialValue
    }

    try {
      const item = localStorage.getItem(key)

      return item
        ? JSON.parse(item)
        : typeof initialValue === 'function'
          ? (initialValue as () => T)()
          : initialValue
    } catch (error) {
      console.warn(`useLocalStorage: Error reading "${key}"`, error)

      return typeof initialValue === 'function'
        ? (initialValue as () => T)()
        : initialValue
    }
  }, [key, initialValue])

  const [storedValue, setStoredValue] = useState<T>(getStoredValue)

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)

        localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.warn(`useLocalStorage: Error setting "${key}"`, error)
      }
    },
    [key, storedValue]
  )

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key)

      setStoredValue(
        typeof initialValue === 'function'
          ? (initialValue as () => T)()
          : initialValue
      )
    } catch (error) {
      console.warn(`useLocalStorage: Error removing "${key}"`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}
