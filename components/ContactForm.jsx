import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const form = useRef();
  console.log("SERVICE ID here: ", process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
  console.log(
    "TEMPLATE ID here: ",
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  );
  console.log("PUBLIC KEY here: ", process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          console.log("SUCCESS!");
          document.getElementById("ContactMeForm").reset();
          toast({
            title: "Success",
            description: "Your message has been sent.",
          });
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast({
            title: "Error",
            description: "Message not sent",
          });
        }
      );
  };
  return (
    <>
      <form
        ref={form}
        id="ContactMeForm"
        onSubmit={sendEmail}
        className="flex flex-col gap-6 p-10 bg-secondary border-2 dark:border-none border-light dark:bg-[#27272c] rounded-xl"
      >
        <h3 className="text-4xl text-light dark:text-accent">
          Let&apos;s connect
        </h3>
        <p className="text-primary dark:text-white/60">
          Feel free to reach out for collaborations, inquiries, or just to say
          hello!
        </p>
        {/* input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            type="firstame"
            required
            placeholder="Firstname"
            name="first_name"
          />
          <Input type="lastname" placeholder="Lastname" name="last_name" />
          <Input
            type="email"
            required
            placeholder="Email address"
            name="email"
          />
          <Input type="phone" placeholder="Phone number" name="phone" />
        </div>

        {/* select */}
        {/* <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service"></SelectValue>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select a service</SelectLabel>
                      <SelectItem value="est">Web Dev</SelectItem>
                      <SelectItem value="cst">Frontend</SelectItem>
                      <SelectItem value="mst">Backend</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </SelectTrigger>
              </Select> */}

        {/* textarea */}
        <Textarea
          className="h-[200px]"
          required
          placeholder="Type your message here"
          name="message"
        />
        {/* button */}
        <Button type="submit" size="md" className="max-w-40">
          Send Message
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
