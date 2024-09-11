import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    if (data.email && data.password.length >= 6) {
      setLoginSuccess(true);
      navigate('/manage-graph');
    }
  };

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-10 rounded-lg shadow-md w-96">
        <Typography variant="h4" className="text-center font-bold mb-8">Login</Typography>

        {/* Email Field */}
        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          {...register('email', {
            required: 'This value is required.',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Enter a valid email address',
            }
          })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
          className="mb-4" 
          InputProps={{
            style: {
              backgroundColor: errors.email ? '#fde2e2' : '',
              marginBottom: "12px",
              marginTop: "8px"
            },
          }}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          {...register('password', {
            required: 'This value is required.',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            }
          })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
          className="mb-4"
          InputProps={{
            style: {
              backgroundColor: errors.password ? '#fde2e2' : '',
              marginBottom: "12px",
            },
          }}
        />

        {/* Forgot Password */}
        <Typography
          variant="body2"
          className="text-blue-600 hover:text-blue-800 text-left mb-8 cursor-pointer"
          style={{marginBottom:"8px"}}
        >
          Forgot Password
        </Typography>

        {/* Submit Button */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          className="bg-blue-800 hover:bg-blue-900 py-3 mb-4"
        >
          Log in
        </Button>

        {/* Success Message */}
        {loginSuccess && <Typography className="mt-6 text-green-600">Login Successful!</Typography>}
      </form>
    </Box>
  );
};

export default Login;
