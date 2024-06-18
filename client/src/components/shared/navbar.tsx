"use client";
import { useAuth } from "@/contexts/AuthProvider";
import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface Props {
  right?: React.ReactNode;
}

const NavBar: FC<Props> = ({ right }) => {
  const [title, setTitle] = useState("");
  const [paths, setPaths] = useState<string[]>([]);
  const pathname = useLocation().pathname;
  const { user } = useAuth();

  useEffect(() => {
    setTitle(
      pathname
        .split("/")
        .map((path, index) => {
          if (index === 0) return null;
          if (index === pathname.split("/").length - 1)
            return path.split("-").join(" ");
          return `${path.split("-").join(" ")} / `;
        })
        .join(",")
        .replace(/,/g, "")
    );
    setPaths(pathname.split("/"));
  }, [pathname]);

  return (
    <>
      <Helmet>
        <title>

          {title} | Dashboard
        </title>
      </Helmet>
      <div className=" sticky h-[80px] bg-white  top-0 bg-accent z-10 w-full items-center flex p-5 pl-8 justify-between">
        <h1
          title={title}
          className=" capitalize font-semibold text-md truncate"
        >
          {title}
        </h1>
        <div className="flex items-center gap-x-6">
          <div className=" border-mainblue border-2 rounded-full ">
            <img
              className=" rounded-full w-10"
              src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&bold=true`}
              alt=""
            />
          </div>
          <div>
            <p className="font-bold">{user?.firstName}{user?.lastName}</p>
            <p className="text-primary">{user?.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
