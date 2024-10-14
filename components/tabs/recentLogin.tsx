"use client";
import {getDayDateTime} from "@/lib/date";
import {getDevice} from "@/lib/utils";
import {Button} from "../ui/button";
import Image from "next/image";
import {signOutAll} from "@/app/(auth)/actions";
import {toast} from "../ui/use-toast";
import {useState} from "react";

export default function RecentLogin({activity}: {activity: any}) {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);

    const result = JSON.parse(await signOutAll());

    if (result.error) {
      toast({
        title: result.error,

        description: result?.description,
        variant: "destructive",
      });
    } else {
      toast({
        title: result.success,
        description: result?.description,
        variant: "success",
      });
    }
    setLoading(false);
  };
  return (
    <div className="">
      <div className="flex items-center justify-between mb-5 mt-10">
        <h1 className="text-xl font-semibold ">Current active sessions</h1>
        <Button onClick={handleLogout} className={`${loading ? "loading" : ""}`}>
          Log out from all devices <span></span>
        </Button>
      </div>
      <div className="rounded-lg  max-h-[600px] overflow-auto">
        <table className="w-full bg-secondary p-3 rounded-lg overflow-hidden">
          <tbody>
            {activity && activity.length > 0 ? (
              activity.map((item: any, i: number) => (
                <tr
                  key={i}
                  className={`${
                    i != 0 ? "border-t" : ""
                  } transition-all duration-300 hover:bg-popover border-muted-foreground`}
                >
                  <td className={`p-3`}>
                    <img src={getDevice(item.user_agent).img} alt="computer" className="w-14" />
                  </td>
                  <td className="p-3">{getDevice(item.user_agent).device}</td>
                  <td className="p-3 text-end">{getDayDateTime(item.logat)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-3">
                  No active sessions
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
