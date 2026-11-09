"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateSupportTicketMutation } from "@/redux/api/supportApi";
import {
  SUPPORT_CATEGORIES,
  SUPPORT_PRIORITIES,
} from "@/components/support/supportHelpers";

const CreateTicketForm = ({ onCreated }: { onCreated?: (id: string) => void }) => {
  const [createTicket, { isLoading }] = useCreateSupportTicketMutation();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("account");
  const [priority, setPriority] = useState("medium");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createTicket({
        subject,
        description,
        category,
        priority,
      }).unwrap();
      toast.success(`Ticket ${res?.data?.ticketNumber || ""} created`);
      setSubject("");
      setDescription("");
      setCategory("account");
      setPriority("medium");
      if (res?.data?._id) onCreated?.(res.data._id);
    } catch (error: unknown) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "Could not create ticket";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-[#104042]">Open a support ticket</h2>
        <p className="text-sm text-slate-500">
          Our team tracks every request with a ticket number and reply thread.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Short summary of the issue"
          required
          minLength={3}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
          >
            {SUPPORT_CATEGORIES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="priority">Priority</Label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
          >
            {SUPPORT_PRIORITIES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Details</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Include account/reference details and what you already tried."
          rows={5}
          required
          minLength={10}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="bg-[#104042] text-white hover:bg-[#0c3334]"
      >
        {isLoading ? "Submitting..." : "Submit ticket"}
      </Button>
    </form>
  );
};

export default CreateTicketForm;
