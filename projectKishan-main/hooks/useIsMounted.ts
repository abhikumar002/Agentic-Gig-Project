import { useEffect, useState } from 'react'

/**
 * Custom hook to prevent hydration mismatches by ensuring component is mounted
 * before rendering client-only content
 */
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}
