"use client";
// import {signOut} from "@/app/(auth)/actions";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {LogOut, Moon, Settings, Sun, Tv2} from "lucide-react";
import {useTheme} from "next-themes";
import SettingsMenu from "./SettingsMenu";
import Image from "next/image";
import {signOut} from "@/app/(auth)/actions";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";

export default function UserBtn({userData}: {userData: any}) {
  const router = useRouter();
  const {theme, setTheme} = useTheme();

  const handleSignout = async () => {
    const {error} = JSON.parse(await signOut());
    if (error) {
      toast({
        title: error,
        variant: "destructive",
      });
    } else router.push("/");
  };

  return (
    <Dialog>
      <DropdownMenu>
        <div className="flex justify-center items-center">
          <DropdownMenuTrigger>
            {userData.avatar ? (
              <div className="w-8 h-8 aspect-square rounded-full outline outline-1 outline-primary">
                <img
                  src={userData?.avatar}
                  alt="avatar"
                  className="w-8 h-8 aspect-square rounded-full outline outline-1 outline-primary"
                />
              </div>
            ) : (
              <div className="w-8 h-8 aspect-square rounded-full outline outline-1 outline-primary">
                <img
                  src={`/user.png`}
                  alt="avatar"
                  className="w-8 h-8 aspect-square rounded-full outline outline-1 outline-primary"
                />
              </div>
            )}
          </DropdownMenuTrigger>
        </div>

        <DropdownMenuContent
          align="end"
          className="mt-1 space-y-1 w-fit border-none shadow-sm"
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <DialogTrigger className="w-full">
            <DropdownMenuItem className="flex items-center cursor-pointer gap-3 w-full">
              <Settings />
              Settings
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className={`${theme == "light" && "bg-muted"} flex items-center cursor-pointer gap-3`}
          >
            <Sun /> Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className={`${theme == "dark" && "bg-muted"} flex items-center cursor-pointer gap-3`}
          >
            <Moon /> Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className={`${theme == "system" && "bg-muted"} flex items-center cursor-pointer gap-3`}
          >
            <Tv2 /> System
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignout} className="flex items-center gap-3 cursor-pointer">
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SettingsMenu userData={userData} />
    </Dialog>
  );
}
