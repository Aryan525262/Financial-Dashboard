"use client";

import { useRef, useState } from "react";
import { FaSearch, FaBell, FaUser, FaStar, FaLock } from "react-icons/fa";
import { FaRegLightbulb, FaCog, FaGraduationCap, FaSignOutAlt } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const pdfRef = useRef();
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("dashboard.pdf");
    });
  };
  return (
    <header className="shadow">
      {/* Top Navbar */}
      <div className="bg-white flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Wealth Elite" className="h-10" />
        </div>

        {/* Search Bar */}
        <div className="flex-1 px-6">
          <div className="relative">
            <input
              type="text"
              placeholder="ex. Live portfolio"
              className="w-full border rounded-full pl-4 pr-10 py-2 text-sm text-black"
            />
            <FaSearch className="absolute right-3 top-2.5 text-black" />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-gray-600 text-lg">
          <FaRegLightbulb />
          <FaCog />
          <FaBell />
          <FaStar />
          <FaUser />
          <FaLock />
          <FaGraduationCap />
          {/* Logout */}
          <button className="flex items-center gap-1 text-sm font-semibold text-gray-700">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Bottom Navbar (Red Menu Bar) */}
      <nav className="bg-red-600 text-white font-semibold text-sm">
        <ul className="flex items-center gap-6 px-6 py-2">
          <li className="hover:underline cursor-pointer">HOME</li>
          <li className="hover:underline cursor-pointer">CRM</li>
          <li className="hover:underline cursor-pointer">UTILITIES</li>
          <li className="hover:underline cursor-pointer">INSURANCE</li>
          <li className="hover:underline cursor-pointer">ASSETS</li>
          <li className="hover:underline cursor-pointer">MUTUAL</li>
          <li className="hover:underline cursor-pointer">RESEARCH</li>
          <li className="hover:underline cursor-pointer">TRANSACT ONLINE</li>
          <li className="hover:underline cursor-pointer">GOAL GPS</li>
          <li className="hover:underline cursor-pointer">FINANCIAL PLANNING</li>
          <li className="hover:underline cursor-pointer">WEALTH REPORT</li>
          <li className="hover:underline cursor-pointer">OTHER</li>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 bg-gray-700 rounded"
            >
              {darkMode ? "Light" : "Dark"}
            </button>
            <button
              onClick={downloadPDF}
              className="px-3 py-1 bg-[rgb(55,65,81)] rounded"
            >
              Download PDF
            </button>
          </div>
        </ul>
      </nav>
    </header>
  );
}
