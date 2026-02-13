"use client";

import Link from "next/link";
import {
   Mail,
   Phone,
   MapPin,
   Facebook,
   Twitter,
   Instagram,
   Linkedin,
} from "lucide-react";
import Image from "next/image";

export default function Footer({
   logo = {
      url: "/",
      src: "https://i.ibb.co.com/GQXpc2Qt/medicare.png",
      alt: "logo",
      title: "MediCare",
   },
}) {
   const currentYear = new Date().getFullYear();

   return (
      <footer className="bg-stone-950 text-gray-300">
         {/* Main Footer Content */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
               {/* Brand Section */}
               <div className="space-y-4">
                  <div className="flex items-center gap-6">
                     {/* Logo */}
                     <a href={logo.url} className="flex items-center gap-2">
                        <Image
                           src={logo.src}
                           className="dark:invert"
                           alt={logo.alt}
                           width={75}
                           height={100}
                        />

                        <span className="text-primary text-[28px] font-bold tracking-tighter">
                           {logo.title}
                        </span>
                     </a>
                  </div>
                  <p className="text-sm text-gray-400">
                     Your trusted online medicine shop providing quality
                     healthcare products at your doorstep.
                  </p>
                  <div className="flex gap-4 pt-2">
                     <a
                        target="_blank"
                        href="https://www.facebook.com"
                        className="hover:text-primary transition"
                     >
                        <Facebook size={20} />
                     </a>
                     <a
                        target="_blank"
                        href="https://x.com"
                        className="hover:text-primary transition"
                     >
                        <Twitter size={20} />
                     </a>
                     <a
                        target="_blank"
                        href="https://www.instagram.com"
                        className="hover:text-primary transition"
                     >
                        <Instagram size={20} />
                     </a>
                     <a
                        target="_blank"
                        href="https://www.linkedin.com"
                        className="hover:text-primary transition"
                     >
                        <Linkedin size={20} />
                     </a>
                  </div>
               </div>

               {/* Quick Links */}
               <div>
                  <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-3">
                     <li>
                        <Link
                           href="/"
                           className="text-gray-400 hover:text-primary transition"
                        >
                           Home
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/products"
                           className="text-gray-400 hover:text-primary transition"
                        >
                           Products
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/about"
                           className="text-gray-400 hover:text-primary transition"
                        >
                           About Us
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/contact"
                           className="text-gray-400 hover:text-primary transition"
                        >
                           Contact
                        </Link>
                     </li>
                  </ul>
               </div>

               {/* Customer Service */}
               <div>
                  <h4 className="text-white font-semibold mb-4">
                     Customer Service
                  </h4>
                  <ul className="space-y-3">
                     <li>
                        <Link
                           href="/faq"
                           className="text-gray-400 hover:text-primary transition"
                        >
                           FAQ
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/privacy"
                           className="text-gray-400 hover:text-primary transition"
                        >
                           Privacy Policy
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/terms"
                           className="text-gray-400 hover:text-primary transition"
                        >
                           Terms & Conditions
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/returns"
                           className="text-gray-400 hover:text-primary transition"
                        >
                           Returns & Refunds
                        </Link>
                     </li>
                  </ul>
               </div>

               {/* Contact Info */}
               <div>
                  <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                  <ul className="space-y-3">
                     <li className="flex items-start gap-3">
                        <Mail
                           size={18}
                           className="text-gray-400 mt-1 shrink-0"
                        />
                        <a
                           href="mailto:info@medicare.com"
                           className="text-gray-400 hover:text-primary transition text-sm"
                        >
                           info@medicare.com
                        </a>
                     </li>
                     <li className="flex items-start gap-3">
                        <Phone
                           size={18}
                           className="text-gray-400 mt-1 shrink-0"
                        />
                        <a
                           href="tel:+8801700000000"
                           className="text-gray-400 hover:text-primary transition text-sm"
                        >
                           +880 1700 000 000
                        </a>
                     </li>
                     <li className="flex items-start gap-3">
                        <MapPin
                           size={18}
                           className="text-gray-400 mt-1 shrink-0"
                        />
                        <span className="text-gray-400 text-sm">
                           123 Health Street, Dhaka, Bangladesh
                        </span>
                     </li>
                  </ul>
               </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-700 my-8" />

            {/* Bottom Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
               <p className="text-gray-400 text-sm">
                  &copy; {currentYear} MediCare. All rights reserved.
               </p>
               <div className="flex gap-6">
                  <Link
                     href="/privacy"
                     className="text-gray-400 hover:text-primary transition text-sm"
                  >
                     Privacy
                  </Link>
                  <Link
                     href="/terms"
                     className="text-gray-400 hover:text-primary transition text-sm"
                  >
                     Terms
                  </Link>
                  <Link
                     href="/sitemap"
                     className="text-gray-400 hover:text-primary transition text-sm"
                  >
                     Sitemap
                  </Link>
               </div>
            </div>
         </div>
      </footer>
   );
}
