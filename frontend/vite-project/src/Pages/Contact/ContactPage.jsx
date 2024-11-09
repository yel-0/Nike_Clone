import React, { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();

  const nameRef = useRef();
  const emailRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message sent successfully",
      description:
        "Thank you for reaching out! We will get back to you shortly.",
    });

    // Clear input fields
    nameRef.current.value = "";
    emailRef.current.value = "";
    subjectRef.current.value = "";
    messageRef.current.value = "";
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6 md:mb-8">
        Contact Us
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Have questions or feedback? We’d love to hear from you. Fill out the
        form below, and we’ll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="w-full">
            <label htmlFor="name" className="block text-gray-700 text-sm mb-1">
              Name
            </label>
            <Input
              ref={nameRef}
              type="text"
              id="name"
              placeholder="Your Name"
              className="rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="w-full mt-4 md:mt-0">
            <label htmlFor="email" className="block text-gray-700 text-sm mb-1">
              Email
            </label>
            <Input
              ref={emailRef}
              type="email"
              id="email"
              placeholder="Your Email"
              className="rounded-md w-full py-2 px-3"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-gray-700 text-sm mb-1">
            Subject
          </label>
          <Input
            ref={subjectRef}
            type="text"
            id="subject"
            placeholder="Subject"
            className="rounded-md w-full py-2 px-3"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-700 text-sm mb-1">
            Message
          </label>
          <Textarea
            ref={messageRef}
            id="message"
            placeholder="Your Message"
            className="rounded-md w-full py-2 px-3 outline-none focus:border-black focus:ring-1 focus:ring-black"
            required
            rows={6}
          />
        </div>

        <Button
          type="submit"
          className="py-2 px-4 rounded-full transition duration-200"
        >
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default ContactPage;
