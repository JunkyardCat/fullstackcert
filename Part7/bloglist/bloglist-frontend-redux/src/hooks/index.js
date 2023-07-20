import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
    console.log('inside onChange', value)
  }
  const reset = () => {
    console.log('inside reset', value)
    setValue('')
    console.log('inside reset2', value)
  }
  return {
    type,
    value,
    reset,
    onChange,
  }
}
