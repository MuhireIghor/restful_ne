import { Button } from "@mantine/core";
import illustration from "@/assets/images/illustation.png";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { api, getResError } from "@/utils/fetcher";
import { notifications } from "@mantine/notifications";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, useForm } from "react-hook-form";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  type loginInput = {
    email: string;
    password: string;
  }
  const validationSchema = yup.object({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup.string()


  })

  const { register, handleSubmit, formState: { errors } } = useForm<loginInput>({
    resolver: yupResolver(validationSchema) as Resolver<loginInput>,
    mode: "onTouched"
  })

  const login = async (data: any) => {

    setLoading(true);
    try {
      const res = await api.post("/auth/login", data);
      console.log(res);
      if (res.data) {
        notifications.show({
          title: "Login Success",
          message: "Login Success",
          color: "green",
          autoClose: 3000,
        });
        console.log(res.data, "Respomse====")
        const user = res.data.data?.student;
        sessionStorage.setItem("token", res.data.data?.token);
        sessionStorage.setItem("user", JSON.stringify(user));
        const nextUrl = "/account"
        window.location.href = nextUrl;
        return;

      }
      else {
        notifications.show({
          title: "Login Failed",
          message: "Login failure",
          color: "red",
          autoClose: 3000,
        });
      }

    } catch (error) {
      console.log(getResError(error));
      const _err = getResError(error);
      notifications.show({
        title: "Login Failed",
        message:
          _err.trim() !== "" ? _err : "The Email or password is incorrec",
        color: "red",
        autoClose: 3000,
      });
    }
    finally {
      setLoading(false);

    }
  };
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  if (token) {

    return <Navigate to="/account" />;
  }

  return (
    <main className="bg-foreground w-screen h-screen">
      <div className="h-full md:flex">
        <div className="bg-white h-full w-full max-w-full md:max-w-xl p-4 sm:p-8 pt-8">
          <header className="w-fit m-auto scale-90">
            <div className="w-fit">
              <img
                src="/logo.png"
                className="w-12 h-12 object-cover"
                alt="DMS Logo"
              />
            </div>
            <h2 className="text-center text-2xl font-semibold mt-8">Login</h2>
          </header>

          <div className="mt-12 scale-90">
            <form onSubmit={handleSubmit(login)}>
              <div className="field flex flex-col gap-2 mt-6">
                <label
                  htmlFor="email"
                  className="text-md font-regular text-black-primary"
                >
                  Email Address
                </label>
                <input
                  className="outline-none border-none text-black-primary h-[50px] bg-input text-sm px-4 boder border-transparent rounded-[10px] active:border-gray-600"
                  type="text"
                  placeholder="example@gmail.com"
                  id="email"
                  {...register("email")}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

              </div>

              <div className="field flex flex-col gap-2 mt-6 relative">
                <label
                  htmlFor="password"
                  className="text-md font-regular text-black-primary"
                >
                  Password
                </label>
                <input

                  className="outline-none border-none text-black-primary h-[50px] bg-input text-sm px-4 boder border-transparent rounded-[10px] active:border-gray-600"
                  type={showPassword ? "text" : "password"}
                  placeholder="*********"
                  id="password"
                  {...register("password")}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                <div className="absolute right-3 bottom-4">
                  {!showPassword ? (
                    <AiFillEyeInvisible
                      className="text-black-primary cursor-pointer text-xl"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <AiFillEye
                      className="text-black-primary cursor-pointer text-xl"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>

              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-[15px] h-[15px]"
                    name="me"
                    id="me"
                  />
                  <label className="text-sm text-black-primary" htmlFor="me">
                    Remember me
                  </label>
                </div>
                <div className="">
                  <Link
                    to="/auth/forgot-password"
                    className="text-sm text-primary"
                  >
                    Reset Password?
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  radius="md"
                  w={"100%"}
                  size="md"
                  className="h-[50px] bg-primary text-white rounded-[10px] w-full font-semibold"
                >
                  Log in
                </Button>
              </div>

              <div className="mt-6">
                <p className="text-md text-black-primary text-center">
                  Don't have account yet?{" "}
                  <a href="/auth/signup" className="text-primary">
                    New Account
                  </a>{" "}
                </p>
              </div>

            </form>
          </div>
        </div>
        <div className="w-full hidden md:flex items-center justify-center">
          <img src={illustration} className="w-[60%]" alt="" />
        </div>
      </div>
    </main>
  );
}
