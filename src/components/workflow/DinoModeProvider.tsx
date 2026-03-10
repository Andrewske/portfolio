'use client'

import { createContext, type ReactNode, useContext, useState } from 'react'

interface DinoModeContextValue {
  noDinos: boolean
  toggleNoDinos: () => void
}

const DinoModeContext = createContext<DinoModeContextValue | null>(null)

export function useDinoMode(): DinoModeContextValue {
  const context = useContext(DinoModeContext)
  if (!context) {
    throw new Error('useDinoMode must be used within DinoModeProvider')
  }
  return context
}

interface DinoModeProviderProps {
  children: ReactNode
}

export function DinoModeProvider({ children }: DinoModeProviderProps): ReactNode {
  const [noDinos, setNoDinos] = useState(false)

  const toggleNoDinos = (): void => {
    setNoDinos(prev => !prev)
  }

  return (
    <DinoModeContext.Provider value={{ noDinos, toggleNoDinos }}>
      {children}
    </DinoModeContext.Provider>
  )
}
