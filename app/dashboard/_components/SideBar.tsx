"use client";

import {useUser} from "@/context/userContext";
import {sideBar} from "@/lib/consts";
import {LogOut} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";

export default function Aside({userData}: {userData: any}) {
  const [navState, setNavState] = useState(false);
  const pathname = usePathname();
  const asideRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  let startX = 0;
  let startY = 0;
  const handleOuterClick = (e: any) => {
    if (asideRef.current) {
      if (!asideRef.current.contains(e.target)) {
        setNavState(false);
        localStorage.setItem("nav-state", "closed");
      }
    }
  };
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setNavState(false);
      localStorage.setItem("nav-state", "closed");
    }
  };
  const checkWidthForClick = () => {
    const links = asideRef.current?.querySelectorAll("a");
    if (window.innerWidth <= 768) {
      document.addEventListener("click", handleOuterClick);
      links?.forEach((link) => {
        link.addEventListener("click", handleLinkClick);
      });
    } else {
      document.removeEventListener("click", handleOuterClick);
      links?.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
    }
  };

  const startTouch = (e: any) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  };

  const swipe = (e: any) => {
    if (window.innerWidth <= 768 && Math.abs(startY - e.touches[0].clientY) < 10) {
      if (startX - e.touches[0].clientX >= 60) {
        setNavState(false);
        localStorage.setItem("nav-state", "closed");
      } else if (e.touches[0].clientX - startX >= 60 && startX < 40) {
        setNavState(true);
        localStorage.setItem("nav-state", "open");
      }
    }
  };

  useEffect(() => {
    const savedNavState = localStorage.getItem("nav-state");
    if (savedNavState) {
      setNavState(savedNavState !== "closed");
    } else {
      setNavState(true);
      localStorage.setItem("nav-state", "open");
    }
    setReady(true);
    window.addEventListener("resize", checkWidthForClick);
    document.addEventListener("touchmove", swipe);
    document.addEventListener("touchstart", startTouch);

    return () => {
      document.removeEventListener("click", handleOuterClick);
      const links = asideRef.current?.querySelectorAll("a");
      links?.forEach((link) => link.removeEventListener("click", handleLinkClick));
      window.removeEventListener("resize", checkWidthForClick);
      document.removeEventListener("touchmove", swipe);
      document.removeEventListener("touchstart", startTouch);
    };
  }, []);

  useEffect(() => {
    const links = asideRef.current?.querySelectorAll("a");
    checkWidthForClick();

    window.addEventListener("resize", checkWidthForClick);
    return () => {
      document.removeEventListener("click", handleOuterClick);
      const links = asideRef.current?.querySelectorAll("a");
      links?.forEach((link) => link.removeEventListener("click", handleLinkClick));
      window.removeEventListener("resize", checkWidthForClick);
    };
  }, [ready]);

  return (
    <>
      {ready && (
        <aside
          ref={asideRef}
          className={`${navState ? "opened" : "closed"} text-foreground bg-background/85 backdrop-blur-lg`}
        >
          <button
            className={`${
              navState ? "max-md:hidden max-[215px]:flex" : "closed"
            } aside-btn space-y-1.5 p-2 transition-all duration-300 hover:bg-secondary rounded-full aspect-square flex flex-col justify-center`}
            onClick={() => {
              if (navState) {
                localStorage.setItem("nav-state", "closed");
              } else {
                localStorage.setItem("nav-state", "open");
              }

              setNavState(!navState);
            }}
          >
            <div
              className={`${
                navState ? "rotate-45 translate-y-[2px]" : ""
              } w-5 h-[1px] bg-foreground transition-all duration-300`}
            ></div>
            <div className={`${navState ? "hidden" : ""} w-5 h-[1px] bg-foreground transition-all duration-300`}></div>
            <div
              className={`${
                navState ? "-rotate-45 -translate-y-[5px]" : ""
              } w-5 h-[1px] bg-foreground transition-all duration-300`}
            ></div>
          </button>
          <div className="flex flex-col justify-between  h-svh">
            <div className="mt-3">
              <Link href="/" className="logo">
                <div className="">
                  <img src="/logo.png" alt="logo" className="w-[80px] h-[80px] mx-auto object-cover" />
                </div>
                {/* {navState ? <div>SHOP WAVE</div> : <div></div>} */}
              </Link>
              <div className="aside-links">
                {sideBar.map((item, i) => {
                  return (
                    <Link
                      key={i}
                      className={` ${
                        pathname == item.href ? "active" : ""
                      } flex items-center gap-2 transition-all duration-300 hover:bg-primary/70 rounded-lg`}
                      href={item.href}
                      title={item.link}
                    >
                      {item.img ? <img src={item.img} alt="" className="h-[24px]" /> : <item.Icon />}

                      {navState && item.link}
                    </Link>
                  );
                })}
              </div>
            </div>
            <button className="mb-28 flex justify-center items-center gap-3 transition-all duration-300 hover:bg-primary p-3 w-fit rounded-lg mx-auto">
              {navState && <div>Log out</div>} <LogOut />
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
