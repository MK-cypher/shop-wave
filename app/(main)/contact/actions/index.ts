"use server";

import createSupabaseServerClient from "@/lib/db/server";

export const submitSupportForm = async (formData: any) => {
  const supabase = createSupabaseServerClient();

  const {error} = await supabase.from("contact").insert([formData]);
  if (error) {
    return JSON.stringify({error: "Something went wrong", description: "Please try again later"});
  }

  return JSON.stringify({
    success: "We have recieved your message",
    description: "'We'll get back to you as soon as possible",
  });
};
