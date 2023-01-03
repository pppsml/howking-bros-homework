import { useState } from 'react'

function useDebounce(callee: Function, timeoutMs: number) {
  const [ lastCall, setLastCall ] = useState<number>()
  const [ lastCallTimer, setLastCallTimer ] = useState<NodeJS.Timeout>()


  return function perform(...args: any) {
    const previousCall = lastCall
    setLastCall(Date.now())

    if (previousCall && lastCall - previousCall <= timeoutMs) {
      clearTimeout(lastCallTimer)
    }

    setLastCallTimer(setTimeout(() => callee(...args), timeoutMs))
  }
}

export default useDebounce