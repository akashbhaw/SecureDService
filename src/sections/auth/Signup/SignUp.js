import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Alert, AlertTitle, Stack, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAuth } from '../../contexts/AuthContext';
import Iconify from '../../../components/iconify';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // eslint-disable-next-line consistent-return
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match!');
    }

    try {
      setError('');
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        firstNameRef.current.value,
        lastNameRef.current.value
      );
      setMsg('Account Created Successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to sign up! Account Already Exists');
      setMsg('');
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{marginBlock:2}}>
          <AlertTitle>{error}</AlertTitle>
          <strong>Alert!</strong>
        </Alert>
      )}
      {msg && (
        <Alert severity="success"sx={{marginBlock:2}}>
          <AlertTitle>{msg}</AlertTitle>
          <strong>Congratulations!</strong>
        </Alert>
      )}

      <Stack spacing={3}>
        <TextField name="firstName" label="First Name" inputRef={firstNameRef} />
        <TextField name="lastName" label="Last Name" inputRef={lastNameRef} />
        <TextField name="email" label="Email Address" inputRef={emailRef} />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          inputRef={passwordRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="confirm-password"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          inputRef={passwordConfirmRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{ my: 3 }} loading={loading}>
        Sign Up
      </LoadingButton>

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
        <Typography>Already have an account?</Typography>
        <Link to="/login">Log In</Link>
      </Stack>
    </form>
  );
}
