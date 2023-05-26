/* eslint-disable import/no-unresolved */
import { useState, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Stack, IconButton, InputAdornment, TextField, Checkbox, Alert, AlertTitle, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAuth } from 'src/sections/contexts/AuthContext';
import Iconify from '../../../components/iconify';

export default function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // Added state for the checkbox
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/dashboard'); // Redirect to the dashboard route
    } catch (error) {
      setError('Failed to log in');
     
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <Stack spacing={3}>
        <TextField name="email" label="Email address" inputRef={emailRef} required />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          inputRef={passwordRef}
          required
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox
          name="remember"
          label="Remember me"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <NavLink to="/resetpass">
          <Link variant="body3">Forgot password?</Link>
        </NavLink>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={loading}>
        Log In
      </LoadingButton>
    </form>
  );
}
