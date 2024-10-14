"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useEffect, useRef, useState} from "react";
import {submitSupportForm} from "../actions";
import {toast} from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid Email Address",
  }),
  username: z.string().min(2, {
    message: "username must contain at least 2 characters",
  }),
  subject: z.string().min(2, {
    message: "Please Enter a valid subject",
  }),
  message: z
    .string()
    .min(20, {
      message: "Please be more specific about your issue",
    })
    .max(500, {
      message: "The Message may not be longer than 500 characters",
    }),
});

export default function FormComponent() {
  const textAreaRef = useRef<any>(null);
  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    textAreaRef.current.firstChild.style.height = "auto";
    textAreaRef.current.firstChild.style.height = `${textAreaRef.current.firstChild.scrollHeight + 5}px`;
  }, [messageText]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const {error, success, description} = JSON.parse(await submitSupportForm(values));
    if (error) {
      toast({
        title: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: success,
        variant: "success",
        description: description,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="w-[500px] bg-secondary p-2 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="username"
            render={({field}) => (
              <FormItem>
                <FormLabel className="pl-1 required right">Username</FormLabel>
                <FormControl>
                  <input className="w-full" placeholder="Your Username" {...field} />
                </FormControl>
                <FormMessage className="pl-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel className="pl-1 required right">Email</FormLabel>
                <FormControl>
                  <input className="w-full" placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage className="pl-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({field}) => (
              <FormItem>
                <FormLabel className="pl-1 required right">Subject</FormLabel>
                <FormControl>
                  <input className="w-full" placeholder="Your Subject" {...field} />
                </FormControl>
                <FormMessage className="pl-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({field}) => (
              <FormItem>
                <FormLabel className="pl-1 required right">Message</FormLabel>
                <FormControl>
                  <div ref={textAreaRef}>
                    <textarea
                      onChangeCapture={(e) => {
                        setMessageText(e.currentTarget.value);
                      }}
                      className="min-h-20 max-h-60 resize-none w-full"
                      placeholder="Your Message"
                      {...field}
                    />
                  </div>
                </FormControl>
                <div className="flex items-center justify-between">
                  <FormMessage className={`pl-1 `} />
                  <div
                    className={`pr-1 ml-auto ${
                      messageText.length < 20 || messageText.length > 500 ? "text-destructive" : ""
                    }`}
                  >
                    {messageText.length} / 500
                  </div>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className={`w-full ${isLoading ? "loading" : ""}`}>
            <span></span>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
