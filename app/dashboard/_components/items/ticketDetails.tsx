import {DialogContent, DialogTitle} from "@/components/ui/dialog";
import React from "react";

export default function TicketDetails({data}: {data: any}) {
  return (
    <div>
      <DialogContent aria-describedby={undefined} className="">
        <DialogTitle></DialogTitle>
        <div>{data.subject}</div>
        <div>{data.message}</div>
      </DialogContent>
    </div>
  );
}
