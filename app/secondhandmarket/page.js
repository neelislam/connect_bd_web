// app/secondhandmarket/page.js
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

// Marketplace Categories
const marketCategories = [
  "Mobiles & Tablets",
  "Computers & Laptops",
  "Electronics & Appliances",
  "Vehicles & Bikes",
  "Home & Furniture",
  "Fashion & Beauty",
  "Sports, Books & Hobbies",
  "Pets & Animals",
  "Other"
];

// Helper to assign a dynamic emoji placeholder for the "product image"
const getCategoryEmoji = (category) => {
  if (category.includes("Mobile")) return "📱";
  if (category.includes("Computer")) return "💻";
  if (category.includes("Electronics")) return "📺";
  if (category.includes("Vehicle")) return "🏍️";
  if (category.includes("Furniture")) return "🛋️";
  if (category.includes("Fashion")) return "👕";
  if (category.includes("Sports")) return "⚽";
  if (category.includes("Pets")) return "🐈";
  return "🛍️";
};

export default function SecondhandMarketPage() {
  const router = useRouter();
  
  // Feed & Filter State
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [filterPostType, setFilterPostType] = useState("all"); 
  const [filterCategory, setFilterCategory] = useState("all"); 
  const [filterDiv, setFilterDiv] = useState("");
  const [filterDist, setFilterDist] = useState("");
  const [filterCondition, setFilterCondition] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'sell' or 'buy'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    condition: "Used - Good", // New, Used - Like New, Used - Good, Used - Fair
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
      const q = query(collection(db, "secondhand_market"), orderBy("createdAt", "desc"));
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "division" && { district: "" }) 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "secondhand_market"), {
        ...formData,
        postType: modalType, // 'sell' or 'buy'
        createdAt: serverTimestamp(),
      });
      
      setFormData({ title: "", category: "", price: "", condition: "Used - Good", division: "", district: "", localArea: "", name: "", phone: "", whatsapp: "", description: "" });
      setIsModalOpen(false);
      fetchPosts();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  // Filter Logic
  const filteredPosts = posts.filter((post) => {
    let matchPostType = filterPostType === "all" ? true : post.postType === filterPostType;
    let matchCategory = filterCategory === "all" ? true : post.category === filterCategory;
    let matchDiv = filterDiv ? post.division === filterDiv : true;
    let matchDist = filterDist ? post.district === filterDist : true;
    let matchCondition = filterCondition === "all" ? true : post.condition === filterCondition;

    return matchPostType && matchCategory && matchDiv && matchDist && matchCondition;
  });

  return (
    <div className="min-h-screen bg-slate-100 pb-28 font-sans text-slate-900">
      
      {/* Marketplace Header (Rose/Fuchsia Theme) */}
      <div className="bg-gradient-to-r from-rose-600 to-fuchsia-700 shadow-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            🛒 Market Place
          </h1>
          <button onClick={() => router.push("/dashboard")} className="text-rose-100 hover:text-white hover:underline font-medium transition">
            ← Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6">
        
        {/* Marketplace Filter Board */}
        <div className="bg-white p-5 rounded-2xl shadow-sm mb-8 border border-slate-200">
          <div className="flex justify-between items-center mb-4">
             <h2 className="font-bold text-slate-800 text-lg">Browse & Search</h2>
             {(filterDiv || filterDist || filterCategory !== 'all' || filterPostType !== 'all' || filterCondition !== 'all') && (
               <button 
                 onClick={() => { setFilterPostType("all"); setFilterCategory("all"); setFilterDiv(""); setFilterDist(""); setFilterCondition("all"); }}
                 className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition"
               >
                 Clear Filters
               </button>
             )}
          </div>

          {/* Scrolling filter wrapper for mobile, grid for desktop */}
          <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-3 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            <select
              value={filterPostType}
              onChange={(e) => setFilterPostType(e.target.value)}
              className="min-w-[140px] sm:min-w-0 border border-slate-200 p-2.5 rounded-xl bg-slate-50 focus:ring-2 focus:ring-rose-500 outline-none transition font-medium text-slate-700 text-sm"
            >
              <option value="all">🌍 All Listings</option>
              <option value="sell">🏷️ Selling</option>
              <option value="buy">🙋‍♂️ Buying / Seeking</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="min-w-[160px] sm:min-w-0 border border-slate-200 p-2.5 rounded-xl bg-slate-50 focus:ring-2 focus:ring-rose-500 outline-none transition font-medium text-slate-700 text-sm"
            >
              <option value="all">📦 All Categories</option>
              {marketCategories.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={filterCondition}
              onChange={(e) => setFilterCondition(e.target.value)}
              className="min-w-[140px] sm:min-w-0 border border-slate-200 p-2.5 rounded-xl bg-slate-50 focus:ring-2 focus:ring-rose-500 outline-none transition font-medium text-slate-700 text-sm"
            >
              <option value="all">✨ Any Condition</option>
              <option value="New">New</option>
              <option value="Used - Like New">Used - Like New</option>
              <option value="Used - Good">Used - Good</option>
              <option value="Used - Fair">Used - Fair</option>
            </select>

            <select
              value={filterDiv}
              onChange={(e) => { setFilterDiv(e.target.value); setFilterDist(""); }}
              className="min-w-[140px] sm:min-w-0 border border-slate-200 p-2.5 rounded-xl bg-slate-50 focus:ring-2 focus:ring-rose-500 outline-none transition font-medium text-slate-700 text-sm"
            >
              <option value="">🗺️ Division</option>
              {Object.keys(bdData).map((div) => (
                <option key={div} value={div}>{div}</option>
              ))}
            </select>

            <select
              value={filterDist}
              onChange={(e) => setFilterDist(e.target.value)}
              disabled={!filterDiv}
              className="min-w-[140px] sm:min-w-0 border border-slate-200 p-2.5 rounded-xl bg-slate-50 disabled:bg-slate-100 disabled:text-slate-400 focus:ring-2 focus:ring-rose-500 outline-none transition font-medium text-slate-700 text-sm"
            >
              <option value="">📍 District</option>
              {filterDiv && bdData[filterDiv].map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>
        </div>

        {/* MARKETPLACE GRID LAYOUT */}
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-600"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16 text-slate-500 bg-white rounded-2xl shadow-sm border border-slate-200">
              <span className="text-5xl mb-3 block">🛍️</span>
              <p className="font-medium text-lg">No items match your search.</p>
              <p className="text-sm mt-1">Try adjusting your filters or list a new item!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className={`bg-white rounded-2xl border transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col ${
                    post.postType === "buy" 
                      ? "border-purple-200 hover:border-purple-400 shadow-sm hover:shadow-[0_8px_25px_rgba(168,85,247,0.15)]" 
                      : "border-slate-200 hover:border-rose-400 shadow-sm hover:shadow-[0_8px_25px_rgba(225,29,72,0.15)]"
                  }`}
                >
                  {/* Dynamic Product "Image" Banner */}
                  <div className={`h-32 w-full flex items-center justify-center text-5xl relative ${
                    post.postType === "buy" ? "bg-gradient-to-br from-purple-100 to-fuchsia-100" : "bg-gradient-to-br from-rose-50 to-orange-50"
                  }`}>
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-sm ${
                        post.postType === "buy" ? "bg-purple-600 text-white" : "bg-rose-600 text-white"
                      }`}>
                        {post.postType === "buy" ? "Looking to Buy" : "For Sale"}
                      </span>
                    </div>
                    {/* Simulated Image Placeholder */}
                    <div className="bg-white/50 w-20 h-20 rounded-full flex items-center justify-center shadow-inner backdrop-blur-sm">
                      {getCategoryEmoji(post.category)}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    
                    {/* Price & Title */}
                    <div className="mb-3">
                      <p className={`text-2xl font-black tracking-tight mb-1 ${post.postType === "buy" ? "text-purple-600" : "text-rose-600"}`}>
                        ৳{post.price}
                      </p>
                      <h3 className="font-bold text-lg text-slate-800 leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                    </div>

                    {/* Metadata */}
                    <div className="text-xs text-slate-500 font-medium space-y-1.5 mb-4">
                      <p className="flex items-center gap-1.5">
                        <span>🏷️</span> {post.category}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <span>📍</span> {post.localArea}, {post.district}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <span>✨</span> Cond: {post.condition}
                      </p>
                    </div>

                    {/* Description (Truncated) */}
                    {post.description && (
                      <p className="text-xs text-slate-600 mb-5 line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        {post.description}
                      </p>
                    )}

                    <div className="mt-auto pt-2 grid grid-cols-2 gap-2">
                      <a href={`tel:${post.phone}`} className="bg-slate-100 text-slate-800 text-center py-2.5 rounded-xl text-sm font-bold hover:bg-slate-200 transition">
                        Call
                      </a>
                      <a href={`https://wa.me/${post.whatsapp}`} target="_blank" className={`text-white text-center py-2.5 rounded-xl text-sm font-bold transition ${post.postType === 'buy' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-green-500 hover:bg-green-600'}`}>
                        WhatsApp
                      </a>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Two-Way Action Buttons (Bottom) */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] z-30">
        <div className="max-w-4xl mx-auto flex gap-4">
          <button
            onClick={() => openModal("sell")}
            className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black py-4 px-2 sm:px-4 rounded-2xl hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-rose-500/30 transition-all transform hover:-translate-y-0.5 text-sm sm:text-base flex justify-center items-center gap-1 sm:gap-2"
          >
            🏷️ Sell an Item
          </button>
          <button
            onClick={() => openModal("buy")}
            className="flex-1 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white font-black py-4 px-2 sm:px-4 rounded-2xl hover:from-purple-600 hover:to-fuchsia-700 shadow-lg hover:shadow-purple-500/30 transition-all transform hover:-translate-y-0.5 text-sm sm:text-base flex justify-center items-center gap-1 sm:gap-2"
          >
            🙋‍♂️ Request an Item
          </button>
        </div>
      </div>

      {/* RESPONSIVE BOTTOM-SHEET MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-end sm:items-center justify-center sm:p-4 backdrop-blur-sm transition-opacity">
          
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-2xl shadow-2xl relative overflow-hidden border-t sm:border border-white/20 flex flex-col max-h-[92vh]">
            
            <div className={`p-6 text-white flex-shrink-0 flex justify-between items-center ${modalType === "sell" ? "bg-gradient-to-r from-rose-500 to-pink-600" : "bg-gradient-to-r from-purple-500 to-fuchsia-600"}`}>
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                  {modalType === "sell" ? "🏷️ Post a Classified Ad" : "🙋‍♂️ Post a Request Ad"}
                </h2>
                <p className="text-sm opacity-90 mt-1">
                  {modalType === "sell" ? "Sell your item to local buyers instantly." : "Can't find it? Post your budget and let sellers reach out!"}
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 bg-slate-50">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b pb-2">📋 Item Details</h3>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Ad Title</label>
                  <input type="text" name="title" placeholder={modalType === "sell" ? "e.g. iPhone 13 Pro 128GB - Excellent Cond." : "e.g. Looking to buy a used PS5"} value={formData.title} onChange={handleInputChange} required className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition font-medium ${modalType === "sell" ? "focus:ring-rose-500" : "focus:ring-purple-500"}`} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} required className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition font-medium ${modalType === "sell" ? "focus:ring-rose-500" : "focus:ring-purple-500"}`}>
                      <option value="">Select Category</option>
                      {marketCategories.map((type) => (<option key={type} value={type}>{type}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{modalType === "sell" ? "Item Condition" : "Required Condition"}</label>
                    <select name="condition" value={formData.condition} onChange={handleInputChange} required className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition font-medium ${modalType === "sell" ? "focus:ring-rose-500" : "focus:ring-purple-500"}`}>
                      <option value="New">New / Unused</option>
                      <option value="Used - Like New">Used - Like New</option>
                      <option value="Used - Good">Used - Good</option>
                      <option value="Used - Fair">Used - Fair</option>
                    </select>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${modalType === "sell" ? "bg-rose-50/50 border-rose-100" : "bg-purple-50/50 border-purple-100"}`}>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${modalType === "sell" ? "text-rose-700" : "text-purple-700"}`}>
                    {modalType === "sell" ? "Asking Price (৳)" : "Your Budget (৳)"}
                  </label>
                  <input type="number" name="price" placeholder="e.g. 5000" value={formData.price} onChange={handleInputChange} required className={`w-full border p-3 rounded-xl focus:ring-2 outline-none transition font-bold text-xl bg-white ${modalType === "sell" ? "border-rose-200 focus:ring-rose-500 text-rose-700" : "border-purple-200 focus:ring-purple-500 text-purple-700"}`} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b pb-2">📍 Location</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Division</label>
                    <select name="division" value={formData.division} onChange={handleInputChange} required className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition ${modalType === "sell" ? "focus:ring-rose-500" : "focus:ring-purple-500"}`}>
                      <option value="">Select Division</option>
                      {Object.keys(bdData).map((div) => (<option key={div} value={div}>{div}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">District</label>
                    <select name="district" value={formData.district} onChange={handleInputChange} required disabled={!formData.division} className={`w-full border border-slate-200 p-3 rounded-xl disabled:bg-slate-100 focus:ring-2 outline-none transition ${modalType === "sell" ? "focus:ring-rose-500" : "focus:ring-purple-500"}`}>
                      <option value="">Select District</option>
                      {formData.division && bdData[formData.division].map((dist) => (<option key={dist} value={dist}>{dist}</option>))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Specific Area</label>
                  <input type="text" name="localArea" placeholder="e.g. Zindabazar, Sylhet" value={formData.localArea} onChange={handleInputChange} required className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition ${modalType === "sell" ? "focus:ring-rose-500" : "focus:ring-purple-500"}`} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b pb-2">📞 Contact & Info</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Your Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition ${modalType === "sell" ? "focus:ring-rose-500" : "focus:ring-purple-500"}`} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition ${modalType === "sell" ? "focus:ring-rose-500" : "focus:ring-purple-500"}`} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">WhatsApp</label>
                    <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} required className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition ${modalType === "sell" ? "focus:ring-rose-500" : "focus:ring-purple-500"}`} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{modalType === "sell" ? "Description / Flaws" : "Specific Requirements"}</label>
                  <textarea name="description" rows="3" placeholder={modalType === "sell" ? "Mention any scratches, warranty remaining, or why you are selling." : "Mention preferred colors, minimum storage, etc."} value={formData.description} onChange={handleInputChange} className={`w-full border border-slate-200 p-3 rounded-xl focus:ring-2 outline-none transition resize-none ${modalType === "sell" ? "focus:ring-rose-500" : "focus:ring-purple-500"}`}></textarea>
                </div>
              </div>

              <div className="flex gap-4 pt-4 mt-2 sticky bottom-0 bg-slate-50 pb-2 shadow-[0_-10px_20px_10px_#f8fafc]">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white border border-slate-200 text-slate-700 font-bold py-4 rounded-2xl hover:bg-slate-100 transition shadow-sm">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className={`flex-1 text-white font-bold py-4 rounded-2xl transition shadow-lg disabled:opacity-50 ${modalType === "sell" ? "bg-rose-600 hover:bg-rose-700 hover:shadow-rose-600/30" : "bg-purple-600 hover:bg-purple-700 hover:shadow-purple-600/30"}`}>
                  {isSubmitting ? "Posting..." : "Publish Ad"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}