import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthProvider';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = ({ isOpen, onClose, onSwitchToSignUp }) => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  // ✅ Load remembered credentials from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('rememberUser');
    if (savedUser) {
      const { userName, password } = JSON.parse(savedUser);
      setValue('userName', userName);
      setValue('password', password);
    }
  }, [setValue]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (data) => {
    console.log(data);

    // ✅ Save credentials if Remember Me is checked
    if (data.remember) {
      localStorage.setItem(
        'rememberUser',
        JSON.stringify({ userName: data.userName, password: data.password })
      );
    } else {
      localStorage.removeItem('rememberUser');
    }

    // Simulate successful login
    login({ username: data.userName });
    alert('Login successful!');
    onClose();
  };

  // Ensure isOpen is always a boolean
  const dialogOpen = Boolean(isOpen);

  return (
    <Dialog open={dialogOpen} onClose={onClose} className="relative z-[99]">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* Centered container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* Dialog panel */}
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <CloseIcon />
          </button>

          {/* Dialog title */}
          <Dialog.Title className="text-2xl font-bold text-center mb-6">
            Login to Your Account
          </Dialog.Title>

          {/* Login form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Username/Email field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="userName" className="font-medium">
                Username or email address <span className="text-red-500">*</span>
              </label>
              <input
                id="userName"
                type="text"
                autoComplete="username" // 👈 Browser suggestion enabled
                className={`border rounded-lg px-4 py-3 focus:ring-1 outline-none ${
                  errors.userName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'focus:ring-orange-500 focus:border-orange-500'
                }`}
                {...register('userName', {
                  required: 'Username or email is required',
                })}
              />
              {errors.userName && (
                <p className="text-red-500 text-sm">{errors.userName.message}</p>
              )}
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="password" className="font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password" // 👈 Browser suggestion enabled
                className={`border rounded-lg px-4 py-3 focus:ring-1 outline-none ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'focus:ring-orange-500 focus:border-orange-500'
                }`}
                {...register('password', { required: 'Password is required' })}
              />
              {/* 👁️ Eye toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[42px] text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 accent-orange-500"
                  {...register('remember')}
                />
                <label htmlFor="remember" className="text-sm">
                  Remember Me
                </label>
              </div>
              <a href="#" className="text-sm text-orange-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-[#212529] text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-500 transition duration-200 mt-2"
            >
              Log In
            </button>
          </form>

          {/* Sign up prompt */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignUp}
              className="text-orange-500 hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Login;
