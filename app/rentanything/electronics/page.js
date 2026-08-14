// app/rentanything/electronics/page.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { db } from "../../../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

// Bangladesh Data for Filtering
const bdData = {
  Barishal: [
    "Barguna",
    "Barishal",
    "Bhola",
    "Jhalokati",
    "Patuakhali",
    "Pirojpur",
  ],
  Chattogram: [
    "Bandarban",
    "Brahmanbaria",
    "Chandpur",
    "Chattogram",
    "Cumilla",
    "Cox's Bazar",
    "Feni",
    "Khagrachari",
    "Lakshmipur",
    "Noakhali",
    "Rangamati",
  ],
  Dhaka: [
    "Dhaka",
    "Faridpur",
    "Gazipur",
    "Gopalganj",
    "Kishoreganj",
    "Madaripur",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Rajbari",
    "Shariatpur",
    "Tangail",
  ],
  Khulna: [
    "Bagerhat",
    "Chuadanga",
    "Jashore",
    "Jhenaidah",
    "Khulna",
    "Kushtia",
    "Magura",
    "Meherpur",
    "Narail",
    "Satkhira",
  ],
  Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
  Rajshahi: [
    "Bogura",
    "Chapainawabganj",
    "Joypurhat",
    "Naogaon",
    "Natore",
    "Pabna",
    "Rajshahi",
    "Sirajganj",
  ],
  Rangpur: [
    "Dinajpur",
    "Gaibandha",
    "Kurigram",
    "Lalmonirhat",
    "Nilphamari",
    "Panchagarh",
    "Rangpur",
    "Thakurgaon",
  ],
  Sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],
};

// Electronics Categories
const electronicsTypes = [
  "Cameras & Lenses",
  "Laptops & Computers",
  "Gaming Consoles",
  "Drones & Gear",
  "Audio & Speakers",
  "Projectors & Displays",
  "Other Gadgets",
];

