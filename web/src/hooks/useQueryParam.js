import { useCallback, useMemo, useState } from 'react'

export default function useQueryParam (param) {
  const searchParams = useMemo(() => new URLSearchParams(document.location.search), [])
  const [searchParam, setSearchParam] = useState(searchParams.get(param) ?? '')
  const updateQueryParam = useCallback((value) => {
    if (!value) {
      searchParams.delete(param)
      window.history.replaceState(null, null, `?${searchParams.toString()}`)
    } else {
      searchParams.set(param, value)
      window.history.replaceState(null, null, `?${searchParams.toString()}`)
    }
    setSearchParam(value ?? '')
  }, [param, searchParams])

  return [searchParam, updateQueryParam]
}
