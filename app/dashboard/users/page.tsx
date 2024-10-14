import React from "react";
import DashboardNav from "../_components/DashboardNav";
import {UsersTable} from "../_components/items/UsersTable";
import {getAllUsers} from "@/actions/users";

export default async function page() {
  const users = JSON.parse(await getAllUsers());
  return (
    <main>
      <DashboardNav title="Users" />
      <UsersTable initialData={users} />
    </main>
  );
}
