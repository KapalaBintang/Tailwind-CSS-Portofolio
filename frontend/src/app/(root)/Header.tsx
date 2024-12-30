"use client";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-transparent absolute top-0 left-0 w-full flex items-center z-10 lg:px-20">
      <div className="w-full">
        <div className="flex items-center justify-between relative">
          <div className="px-4">
            <a href="#home" className="text-lg font-bold text-primary block py-5 lg:text-2xl">
              Kapala Bintang
            </a>
          </div>
          <div className="flex px-4 items-center">
            {/* Hamburger Menu Button */}
            <button id="hamburger" onClick={toggleMenu} className="block absolute right-4 lg:hidden">
              <span className="hamburger-line block h-1 w-8 bg-black transition duration-300 origin-top-left ease-in-out"></span>
              <span className="hamburger-line block h-1 w-8 bg-black my-1 transition duration-300 ease-in-out"></span>
              <span className="hamburger-line block h-1 w-8 bg-black transition duration-300 origin-bottom-left ease-in-out"></span>
            </button>

            {/* Navigation */}
            <nav
              id="hamburger-list"
              className={`${isMenuOpen ? "block" : "hidden"} absolute py-3 max-w-[250px] w-full bg-white rounded-lg right-4 top-full shadow-md lg:block lg:static lg:max-w-full lg:bg-transparent lg:rounded-none lg:shadow-none`}
            >
              <ul className="block lg:flex lg:gap-4">
                <li className="group">
                  <a href="#home" className="px-4 py-2 font-semibold text-secondary group-hover:text-primary flex lg:text-lg">
                    Home
                  </a>
                </li>
                <li className="group">
                  <a href="#about" className="px-4 py-2 font-semibold text-secondary group-hover:text-primary flex lg:text-lg">
                    About
                  </a>
                </li>
                <li className="group">
                  <a href="#portofolio" className="px-4 py-2 font-semibold text-secondary group-hover:text-primary flex lg:text-lg">
                    Portofolio
                  </a>
                </li>
                <li className="group">
                  <a href="#learningSources" className="px-4 py-2 font-semibold text-secondary group-hover:text-primary flex lg:text-lg">
                    Learning Sources
                  </a>
                </li>
                <li className="group">
                  <a href="#contact" className="px-4 py-2 font-semibold text-secondary group-hover:text-primary flex lg:text-lg">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
