import {User} from "lucide-react";
import React from "react";
import Image from "next/image";

export default function RecentUsers({recentUsers}: {recentUsers: any[]}) {
  return (
    <div className="w-[250px] lg:w-[350px] shrink-0 max-xmd:w-full">
      <div className="font-bold mb-3 text-xl">Recent Users</div>
      <div className="rounded-lg bg-secondary p-3 w-full space-y-5">
        {recentUsers.length > 0 ? (
          recentUsers.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-popover shrink-0">
              {item.avatar ? (
                <img src={item.avatar} alt="user" className="w-10 h-10 object-cover block rounded-full shrink-0" />
              ) : (
                <>
                  <User className="w-10 h-10 rounded-full outline outline-1" />
                </>
              )}
              <div>
                <div className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{item.username}</div>
                <div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[160px] lg:max-w-[300px] max-xmd:w-full">
                  {item.email}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>nothing here</div>
        )}
      </div>
    </div>
  );
}
