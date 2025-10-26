import type { FormErrors } from '../types';
import { VALIDATION_RULES } from '../constants';

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return 'Email is required';
  }
  if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
    return 'Email is invalid';
  }
  return null;
};

export const validatePassword = (password: string, isSignup = false): string | null => {
  if (!password.trim()) {
    return 'Password is required';
  }
  if (isSignup && password.length < VALIDATION_RULES.MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} characters`;
  }
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name.trim()) {
    return 'Name is required';
  }
  if (name.trim().length < VALIDATION_RULES.MIN_NAME_LENGTH) {
    return `Name must be at least ${VALIDATION_RULES.MIN_NAME_LENGTH} characters`;
  }
  return null;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword.trim()) {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return null;
};

export const validateTicketTitle = (title: string): string | null => {
  if (!title.trim()) {
    return 'Title is required';
  }
  return null;
};

export const validateTicketStatus = (status: string): string | null => {
  if (!status) {
    return 'Status is required';
  }
  if (!['open', 'in_progress', 'closed'].includes(status)) {
    return 'Status must be open, in_progress, or closed';
  }
  return null;
};

export const validateLoginForm = (email: string, password: string): FormErrors => {
  const errors: FormErrors = {};
  
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;
  
  return errors;
};

export const validateSignupForm = (name: string, email: string, password: string, confirmPassword: string): FormErrors => {
  const errors: FormErrors = {};
  
  const nameError = validateName(name);
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(password, true);
  if (passwordError) errors.password = passwordError;
  
  const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  
  return errors;
};

export const validateTicketForm = (title: string, status: string): FormErrors => {
  const errors: FormErrors = {};
  
  const titleError = validateTicketTitle(title);
  if (titleError) errors.title = titleError;
  
  const statusError = validateTicketStatus(status);
  if (statusError) errors.status = statusError;
  
  return errors;
};

