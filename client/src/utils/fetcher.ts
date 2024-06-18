import axios from "axios";

export const baseUrl = import.meta.env.VITE_API_URL as string;

export const api = axios.create({
  baseURL:
    (import.meta.env.VITE_API_URL as string) ??
    "http://10.5.221.135:5433/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
export const AuthAPi = axios.create({
  baseURL:
    (import.meta.env.VITE_API_URL as string) ??
    "http://10.5.221.135:5433/api/v1",
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});

export const getResError = (error?: any) => {
  if (!error) return "Something Went Wrong";
  const isNetError = error?.message?.includes("Network Error");
  if (isNetError) return "Network Error";
  return (
    error?.response?.data?.error ??
    error?.response?.data?.message ??
    error?.message ??
    "Something Went Wrong"
  );
};

export const getFileUrl = (fileUrl: string) => {
  let url = "";
  AuthAPi.get(`${baseUrl}/documents/download/${fileUrl}`, {
    responseType: "blob",
  })
    .then((response) => {
      url = window.URL.createObjectURL(new Blob([response.data]));
      console.log("url", url);
      return url;
    })
    .catch((err) => {
      console.log(err);
      return "";
    });
};

export const getErrorFromResponseData = (error: any): string => {
  if (!error.response) return "Network Error";
  if (error.response.data.message.length > 100) {
    return `${(error.response.data.message as unknown as string).substring(0, 100)}...`
  }
  return error.response.data.message;
};