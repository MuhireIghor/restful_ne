import { useAuth } from "@/contexts/AuthProvider";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Input, InputWrapper } from "@mantine/core";
import React from "react";

const AccountIndex = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout right={
      <div className="flex items-center gap-x-6">
        <div className=" border-mainblue border-2 rounded-full ">
          <img
            className=" rounded-full w-10"
            src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&bold=true`}
            alt=""
          />
        </div>
        <div>
          <p className="font-bold">{user?.firstName}</p>
          <p className="text-primary">{user?.lastName}</p>
        </div>
      </div>
    } >
      <div className="w-full h-full flex p-4 flex-col items-center">
        <div className=" border-mainblue border-2 rounded-full mt-11">
          <img
            className=" rounded-full w-40"
            src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&bold=true`}
            alt=""
          />
        </div>
        <div className="flex flex-col w-full items-center mt-5 mx-auto max-w-[800px]">
          <div className="grid w-full gap-6 sm:grid-cols-2">
          <InputWrapper label="firstname" description="Student First Name">
              <Input value={user?.firstName} disabled type={"text"} />
            </InputWrapper> <InputWrapper label="lastname" description="Student Last Name">
              <Input value={user?.lastName} disabled type={"text"} />
            </InputWrapper>
            <InputWrapper label="Email" description="Email">
              <Input value={user?.email} disabled type={"text"} />
            </InputWrapper>
          

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountIndex;
