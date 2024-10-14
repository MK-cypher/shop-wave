"use client";
import {signOut} from "@/app/(auth)/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Computer, Heart, LogOut, Moon, Sun, User2Icon as User} from "lucide-react";
import {useTheme} from "next-themes";
import Link from "next/link";
import {toast} from "./ui/use-toast";
import {useRouter} from "next/navigation";
import Image from "next/image";
import ChartNoAxesCombined from "./icons/ChartNoAxesCombined";

export default function AvatarMenu({userData}: {userData: any}) {
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
    <div>
      <div className="z-[100]">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-center items-center">
            <div className="w-10 h-10 flex items-center justify-center">
              {userData.avatar ? (
                <img width={40} height={40} src={userData.avatar} alt="user" className="w-full h-full rounded-full" />
              ) : (
                <div className="rounded-full outline outline-1 ">
                  <User />
                </div>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="border-border z-[100] min-w-40"
            align="end"
            onCloseAutoFocus={(e) => {
              e.preventDefault();
            }}
          >
            {userData.role == "Admin" || userData.role == "Super Admin" ? (
              <DropdownMenuItem asChild className="p-0">
                <Link href={`/dashboard`} className="flex items-center gap-3 p-2 w-full cursor-pointer">
                  <ChartNoAxesCombined />
                  Dashboard
                </Link>
              </DropdownMenuItem>
            ) : (
              <></>
            )}
            <DropdownMenuItem asChild className="p-0">
              <Link href={`/account`} className="flex items-center gap-3 p-2 w-full cursor-pointer">
                <User />
                My Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="p-0">
              <Link href={`/wishlist`} className="flex items-center gap-3 p-2 w-full cursor-pointer">
                <Heart />
                Wishlist
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className={`${theme == "light" ? "active-theme" : ""} flex items-center gap-3 cursor-pointer`}
            >
              <div>
                <Sun />
              </div>
              <div> Light</div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className={`${theme == "dark" ? "active-theme" : ""} flex items-center gap-3 cursor-pointer`}
            >
              <div>
                <Moon />
              </div>
              <div> Dark</div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("system")}
              className={`${theme == "system" ? "active-theme" : ""} flex items-center gap-3 cursor-pointer`}
            >
              <div>
                <Computer />
              </div>
              <div> System</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <button onClick={handleSignout} className="flex items-center gap-3 p-2 w-full cursor-pointer">
                <LogOut />
                Signout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
