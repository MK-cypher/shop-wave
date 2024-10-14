import ChangePassword from "@/components/tabs/changePassword";
import ProfileUpdate from "@/components/tabs/ProfileUpdate";
import {DialogContent, DialogTitle} from "@/components/ui/dialog";
import React from "react";

export default function SettingsMenu({userData}: {userData: any}) {
  return (
    <DialogContent
      aria-describedby={undefined}
      className=" settings-model max-h-[90%] lg:max-w-[1000px] max-w-none w-[95%] md:w-[80%] md:px-2 max-md:px-3 block overflow-auto"
    >
      <DialogTitle className="hidden"></DialogTitle>
      <ProfileUpdate userData={userData} />
      <ChangePassword userData={userData} />
    </DialogContent>
  );
}
