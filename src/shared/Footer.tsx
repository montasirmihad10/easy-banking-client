"use client";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Shield,
  Lock,
  Award,
  ArrowRight,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Features", href: "/features" },
      { name: "Contact", href: "/contact" },
    ],
    services: [
      { name: "Home", href: "/" },
      { name: "Features", href: "/features" },
      { name: "My Banking", href: "/banking" },
    ],
    support: [
      { name: "Contact / Support", href: "/contact" },
      { name: "My Banking Support", href: "/banking/support" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "About", href: "/about" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "#1877F2" },
    { name: "Twitter", icon: Twitter, href: "#", color: "#1DA1F2" },
    { name: "Instagram", icon: Instagram, href: "#", color: "#E4405F" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "#0A66C2" },
  ];

  const containerVariants : Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <motion.div
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Logo and Company Info */}
            <motion.div className="lg:col-span-1" variants={itemVariants}>
              <div className="mb-6">
                <Link href="/" className="inline-block">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "white" }}
                    >
                      {/* Logo placeholder - user will add their logo */}
                      <Image
                        src="https://i.ibb.co/wZ0721GL/be-eb-b-e-abstract-260nw-2385258941-removebg-preview.png"
                        alt="EasyBank"
                        className="w-8 h-8 object-contain"
                        width={200}
                        height={200}
                      />
                    </div>
                    <span className="text-2xl font-bold">EasyBank</span>
                  </div>
                </Link>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Your trusted financial partner providing secure, innovative
                banking solutions for individuals and businesses worldwide.
              </p>

              {/* Trust Badges */}
              <div className="flex items-center space-x-4 mb-6">
                <motion.div
                  className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Shield className="w-4 h-4" style={{ color: "#104042" }} />
                  <span className="text-xs font-medium">FDIC Insured</span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Lock className="w-4 h-4" style={{ color: "#104042" }} />
                  <span className="text-xs font-medium">Stripe Secured</span>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon
                      className="w-5 h-5"
                      style={{ color: social.color }}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Navigation Links */}
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Navigation */}
                <div>
                  <h3
                    className="text-lg font-semibold mb-4"
                    style={{ color: "white" }}
                  >
                    Navigation
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/"
                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                      >
                        <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/features"
                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                      >
                        <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        Features
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                      >
                        <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Company Links */}
                <div>
                  <h3
                    className="text-lg font-semibold mb-4"
                    style={{ color: "white" }}
                  >
                    Company
                  </h3>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                        >
                          <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services Links */}
                <div>
                  <h3
                    className="text-lg font-semibold mb-4"
                    style={{ color: "white" }}
                  >
                    Services
                  </h3>
                  <ul className="space-y-3">
                    {footerLinks.services.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                        >
                          <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Contact & Newsletter */}
            <motion.div className="lg:col-span-1" variants={itemVariants}>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "white" }}
              >
                Get In Touch
              </h3>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#104042" }}
                  >
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300 text-sm">
                    +1 (555) 123-4567
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#104042" }}
                  >
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300 text-sm">
                    support@easybank.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#104042" }}
                  >
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300 text-sm">
                    123 Banking St, Finance City
                  </span>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div>
                <h4 className="text-sm font-semibold mb-3">Stay Updated</h4>
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#104042] flex-1"
                  />
                  <Button
                    size="sm"
                    className="text-white px-3"
                    style={{ backgroundColor: "#104042" }}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Subscribe to get updates on new features and offers.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-700"
          variants={itemVariants}
        >
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <p className="text-gray-400 text-sm">
                  © {currentYear} EasyBank. All rights reserved.
                </p>
                <div className="flex items-center space-x-4">
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="/cookies"
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                  >
                    Cookie Policy
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" style={{ color: "#104042" }} />
                <span className="text-sm text-gray-400">
                  Trusted by 1M+ customers
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
