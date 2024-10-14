"use client";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {useContext} from "react";
import {ClassNameValue} from "tailwind-merge";
import SettingsMenu from "./SettingsMenu";
import UserBtn from "./UserBtn";
import {useUser} from "@/context/userContext";
import Image from "next/image";

export default function DashboardNav({title, className}: {title: string; className?: ClassNameValue}) {
  const userData: any = useUser();
  return (
    <div
      className={`dashboard-nav mb-10 pl-12 pr-5 flex justify-between gap-3 items-center text-foreground w-full max-[260px]:flex-col-reverse max-[260px]:p-0 ${cn(
        className
      )}`}
    >
      <h1 className="text-2xl font-bold place-self-start">{title}</h1>

      <div className="dashboard-nav-elements">
        <UserBtn userData={userData} />
        {/* <Dialog>
          <div className="flex justify-center items-center ">
            <DialogTrigger className="gear-btn">
              <div className="w-8 h-8 ">
                <img width={32} src={`/settings.png`} alt="avatar" className="w-8 h-8 duration-300 transition-all" />
              </div>
            </DialogTrigger>
          </div>
          <SettingsMenu userData={userData} />
        </Dialog> */}
      </div>
    </div>
  );
}
