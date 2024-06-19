import axios from "axios";

// Retrieve base API URL from environment variables
export const baseUrl = import.meta.env.VITE_API_URL as string;

// Create axios instance for general API requests
export const api = axios.create({
  // Use provided API URL from environment variables, fallback to a default URL
  baseURL:
    (import.meta.env.VITE_API_URL as string) ??
    "http://10.5.220.228:5433/api/v1",
  headers: {
    "Content-Type": "application/json",  // Set Content-Type header for JSON requests
  },
});

// Create axios instance for authenticated API requests
export const AuthApi = axios.create({
  // Use provided API URL from environment variables, fallback to a default URL
  baseURL:
    (import.meta.env.VITE_API_URL as string) ??
    "http://10.5.220.228:5433/api/v1",
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,  // Include Bearer token in Authorization header from sessionStorage
  },
});

// Function to get user-friendly error message from axios error object
export const getResError = (error?: any) => {
  if (!error) return "Something Went Wrong";  // If no error provided, return a default error message
  const isNetError = error?.message?.includes("Network Error");  // Check if error is due to network issue
  if (isNetError) return "Network Error";  // Return "Network Error" if it's a network-related error
  // Extract error message from axios response data or fallback to generic error message
  return (
    error?.response?.data?.error ??  // Check if error message is in response data under 'error'
    error?.response?.data?.message ??  // Check if error message is in response data under 'message'
    error?.message ??  // Otherwise, fallback to error message from axios error object
    "Something Went Wrong"  // Default generic error message if no specific message found
  );
};

// Function to extract error message from axios error response data
export const getErrorFromResponseData = (error: any): string => {
  if (!error.response) return "Network Error";  // Return "Network Error" if no response object exists in error
  if (error.response.data.message.length > 100) {  // Trim error message to 100 characters if longer
    return `${(error.response.data.message as unknown as string).substring(0, 100)}...`
  }
  return error.response.data.message;  // Return full error message from response data
};
