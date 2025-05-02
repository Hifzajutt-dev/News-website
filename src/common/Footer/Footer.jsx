import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 text-white pt-12 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 sm:grid-cols-2 gap-8 text-sm">
        <div>
          <h3 className="text-lg font-bold mb-4">NewsWorld</h3>
          <p className="text-white/90 mb-4">
            Stay updated with the latest in cryptocurrency, blockchain, and
            market trends — all in one place.
          </p>
        </div>

        <div>
          <h4 className="text-base font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:underline">
                Categories
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-base font-semibold mb-3">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link className="hover:underline">Privacy Policy</Link>
            </li>
            <li>
              <Link className="hover:underline">Terms of Service</Link>
            </li>
          </ul>
        </div>
        {/*  */}
        <div>
          <h4 className="text-base font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 mt-2">
            <a className="hover:opacity-80">
              <Facebook size={22} />
            </a>
            <a className="hover:opacity-80">
              <Twitter size={22} />
            </a>
            <a className="hover:opacity-80">
              <Linkedin size={22} />
            </a>
            <a className="hover:opacity-80">
              <Github size={22} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 mt-10 pt-4 text-center text-white/80 text-sm">
        © {new Date().getFullYear()} NewsWorld. All rights reserved.
      </div>
    </footer>
  );
}
