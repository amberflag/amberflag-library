'use client'
import React, { createContext, useContext, useState } from 'react'

const ContextFeatureFlagsProject = createContext<{
  featureFlags?: any
  setFeatureFlags?: (features: {}) => void
}>({})

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [featureFlags, setFeatureFlags] = useState<any>({})

  return (
    <ContextFeatureFlagsProject.Provider
      value={{ featureFlags, setFeatureFlags }}
    >
      {children}
    </ContextFeatureFlagsProject.Provider>
  )
}
export function useFeatureFlagsContext() {
  return useContext(ContextFeatureFlagsProject)
}
