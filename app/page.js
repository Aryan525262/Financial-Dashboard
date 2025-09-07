"use client";
import { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("7d");
  const [data, setData] = useState(null);
  const pdfRef = useRef();

  // Simulate fetch from API
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData({
        aum: 12.19,
        sip: 1.39,
        momAum: +0.77,
        momSip: 0,
        purchases: 0,
        redemeptions: 0,
        rejTransactions: 0,
        sipRejections: 0,
        newSip: 0,
        clients: [
          { name: "Active", value: 2824 },
          { name: "Dormant", value: 541 },
          { name: "New", value: 100 },
          { name: "Others", value: 60 },
        ],
        sipBusiness: [
          { month: "Jan", bar: 40, line: 20 },
          { month: "Feb", bar: 60, line: 30 },
          { month: "Mar", bar: 80, line: 50 },
          { month: "Apr", bar: 20, line: 10 },
        ],
        monthlyMis: [
          { month: "Jan", A: 40, B: 24, C: 20 },
          { month: "Feb", A: 30, B: 13, C: 22 },
          { month: "Mar", A: 20, B: 98, C: 29 },
          { month: "Apr", A: 27, B: 39, C: 40 },
        ],
      });
      setLoading(false);
    }, 800);
  }, [range]);

  const COLORS = ["#0088FE", "#FF8042", "#FFBB28", "#FF0000"];

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
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

        {/* Dashboard */}
        <div ref={pdfRef} className="p-6 space-y-6">
          {/* AUM Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
              <div className="Header flex flex-row justify-between items-center content-center">
                <p className="text-sm">Current</p>
                <button className="items-center text-red-700 border border-red-600 py-2 px-6 gap-2 rounded inline-flex h-8 w-32">
                  <span className="text-sm"> View Report</span>
                </button>
              </div>
              <h2 className="text-lg font-semibold">
                AUM <span>{data ? data.aum : <p>Loading....</p>}</span> Cr
              </h2>
              <div className="flex flex-row justify-between items-center">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <p>
                    <span className="text-green-500">+{data.momAum}% MoM</span>
                  </p>
                )}
                <button className="inline-flex justify-end items-center w-80 px-4 py-2 text-sm font-medium text-green-600 bg-gray-800  focus:outline-none focus:bg-gray-700">
                  View Trend
                  <svg
                    className="w-4 h-4 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                  </svg>
                </button>
              </div>
            </div>
            {/*SIP Card */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
              <div className="Header flex flex-row justify-between items-center content-center">
                <p className="text-sm">Current</p>
                <button className="items-center text-red-700 border border-red-600 py-2 px-6 gap-2 rounded inline-flex h-8 w-32">
                  <span className="text-sm"> View Report</span>
                </button>
              </div>
              <h2 className="text-lg font-semibold">
                SIP <span>{data ? data.sip : <p>Loading....</p>}</span> Lakh
              </h2>
              <div className="flex flex-row justify-between items-center">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <p>
                    <span className="text-green-500">+{data.momSip}% MoM</span>
                  </p>
                )}
                <button className="inline-flex justify-end items-center w-80 px-4 py-2 text-sm font-medium text-green-600 bg-gray-800  focus:outline-none focus:bg-gray-700">
                  View Trend
                  <svg
                    className="w-4 h-4 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="p-4 bg-gray-800 rounded-lg shadow">
            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              <button className="px-4 py-1 bg-red-500 text-white rounded text-sm">
                3 Days
              </button>
              <button className="px-4 py-1 border border-gray-300 rounded text-sm">
                7 Days
              </button>
              <button className="px-4 py-1 border border-gray-300 rounded text-sm">
                10 Days
              </button>
              <button className="px-4 py-1 border border-gray-300 rounded text-sm">
                30 Days
              </button>
            </div>

            {/* Cards Row */}
            <div className="flex flex-wrap border justify-evenly rounded-lg  divide-gray-200">
              {/* Purchases */}
              <div className="flex flex-col items-center content-center justify-center p-4 w-50">
                <i className="fa-solid fa-hand-holding text-red-500 text-2xl mb-2"></i>
                <p className="font-semibold">
                  {data ? data.purchases : 0} Purchases
                </p>
                <p className="text-gray-500 text-sm">0.00 INR</p>
              </div>

              {/* Redemptions */}
              <div className="flex flex-col items-center justify-center p-4 w-50">
                <i className="fa-solid fa-box text-red-500 text-2xl mb-2"></i>
                <p className="font-semibold">
                  {data ? data.redemptions : 0} Redemptions
                </p>
                <p className="text-gray-500 text-sm">0.00 INR</p>
              </div>

              {/* Rej. Transactions */}
              <div className="flex flex-col items-center justify-center p-4 w-50">
                <i className="fa-regular fa-rectangle-xmark text-red-500 text-2xl mb-2"></i>
                <p className="font-semibold">
                  {data ? data.rejTransactions : 0} Rej. Transactions
                </p>
                <p className="text-gray-500 text-sm">0.00 INR</p>
              </div>

              {/* SIP Rejections */}
              <div className="flex flex-col items-center justify-center p-4 w-50">
                <i className="fa-solid fa-hand-holding-dollar text-red-500 text-2xl mb-2"></i>
                <p className="font-semibold">
                  {data ? data.sipRejections : 0} SIP Rejections
                </p>
                <p className="text-gray-500 text-sm">0.00 INR</p>
              </div>

              {/* New SIP */}
              <div className="flex flex-col items-center justify-center p-4 w-50">
                <i className="fa-solid fa-chart-line text-red-500 text-2xl mb-2"></i>
                <p className="font-semibold">
                  {data ? data.newSip : 0} New SIP
                </p>
                <p className="text-gray-500 text-sm">0.00 INR</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 flex-row w-auto flex-wrap justify-evenly">
            {/* Clients Pie Chart */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-auto">
              <div className="header_bar inline-flex justify-between w-full mb-4">
                <h2 className="mb-3 font-semibold">CLIENTS</h2>
                <button className="items-center text-red-700 border border-red-600 py-2 px-6 gap-2 rounded inline-flex h-8">
                  <i className="fa-solid fa-cloud-arrow-down"></i>
                  <span className="text-sm">Download Report</span>
                </button>
              </div>

              <div className="flex items-center justify-center">
                {!loading && (
                  <div className="relative h-52 w-52 ">
                    {/* Circle 1 */}
                    <div className="absolute top-12 left-12 w-32 h-32 bg-[rgba(238,14,48,0.7)] flex items-center justify-center rounded-full">
                      3824
                    </div>

                    {/* Circle 2 */}
                    <div className="absolute top-6 left-20 w-16 h-16 bg-[rgba(241,231,41,0.7)] flex items-center justify-center rounded-full">
                      60
                    </div>

                    {/* Circle 3 */}
                    <div className="absolute top-36 left-34 w-10 h-10 bg-[rgba(76,133,10,0.7)] flex items-center justify-center rounded-full">
                      2
                    </div>

                    {/* Circle 4 */}
                    <div className="absolute top-24 left-2 w-24 h-24 bg-[rgba(244,42,2,0.7)] flex items-center justify-center rounded-full">
                      541
                    </div>
                  </div>
                )}
              </div>
              {/* Legend */}
              <div className="mt-6 flex flex-row justify-center items-center">
                <div className="flex items-center mx-1">
                  <div className="w-4 h-4 rounded-full bg-[rgba(241,231,41,0.7)]"></div>
                  <span>Online</span>
                </div>
                <div className="flex items-center mx-1">
                  <div className="w-4 h-4 rounded-full bg-[rgba(76,133,10,0.7)]"></div>
                  <span>New</span>
                </div>
                <div className="flex items-center mx-1">
                  <div className="w-4 h-4 rounded-full bg-[rgba(238,14,48,0.7)]"></div>
                  <span>Active</span>
                </div>
                <div className="flex items-center mx-1">
                  <div className="w-4 h-4 rounded-full bg-[rgba(244,42,2,0.7)]"></div>
                  <span>InActive</span>
                </div>
              </div>
            </div>

            {/* SIP Business */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-auto">
              <div className="header_bar inline-flex justify-between w-full mb-4">
                <h2 className="mb-3 font-semibold">SIP BUSINESS CHART</h2>
                <button className="items-center text-red-700 border border-red-600 py-2 px-6 gap-2 rounded inline-flex h-8">
                  <span className="text-sm">View Report</span>
                </button>
              </div>
              {!loading && (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={data.sipBusiness}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="bar" fill="#8884d8" />
                    <Line type="monotone" dataKey="line" stroke="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Monthly MIS */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-auto">
              <div className="header_bar inline-flex justify-between w-full mb-4">
                <h2 className="mb-3 font-semibold">MONTHLY MIS</h2>
                <button className="items-center text-red-700 border border-red-600 py-2 px-6 gap-2 rounded inline-flex h-8">
                  <span className="text-sm">View Report</span>
                </button>
              </div>
              <div className="flex justify-center items-center">
                {!loading && (
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data.monthlyMis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="A" stroke="#8884d8" />
                      <Line type="monotone" dataKey="B" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="C" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
