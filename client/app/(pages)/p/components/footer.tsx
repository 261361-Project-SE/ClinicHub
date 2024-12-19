import React from "react";

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer
      className={`bg-gradient-pink opacity-80 text-white py-4 ${className}`}
    >
      <div className="container mx-auto text-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <nav>
          <ul className="flex justify-center space-x-6">
            <li>
              <a
                href="/privacy"
                className="hover:underline transition duration-200"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="hover:underline transition duration-200"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:underline transition duration-200"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
