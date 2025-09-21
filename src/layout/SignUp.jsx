import React from 'react';
import { Dialog } from '@headlessui/react';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';

const SignUp = ({ isOpen, onClose, onSwitchToLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

  // Watch password for confirmation validation
  const password = watch("password");

  // Password visibility states
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Reset form when dialog closes
  React.useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (data) => {
    console.log(data);
    alert('Sign up successful! Please check your email to verify your account.');
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
            Create Your Account
          </Dialog.Title>
          
          {/* Sign up form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* First Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName" className="font-medium">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                className={`border rounded-lg px-4 py-3 focus:ring-1 outline-none ${
                  errors.firstName 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'focus:ring-orange-500 focus:border-orange-500'
                }`}
                {...register('firstName', { 
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'First name must be at least 2 characters'
                  }
                })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="lastName" className="font-medium">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                className={`border rounded-lg px-4 py-3 focus:ring-1 outline-none ${
                  errors.lastName 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'focus:ring-orange-500 focus:border-orange-500'
                }`}
                {...register('lastName', { 
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name must be at least 2 characters'
                  }
                })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                className={`border rounded-lg px-4 py-3 focus:ring-1 outline-none ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'focus:ring-orange-500 focus:border-orange-500'
                }`}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="password" className="font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`border rounded-lg px-4 py-3 pr-12 focus:ring-1 outline-none ${
                  errors.password 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'focus:ring-orange-500 focus:border-orange-500'
                }`}
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number'
                  }
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="confirmPassword" className="font-medium">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className={`border rounded-lg px-4 py-3 pr-12 focus:ring-1 outline-none ${
                  errors.confirmPassword 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'focus:ring-orange-500 focus:border-orange-500'
                }`}
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => 
                    value === password || 'Passwords do not match'
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center gap-2">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 accent-orange-500"
                {...register('terms', { 
                  required: 'You must accept the terms and conditions'
                })}
              />
              <label htmlFor="terms" className="text-sm">
                I agree to the <a href="#" className="text-orange-500 hover:underline">Terms and Conditions</a> <span className="text-red-500">*</span>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm -mt-3">{errors.terms.message}</p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-[#212529] text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-500 transition duration-200 mt-2"
            >
              Sign Up
            </button>
          </form>
          
          {/* Login prompt */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={onSwitchToLogin}
              className="text-orange-500 hover:underline font-medium"
            >
              Log in
            </button>
          </p>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SignUp;
