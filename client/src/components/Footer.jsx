import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          {/* Copyright + Name */}
          <div className="text-center md:text-left">
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              © {currentYear} <span className="font-semibold">Raid Boukherouba</span>. All rights reserved.
            </p>
          </div>

          {/* Social Links (optional) */}
          <div className="flex justify-center md:justify-end mt-4 md:mt-0 space-x-6">
            <a 
              href="https://github.com/raidboukherouba" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              <FaGithub size={18} />
            </a>
            {/* <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              <FaLinkedin size={18} />
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}