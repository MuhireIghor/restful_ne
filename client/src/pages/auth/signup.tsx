import { Button } from "@mantine/core";
import illustration from "@/assets/images/illustation.png";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { api, getResError } from "@/utils/fetcher";
import { notifications } from "@mantine/notifications";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);

    type signUpInput = {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    }
    const validationSchema = yup.object({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("lastName is required"),
        email: yup.string().email("Email is invalid").required("Email is required"),
        password: yup.string()


    })
    const { register, handleSubmit, formState: { errors } } = useForm<signUpInput>({
        resolver: yupResolver(validationSchema) as Resolver<signUpInput>,
        mode: "onTouched"
    })

    const [loading, setLoading] = useState(false);


    const signup = async (data: any) => {
        console.log("Sign up", data);
        setLoading(true);
        try {
            const res = await api.post("/student/register", data);
            console.log(res);
            notifications.show({
                title: "Account Created",
                message: "Signup Success",
                color: "green",
                autoClose: 3000,
            });
            if (res.data) {
                const student = res.data.data?.student;
                sessionStorage.setItem("student", JSON.stringify(student));

                window.location.href = "/auth/login";
            }
        } catch (error) {
            console.log(getResError(error));
            const _err = getResError(error);
            notifications.show({
                title: "Account Creation Failed",
                message:
                    _err.trim() !== "" ? _err : "Please retry again!",
                color: "red",
                autoClose: 3000,
            });
        }
        finally {

            setLoading(false);
        }
    };
    const token = sessionStorage.getItem("token");

    if (token) {
        return <Navigate to="/account" />;
    }

    return (
        <main className="bg-foreground w-screen h-screen">
            <div className="h-full md:flex items-center justify-center ">
                <div className="bg-white h-full  w-full max-w-full md:max-w-xl p-4 sm:p-8  pt-8">
                    <header className="w-fit m-auto scale-90">
                        <div className="w-fit">
                            <img
                                src="/logo.png"
                                className="w-12 h-12 object-cover"
                                alt="Logo"
                            />
                        </div>
                        <h2 className="text-center text-2xl font-semibold mt-8">Create Account</h2>
                    </header>

                    <div className="mt-2 scale-90">
                        <form onSubmit={handleSubmit(signup)}>
                            <div className="field flex flex-col gap-2 mt-6">
                                <label
                                    htmlFor="firstName"
                                    className="text-md font-regular text-black-primary"
                                >
                                    First Name
                                </label>
                                <input
                                    {...register("firstName")}
                                    className="outline-none border-none text-black-primary h-[50px] bg-input text-sm px-4 boder border-transparent rounded-[10px] active:border-gray-600"
                                    type="text"
                                    placeholder="John"
                                    id="firstName"
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                            </div>
                            <div className="field flex flex-col gap-2 mt-6">
                                <label
                                    htmlFor="lastName"
                                    className="text-md font-regular text-black-primary"
                                >
                                    Last Name
                                </label>
                                <input
                                    {...register("lastName")}
                                    className="outline-none border-none text-black-primary h-[50px] bg-input text-sm px-4 boder border-transparent rounded-[10px] active:border-gray-600"
                                    type="text"
                                    placeholder="Doe"
                                    id="lastName"
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                            </div>
                            <div className="field flex flex-col gap-2 mt-6">
                                <label
                                    htmlFor="email"
                                    className="text-md font-regular text-black-primary"
                                >
                                    Email
                                </label>
                                <input
                                    className="outline-none border-none text-black-primary h-[50px] bg-input text-sm px-4 boder border-transparent rounded-[10px] active:border-gray-600"
                                    type="email"
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
                                    {...register("password")}
                                    className="outline-none border-none text-black-primary h-[50px] bg-input text-sm px-4 boder border-transparent rounded-[10px] active:border-gray-600"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="*********"
                                    id="password"
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

                            <div className="mt-6 place-self-end">
                                <Button
                                    type="submit"
                                    loading={loading}
                                    disabled={loading}
                                    radius="md"
                                    w={"100%"}
                                    size="md"
                                    className="h-[50px] bg-primary text-white rounded-[10px] w-full font-semibold"
                                >
                                    Sign Up
                                </Button>
                            </div>

                            <div className="mt-6">
                                <p className="text-md text-black-primary text-center">
                                    Already have an {" "}
                                    <a href="/auth/login" className="text-primary">
                                        Login
                                    </a>{" "}
                                </p>
                            </div>

                        </form>
                    </div>
                </div>
                <div className="w-full hidden md:flex items-center justify-center ">
                    <img src={illustration} className="w-[80%]" alt="" />
                </div>
            </div>
        </main>
    );
}
