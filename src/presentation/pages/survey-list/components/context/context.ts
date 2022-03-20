import { createContext } from 'react'

interface ContextProps {
  state: any
  setState: React.Dispatch<React.SetStateAction<any>>
}

export default createContext(null as unknown as ContextProps)