export default function ElectronicsRentalPage() {
  const router = useRouter();

  // Feed & Filter State
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filterPostType, setFilterPostType] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterDiv, setFilterDiv] = useState("");
  const [filterDist, setFilterDist] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'provide' or 'ask'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    deviceType: "",
    rentAmount: "",
    rentRate: "Per Day",
    condition: "Good",
    securityDeposit: "",
    division: "",
    district: "",
    localArea: "",
    name: "",
    phone: "",
    whatsapp: "",
    description: "",
  });

  // Fetch Posts from Firestore
  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "electronics_rentals"),
        orderBy("createdAt", "desc"),
      );
      const querySnapshot = await getDocs(q);
      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializeFeed = async () => {
      await fetchPosts();
    };
    initializeFeed();
  }, [fetchPosts]);

  // Handle Form Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "division" && { district: "" }),
    }));
  };

  // Submit Post to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "electronics_rentals"), {
        ...formData,
        postType: modalType, // Saving asking vs providing
        createdAt: serverTimestamp(),
      });

      // Reset form and close modal
      setFormData({
        title: "",
        deviceType: "",
        rentAmount: "",
        rentRate: "Per Day",
        condition: "Good",
        securityDeposit: "",
        division: "",
        district: "",
        localArea: "",
        name: "",
        phone: "",
        whatsapp: "",
        description: "",
      });
      setIsModalOpen(false);
      fetchPosts();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open Modal Helper
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  // Filter Logic
  const filteredPosts = posts.filter((post) => {
    let matchPostType =
      filterPostType === "all" ? true : post.postType === filterPostType;
    let matchType =
      filterType === "all" ? true : post.deviceType === filterType;
    let matchDiv = filterDiv ? post.division === filterDiv : true;
    let matchDist = filterDist ? post.district === filterDist : true;

    return matchPostType && matchType && matchDiv && matchDist;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-28 font-sans text-slate-900">
      {/* Sleek Header (Purple/Indigo Theme for Electronics) */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 shadow-md sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            💻 Electronics Rentals
          </h1>
          <button
            onClick={() => router.push("/rentanything")}
            className="text-purple-100 hover:text-white hover:underline font-medium transition"
          >
            ← Rent Anything
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6">
        {/* Styled Filter Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm mb-8 border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-slate-800 text-lg">
              Search the Market
            </h2>
            {(filterDiv ||
              filterDist ||
              filterType !== "all" ||
              filterPostType !== "all") && (
              <button
                onClick={() => {
                  setFilterPostType("all");
                  setFilterType("all");
                  setFilterDiv("");
                  setFilterDist("");
                }}
                className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-lg hover:bg-purple-100 transition"
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <select
              value={filterPostType}
              onChange={(e) => setFilterPostType(e.target.value)}
              className="border border-slate-200 p-2.5 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-500 outline-none transition font-medium text-slate-700 text-sm"
            >
              <option value="all">🌍 All Posts</option>
              <option value="provide">💻 Providing</option>
              <option value="ask">🙋‍♂️ Seeking</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-slate-200 p-2.5 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-500 outline-none transition font-medium text-slate-700 text-sm"
            >
              <option value="all">🔌 All Gadgets</option>
              {electronicsTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={filterDiv}
              onChange={(e) => {
                setFilterDiv(e.target.value);
                setFilterDist("");
              }}
              className="border border-slate-200 p-2.5 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-500 outline-none transition font-medium text-slate-700 text-sm"
            >
              <option value="">🗺️ Division</option>
              {Object.keys(bdData).map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>

            <select
              value={filterDist}
              onChange={(e) => setFilterDist(e.target.value)}
              disabled={!filterDiv}
              className="border border-slate-200 p-2.5 rounded-xl bg-slate-50 disabled:bg-slate-100 disabled:text-slate-400 focus:ring-2 focus:ring-purple-500 outline-none transition font-medium text-slate-700 text-sm"
            >
              <option value="">📍 District</option>
              {filterDiv &&
                bdData[filterDiv].map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Upgraded Feed Section */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16 text-slate-500 bg-white rounded-2xl shadow-sm border border-slate-100">
              <span className="text-5xl mb-3 block">📸</span>
              <p className="font-medium text-lg">
                No gadgets match your filters.
              </p>
              <p className="text-sm mt-1">
                Try adjusting your filters or post a request!
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className={`bg-white rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
                  post.postType === "ask"
                    ? "border-orange-400 shadow-sm hover:shadow-[0_8px_25px_rgba(249,115,22,0.15)]"
                    : "border-purple-400 shadow-sm hover:shadow-[0_8px_25px_rgba(147,51,234,0.15)]"
                }`}
              >
                <div className="p-5 sm:p-6">
                  {/* Top Row: Type & Rent */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-col gap-2">
                      <span
                        className={`inline-flex items-center w-fit px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                          post.postType === "ask"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {post.postType === "ask"
                          ? "🙋‍♂️ Seeking Device"
                          : "💻 Providing Device"}
                      </span>
                      <span className="text-sm font-bold text-slate-600">
                        {post.deviceType}
                      </span>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-2xl sm:text-3xl font-black tracking-tight ${post.postType === "ask" ? "text-orange-600" : "text-purple-600"}`}
                      >
                        ৳{post.rentAmount}
                      </p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {post.postType === "ask"
                          ? `Budget ${post.rentRate}`
                          : post.rentRate}
                      </p>
                    </div>
                  </div>

                  {/* Title & Location */}
                  <div className="mb-5">
                    <h3 className="font-extrabold text-xl sm:text-2xl text-slate-800 leading-tight mb-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 font-medium flex items-center gap-1.5">
                      📍 {post.localArea}, {post.district}, {post.division}
                    </p>
                  </div>

                  {/* Feature Badges */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                    {post.condition && (
                      <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                        ✨{" "}
                        {post.postType === "ask" ? "Req. Cond:" : "Condition:"}{" "}
                        {post.condition}
                      </div>
                    )}
                    {post.securityDeposit && (
                      <div
                        className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-lg text-sm font-bold ${post.postType === "ask" ? "bg-orange-50 border-orange-200 text-orange-700" : "bg-indigo-50 border-indigo-200 text-indigo-700"}`}
                      >
                        🔒{" "}
                        {post.postType === "ask"
                          ? "Willing to Provide:"
                          : "Required Deposit:"}{" "}
                        {post.securityDeposit}
                      </div>
                    )}
                  </div>

                  {/* Description Box */}
                  {post.description && (
                    <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 mb-6 border border-slate-100">
                      <p className="line-clamp-3">{post.description}</p>
                    </div>
                  )}

                  {/* Contact Actions */}
                  <div className="flex gap-3">
                    <a
                      href={`tel:${post.phone}`}
                      className="flex-1 bg-slate-800 text-white text-center py-3 rounded-xl font-bold hover:bg-slate-900 transition shadow-sm flex justify-center items-center gap-2"
                    >
                      📞 Call
                    </a>
                    <a
                      href={`https://wa.me/${post.whatsapp}`}
                      target="_blank"
                      className={`flex-1 text-white text-center py-3 rounded-xl font-bold transition shadow-sm flex justify-center items-center gap-2 ${post.postType === "ask" ? "bg-orange-500 hover:bg-orange-600" : "bg-purple-500 hover:bg-purple-600"}`}
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Two-Way Buttons */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] z-30">
        <div className="max-w-4xl mx-auto flex gap-4">
          <button
            onClick={() => openModal("provide")}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black py-4 px-2 sm:px-4 rounded-2xl hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-purple-500/30 transition-all transform hover:-translate-y-0.5 text-sm sm:text-base flex justify-center items-center gap-1 sm:gap-2"
          >
            💻 Provide Device
          </button>
          <button
            onClick={() => openModal("ask")}
            className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-black py-4 px-2 sm:px-4 rounded-2xl hover:from-orange-500 hover:to-orange-600 shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 text-sm sm:text-base flex justify-center items-center gap-1 sm:gap-2"
          >
            🙋‍♂️ Need Device
          </button>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-end sm:items-center justify-center sm:p-4 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-2xl shadow-2xl relative overflow-hidden border-t sm:border border-white/20 flex flex-col max-h-[92vh]">
            <div
              className={`p-6 text-white flex-shrink-0 flex justify-between items-center ${modalType === "provide" ? "bg-gradient-to-r from-purple-600 to-indigo-700" : "bg-gradient-to-r from-orange-400 to-orange-500"}`}
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                  {modalType === "provide"
                    ? "💻 List a Device"
                    : "🙋‍♂️ Request a Device"}
                </h2>
                <p className="text-sm opacity-90 mt-1">
                  {modalType === "provide"
                    ? "Rent out your tech, cameras, or gaming gear."
                    : "Post the gadget you need to rent."}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 bg-slate-50"
            >
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
                  📋 Device Info
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Listing Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder={
                      modalType === "provide"
                        ? "e.g. Sony A7III with 50mm Lens"
                        : "e.g. Need a Drone for a Day"
                    }
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition font-medium ${modalType === "provide" ? "focus:ring-purple-500" : "focus:ring-orange-500"}`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      {modalType === "provide" ? "Category" : "Needed Category"}
                    </label>
                    <select
                      name="deviceType"
                      value={formData.deviceType}
                      onChange={handleInputChange}
                      required
                      className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition font-medium ${modalType === "provide" ? "focus:ring-purple-500" : "focus:ring-orange-500"}`}
                    >
                      <option value="">Select Category</option>
                      {electronicsTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      {modalType === "provide"
                        ? "Condition"
                        : "Required Condition"}
                    </label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      required
                      className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition font-medium ${modalType === "provide" ? "focus:ring-purple-500" : "focus:ring-orange-500"}`}
                    >
                      <option value="New">Like New</option>
                      <option value="Good">Good / Working</option>
                      <option value="Fair">Fair / Shows Wear</option>
                    </select>
                  </div>
                </div>

                <div
                  className={`grid grid-cols-2 gap-4 p-4 rounded-xl border ${modalType === "provide" ? "bg-purple-50/50 border-purple-100" : "bg-orange-50/50 border-orange-100"}`}
                >
                  <div>
                    <label
                      className={`block text-xs font-bold uppercase tracking-wider mb-1 ${modalType === "provide" ? "text-purple-700" : "text-orange-700"}`}
                    >
                      {modalType === "provide"
                        ? "Rent Amount (৳)"
                        : "Budget (৳)"}
                    </label>
                    <input
                      type="number"
                      name="rentAmount"
                      placeholder="e.g. 1000"
                      value={formData.rentAmount}
                      onChange={handleInputChange}
                      required
                      className={`w-full border p-3 rounded-xl focus:ring-2 outline-none transition font-bold bg-white ${modalType === "provide" ? "border-purple-200 focus:ring-purple-500 text-purple-700" : "border-orange-200 focus:ring-orange-500 text-orange-700"}`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-xs font-bold uppercase tracking-wider mb-1 ${modalType === "provide" ? "text-purple-700" : "text-orange-700"}`}
                    >
                      Rate
                    </label>
                    <select
                      name="rentRate"
                      value={formData.rentRate}
                      onChange={handleInputChange}
                      required
                      className={`w-full border p-3 rounded-xl focus:ring-2 outline-none transition font-bold bg-white ${modalType === "provide" ? "border-purple-200 focus:ring-purple-500 text-purple-700" : "border-orange-200 focus:ring-orange-500 text-orange-700"}`}
                    >
                      <option value="Per Hour">Per Hour</option>
                      <option value="Per Day">Per Day</option>
                      <option value="Per Week">Per Week</option>
                      <option value="Per Month">Per Month</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {modalType === "provide"
                      ? "Security / Deposit Required"
                      : "Willing to Provide (ID/Deposit)"}
                  </label>
                  <input
                    type="text"
                    name="securityDeposit"
                    placeholder={
                      modalType === "provide"
                        ? "e.g. NID Copy or 5000 tk"
                        : "e.g. Can provide original NID"
                    }
                    value={formData.securityDeposit}
                    onChange={handleInputChange}
                    required
                    className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition font-medium ${modalType === "provide" ? "focus:ring-purple-500" : "focus:ring-orange-500"}`}
                  />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
                  📍 Location
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Division
                    </label>
                    <select
                      name="division"
                      value={formData.division}
                      onChange={handleInputChange}
                      required
                      className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition ${modalType === "provide" ? "focus:ring-purple-500" : "focus:ring-orange-500"}`}
                    >
                      <option value="">Select Division</option>
                      {Object.keys(bdData).map((div) => (
                        <option key={div} value={div}>
                          {div}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      District
                    </label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      required
                      disabled={!formData.division}
                      className={`w-full border border-slate-200 p-3 rounded-xl disabled:bg-slate-100 focus:ring-2 outline-none transition ${modalType === "provide" ? "focus:ring-purple-500" : "focus:ring-orange-500"}`}
                    >
                      <option value="">Select District</option>
                      {formData.division &&
                        bdData[formData.division].map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {modalType === "provide"
                      ? "Specific Area / Pickup Location"
                      : "Your Location"}
                  </label>
                  <input
                    type="text"
                    name="localArea"
                    placeholder="e.g. SUST Gate or Mirpur 10"
                    value={formData.localArea}
                    onChange={handleInputChange}
                    required
                    className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition ${modalType === "provide" ? "focus:ring-purple-500" : "focus:ring-orange-500"}`}
                  />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
                  📞 Contact Info
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition ${modalType === "provide" ? "focus:ring-purple-500" : "focus:ring-orange-500"}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition ${modalType === "provide" ? "focus:ring-purple-500" : "focus:ring-orange-500"}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      required
                      className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition ${modalType === "provide" ? "focus:ring-purple-500" : "focus:ring-orange-500"}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {modalType === "provide"
                      ? "Item Details / Rules"
                      : "Specific Requirements"}
                  </label>
                  <textarea
                    name="description"
                    rows="3"
                    placeholder={
                      modalType === "provide"
                        ? "Mention included accessories, battery life..."
                        : "Mention specific models or dates needed."
                    }
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition resize-none ${modalType === "provide" ? "focus:ring-purple-500" : "focus:ring-orange-500"}`}
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-4 pt-4 mt-2 sticky bottom-0 bg-slate-50 pb-2 shadow-[0_-10px_20px_10px_#f8fafc]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 font-bold py-4 rounded-2xl hover:bg-slate-100 transition shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 text-white font-bold py-4 rounded-2xl transition shadow-lg disabled:opacity-50 ${modalType === "provide" ? "bg-purple-600 hover:bg-purple-700 hover:shadow-purple-600/30" : "bg-orange-500 hover:bg-orange-600 hover:shadow-orange-500/30"}`}
                >
                  {isSubmitting ? "Posting..." : "Publish Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
