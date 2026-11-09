/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
} from "lucide-react";
import { toast } from "sonner";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { useCreateGuestSupportTicketMutation } from "@/redux/api/supportApi";
import { getUser } from "@/services/authServices";

const ContactUs = () => {
  const form = useRef<HTMLFormElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { website } = useWebsiteContent();
  const [createGuestTicket, { isLoading }] =
    useCreateGuestSupportTicketMutation();
  const [ticketNumber, setTicketNumber] = useState("");
  const loggedIn = Boolean(getUser());

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const sendSupportRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = form.current;
    if (!formEl) return;

    const formData = new FormData(formEl);
    const guestName = String(formData.get("name") || "").trim();
    const guestEmail = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const description = String(formData.get("message") || "").trim();

    try {
      const res = await createGuestTicket({
        guestName,
        guestEmail,
        subject: subject || "Website contact request",
        description,
        category: "other",
        priority: "medium",
      }).unwrap();
      formEl.reset();
      setTicketNumber(res?.data?.ticketNumber || "");
      toast.success(
        `Support ticket ${res?.data?.ticketNumber || ""} created`,
        { duration: 4000 },
      );
    } catch (error: unknown) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Could not submit support request",
      );
    }
  };

  return (
    <div className="py-16 px-4 overflow-hidden">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#104042] mb-4">
            {website.contactTitle}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {website.contactSubtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[#104042] mb-2">
                  Open a support request
                </h3>
                <p className="mb-6 text-sm text-slate-500">
                  Messages become tracked support tickets for the EasyBank team.
                  {loggedIn ? (
                    <>
                      {" "}
                      Already signed in? Use{" "}
                      <Link
                        href="/banking/support"
                        className="font-medium text-[#104042] underline"
                      >
                        My Banking → Support
                      </Link>
                      .
                    </>
                  ) : null}
                </p>
                {ticketNumber ? (
                  <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                    Ticket <strong>{ticketNumber}</strong> was created. Our team
                    will follow up by email.
                  </div>
                ) : null}
                <form
                  ref={form}
                  onSubmit={sendSupportRequest}
                  className="space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-1 font-medium text-gray-700"
                      >
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        required
                        minLength={2}
                        className="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-[#104042] focus:ring focus:ring-[#104042]/20 outline-none transition"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-1 font-medium text-gray-700"
                      >
                        Your Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        required
                        className="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-[#104042] focus:ring focus:ring-[#104042]/20 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What do you need help with?"
                      required
                      minLength={3}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-[#104042] focus:ring focus:ring-[#104042]/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Share enough detail for our support team to help quickly."
                      required
                      minLength={10}
                      rows={5}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-[#104042] focus:ring focus:ring-[#104042]/20 outline-none transition resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="cursor-pointer w-full mt-3 bg-[#104042] hover:bg-[#0d353a] text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-md disabled:opacity-60"
                  >
                    {isLoading ? "Submitting..." : "Submit support ticket"}
                  </button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Side - Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-[#104042] mb-2">
                Reach {website.brandName}
              </h3>
              <p className="text-gray-600 mb-8">{website.supportHours}</p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="border-l-4 border-l-[#104042] shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="px-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-[#104042]/10 rounded-lg">
                        <MapPin className="w-5 h-5 text-[#104042]" />
                      </div>
                      <h4 className="font-semibold text-[#104042]">
                        Our Office
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {website.contactAddress}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="border-l-4 border-l-[#104042] shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="px-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-[#104042]/10 rounded-lg">
                        <Mail className="w-5 h-5 text-[#104042]" />
                      </div>
                      <h4 className="font-semibold text-[#104042]">
                        For Consultation
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {website.contactEmail}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="border-l-4 border-l-[#104042] shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="px-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-[#104042]/10 rounded-lg">
                        <Phone className="w-5 h-5 text-[#104042]" />
                      </div>
                      <h4 className="font-semibold text-[#104042]">For Call</h4>
                    </div>
                    <p className="text-gray-600 text-sm">{website.contactPhone}</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="border-l-4 border-l-[#104042] shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="px-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-[#104042]/10 rounded-lg">
                        <Clock className="w-5 h-5 text-[#104042]" />
                      </div>
                      <h4 className="font-semibold text-[#104042]">
                        Work Hours
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {website.supportHours}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Social Media */}
            <motion.div variants={itemVariants} className="pt-6">
              <h4 className="font-semibold text-[#104042] mb-4">
                Social Media -
              </h4>
              <div className="flex gap-4">
                {[
                  { icon: Facebook, color: "#1877F2" },
                  { icon: Twitter, color: "#1DA1F2" },
                  { icon: Linkedin, color: "#0A66C2" },
                  { icon: Youtube, color: "#FF0000" },
                  { icon: Instagram, color: "#E4405F" },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer"
                  >
                    <div className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                      <social.icon
                        className="w-5 h-5"
                        style={{ color: social.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
