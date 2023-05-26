import React,{ useRef,useState } from 'react'
import { Link,Alert,AlertTitle,Stack,TextField } from '@mui/material'
import { LoadingButton} from '@mui/lab'

// eslint-disable-next-line import/no-unresolved
import { useAuth } from 'src/sections/contexts/AuthContext'
import { NavLink } from 'react-router-dom'
// eslint-disable-next-line import/no-unresolved

export default function ResetPass() {
  const emailRef = useRef()
  const { resetpass } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetpass(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }
  return (
    <form onSubmit={handleSubmit}>
    {error && (
      <Alert severity="error">
        <AlertTitle>{error}</AlertTitle>
        <strong>Alert!</strong>
      </Alert>
    )}
    {message && (
      <Alert severity="success">
        <AlertTitle>{message}</AlertTitle>
        <strong>Alert!</strong>
      </Alert>
    )}
    <Stack spacing={3}>
      <TextField name="email" label="Email address" inputRef={emailRef} required />

      
      <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={loading}>
        Reset Password
      </LoadingButton>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>

        <NavLink to='/login'>
          <Link variant='body3'>Log In</Link>
        </NavLink>
      </Stack>
      </form>
  )
}
