// app/travel/page.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

// Bangladesh Data for Filtering
const bdData = {
  Barishal: ["Barguna", "Barishal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
  Chattogram: ["Bandarban", "Brahmanbaria", "Chandpur", "Chattogram", "Cumilla", "Cox's Bazar", "Feni", "Khagrachari", "Lakshmipur", "Noakhali", "Rangamati"],
  Dhaka: ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"],
  Khulna: ["Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
  Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
  Rajshahi: ["Bogura", "Chapainawabganj", "Joypurhat", "Naogaon", "Natore", "Pabna", "Rajshahi", "Sirajganj"],
  Rangpur: ["Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"],
  Sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"]
};

export default function TravelPage() {
  const router = useRouter();
  
  // Feed & Filter State
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [filterType, setFilterType] = useState("all"); 
  const [filterDiv, setFilterDiv] = useState("");
  const [filterDist, setFilterDist] = useState("");
  const [filterDate, setFilterDate] = useState(""); // NEW
  const [filterTime, setFilterTime] = useState(""); // NEW

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    vehicleType: "",
    seats: "",
    fromArea: "",
    toArea: "",
    fare: "",
    division: "",
    district: "",
    travelDate: "",
    travelTime: "",
  });

  // Fetch Posts from Firestore
  const fetchPosts = useCallback(async () => {
    setIsLoading(true); 
    try {
      const q = query(collection(db, "travel_posts"), orderBy("createdAt", "desc"));
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

  // Run it once when the page loads safely
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
      ...(name === "division" && { district: "" }) 
    }));
  };

  // Submit Post to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "travel_posts"), {
        ...formData,
        postType: modalType, 
        createdAt: serverTimestamp(),
      });
      
      // Reset form and close modal
      setFormData({ name: "", phone: "", whatsapp: "", vehicleType: "", seats: "", fromArea: "", toArea: "", fare: "", division: "", district: "", travelDate: "", travelTime: "" });
      setIsModalOpen(false);
      
      // Refresh feed 
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

  // Filter Logic (Now includes Date and Time)
  const filteredPosts = posts.filter((post) => {
    let matchType = true;
    if (filterType === "provide") matchType = post.postType === "provide";
    if (filterType === "ask") matchType = post.postType === "ask";

    let matchDiv = filterDiv ? post.division === filterDiv : true;
    let matchDist = filterDist ? post.district === filterDist : true;
    
    // Date and time exact match if selected
    let matchDate = filterDate ? post.travelDate === filterDate : true;
    let matchTime = filterTime ? post.travelTime === filterTime : true;

    return matchType && matchDiv && matchDist && matchDate && matchTime;
  });

  // Helper to format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "Any Date";
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Helper to format time nicely
  const formatTime = (timeString) => {
    if (!timeString) return "Any Time";
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-28 font-sans text-gray-900">
      
      {/* Upgraded Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 shadow-md sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Travel Connect</h1>
          <button onClick={() => router.push("/servicecategory")} className="text-blue-100 hover:text-white hover:underline font-medium transition">
            ← Categories
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-6">
        
        {/* Styled Filter Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm mb-8 border border-slate-100">
          <div className="flex justify-between items-center mb-4">
             <h2 className="font-bold text-slate-800 text-lg">Search & Filter Rides</h2>
             {/* Clear Filters Button */}
             {(filterDiv || filterDate || filterTime || filterType !== 'all') && (
               <button 
                 onClick={() => { setFilterType("all"); setFilterDiv(""); setFilterDist(""); setFilterDate(""); setFilterTime(""); }}
                 className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md hover:bg-indigo-100"
               >
                 Clear Filters
               </button>
             )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="col-span-2 md:col-span-1 border border-slate-200 p-2.5 rounded-xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium text-slate-700 text-sm"
            >
              <option value="all">🌍 All Posts</option>
              <option value="provide">🚗 Provide Ride</option>
              <option value="ask">🙋‍♂️ Ask for Ride</option>
            </select>

            <select
              value={filterDiv}
              onChange={(e) => { setFilterDiv(e.target.value); setFilterDist(""); }}
              className="border border-slate-200 p-2.5 rounded-xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium text-slate-700 text-sm"
            >
              <option value="">🗺️ All Divisions</option>
              {Object.keys(bdData).map((div) => (
                <option key={div} value={div}>{div}</option>
              ))}
            </select>

            <select
              value={filterDist}
              onChange={(e) => setFilterDist(e.target.value)}
              disabled={!filterDiv}
              className="border border-slate-200 p-2.5 rounded-xl bg-slate-50 disabled:bg-slate-100 disabled:text-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium text-slate-700 text-sm"
            >
              <option value="">📍 All Districts</option>
              {filterDiv && bdData[filterDiv].map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>

            {/* Date Filter */}
            <input 
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border border-slate-200 p-2.5 rounded-xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium text-slate-700 text-sm"
            />

            {/* Time Filter */}
            <input 
              type="time"
              value={filterTime}
              onChange={(e) => setFilterTime(e.target.value)}
              className="border border-slate-200 p-2.5 rounded-xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium text-slate-700 text-sm"
            />
          </div>
        </div>

        {/* Upgraded Feed Section */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16 text-slate-500 bg-white rounded-2xl shadow-sm border border-slate-100">
              <span className="text-4xl mb-3 block">🏜️</span>
              <p className="font-medium text-lg">No rides match your filters.</p>
              <p className="text-sm">Be the first to post a request or offer!</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className={`bg-white rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 ${
                  post.postType === "provide"
                    ? "border-orange-400 shadow-[0_4px_20px_rgba(249,115,22,0.15)] hover:shadow-[0_8px_25px_rgba(249,115,22,0.25)]"
                    : "border-blue-400 shadow-[0_4px_20px_rgba(59,130,246,0.15)] hover:shadow-[0_8px_25px_rgba(59,130,246,0.25)]"
                }`}
              >
                <div className="p-5 sm:p-6">
                  {/* Top Row: Type & Fare */}
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                      post.postType === "provide" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {post.postType === "provide" ? "🚗 Providing Ride" : "🙋‍♂️ Asking for Ride"}
                    </span>
                    <div className="text-right">
                      <p className="text-3xl font-black text-emerald-600 tracking-tight">৳{post.fare}</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Offered Fare</p>
                    </div>
                  </div>

                  {/* Middle Row: Route & Date/Time Badge */}
                  <div className="mb-6">
                    <h3 className="font-extrabold text-xl sm:text-2xl text-slate-800 leading-tight mb-3">
                      {post.fromArea} <span className="text-indigo-400 mx-1">➔</span> {post.toArea}
                    </h3>
                    
                    {/* Beautiful Date & Time Badge */}
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                        📅 {formatDate(post.travelDate)}
                      </div>
                      <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                        🕒 {formatTime(post.travelTime)}
                      </div>
                      <div className="flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-sm font-semibold">
                        📍 {post.district}, {post.division}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Details & Actions */}
                  <div className="grid grid-cols-2 gap-y-3 text-sm text-slate-700 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="flex items-center gap-2"><strong>Vehicle:</strong> {post.vehicleType}</p>
                    <p className="flex items-center gap-2"><strong>Seats:</strong> {post.seats}</p>
                    <p className="flex items-center gap-2"><strong>Name:</strong> {post.name}</p>
                  </div>

                  <div className="flex gap-3">
                    <a href={`tel:${post.phone}`} className="flex-1 bg-slate-800 text-white text-center py-3 rounded-xl font-bold hover:bg-slate-900 transition shadow-sm flex justify-center items-center gap-2">
                      📞 Call
                    </a>
                    <a href={`https://wa.me/${post.whatsapp}`} target="_blank" className="flex-1 bg-emerald-500 text-white text-center py-3 rounded-xl font-bold hover:bg-emerald-600 transition shadow-sm flex justify-center items-center gap-2">
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Upgraded Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] z-30">
        <div className="max-w-3xl mx-auto flex gap-4">
          <button
            onClick={() => openModal("provide")}
            className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-black py-4 px-4 rounded-2xl hover:from-orange-500 hover:to-orange-600 shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5"
          >
            🚗 Provide Ride
          </button>
          <button
            onClick={() => openModal("ask")}
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-black py-4 px-4 rounded-2xl hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
          >
            🙋‍♂️ Ask for Ride
          </button>
        </div>
      </div>

      {/* MOBILE-FRIENDLY RESPONSIVE MODAL (Bottom Sheet on Mobile, Centered on Desktop) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-end sm:items-center justify-center sm:p-4 backdrop-blur-sm transition-opacity">
          
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg shadow-2xl relative overflow-hidden border-t sm:border border-white/20 flex flex-col max-h-[90vh]">
            
            {/* Fixed Header */}
            <div className={`p-6 text-white flex-shrink-0 ${modalType === "provide" ? "bg-gradient-to-r from-orange-400 to-orange-500" : "bg-gradient-to-r from-blue-600 to-indigo-600"}`}>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                {modalType === "provide" ? "🚗 Create a Ride Offer" : "🙋‍♂️ Request a Ride"}
              </h2>
              <p className="text-sm opacity-90 mt-1">Fill out the details below to post to the feed.</p>
            </div>

            {/* Scrollable Form Body (This prevents the cutoff!) */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Vehicle Type</label>
                  <input type="text" name="vehicleType" placeholder="e.g. Car, Bike" value={formData.vehicleType} onChange={handleInputChange} required className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                </div>
              </div>

              {/* DATE & TIME SECTION */}
              <div className="grid grid-cols-2 gap-4 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-50">
                <div>
                  <label className="block text-xs font-bold text-indigo-800 uppercase tracking-wider mb-1">Date</label>
                  <input type="date" name="travelDate" value={formData.travelDate} onChange={handleInputChange} required className="w-full border border-indigo-100 p-3 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition text-slate-700 font-medium text-sm sm:text-base" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-indigo-800 uppercase tracking-wider mb-1">Time</label>
                  <input type="time" name="travelTime" value={formData.travelTime} onChange={handleInputChange} required className="w-full border border-indigo-100 p-3 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition text-slate-700 font-medium text-sm sm:text-base" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">WhatsApp</label>
                  <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} required className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Primary Division</label>
                  <select name="division" value={formData.division} onChange={handleInputChange} required className="w-full border border-slate-200 p-3 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition">
                    <option value="">Select</option>
                    {Object.keys(bdData).map((div) => (<option key={div} value={div}>{div}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Primary District</label>
                  <select name="district" value={formData.district} onChange={handleInputChange} required disabled={!formData.division} className="w-full border border-slate-200 p-3 rounded-xl bg-white disabled:bg-slate-100 disabled:text-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none transition">
                    <option value="">Select</option>
                    {formData.division && bdData[formData.division].map((dist) => (<option key={dist} value={dist}>{dist}</option>))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Locations From</label>
                  <input type="text" name="fromArea" placeholder="e.g. Sylhet, Sunamgonj..." value={formData.fromArea} onChange={handleInputChange} required className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Locations To</label>
                  <input type="text" name="toArea" placeholder="e.g. Sreemangal, Jaflong..." value={formData.toArea} onChange={handleInputChange} required className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-2">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{modalType === "provide" ? "Seats Available" : "Seats Needed"}</label>
                  <input type="number" name="seats" value={formData.seats} onChange={handleInputChange} required className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition text-lg font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Fare Price (৳)</label>
                  <input type="number" name="fare" value={formData.fare} onChange={handleInputChange} required className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition text-lg font-bold text-emerald-600" />
                </div>
              </div>

              {/* Fixed Footer Buttons Inside Form */}
              <div className="flex gap-4 pt-4 border-t border-slate-100 mt-2 sticky bottom-0 bg-white pb-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 text-slate-700 font-bold py-4 rounded-2xl hover:bg-slate-200 transition">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className={`flex-1 text-white font-bold py-4 rounded-2xl transition shadow-lg ${modalType === "provide" ? "bg-orange-500 hover:bg-orange-600 hover:shadow-orange-500/30" : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-600/30"} disabled:opacity-50`}>
                  {isSubmitting ? "Posting..." : "Post Now"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}