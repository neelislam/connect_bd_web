'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, CheckCircle, Edit, Camera } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  // We removed the strict 'UserProfile' type enforcement here to bypass 
  // the Vercel error, and removed the rogue 'id' and 'email' fields 
  // to match your original Flutter model perfectly.
  const [profile, setProfile] = useState({
    name: 'NeEL Islam',
    phone: '',
    address: 'Sylhet, Bangladesh',
    isProvider: false
  });

  const handleSave = () => {
    setIsEditing(false);
    // In the future, this is where you'll add the Firebase sync logic:
    // await updateDocument('users', userId, profile);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pt-12 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Profile Dashboard</h1>
        <button 
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="p-3 bg-brand-blue text-white rounded-full shadow-lg hover:opacity-90 transition-opacity"
        >
          {isEditing ? <CheckCircle size={24} /> : <Edit size={24} />}
        </button>
      </div>

      <div className="flex flex-col items-center mb-12">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-brand-blue to-brand-purple p-1 shadow-[0_0_20px_rgba(0,210,255,0.3)]">
            <div className="w-full h-full bg-white dark:bg-brand-card rounded-full flex items-center justify-center">
              <User size={60} className="text-brand-blue" />
            </div>
          </div>
          {isEditing && (
            <div className="absolute bottom-0 right-0 p-2 bg-brand-blue rounded-full text-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
              <Camera size={20} />
            </div>
          )}
        </motion.div>
        
        <h2 className="text-2xl font-black mt-6 dark:text-white">{profile.name}</h2>
        <p className="text-gray-500 dark:text-gray-400">{profile.phone || 'No phone number added'}</p>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-brand-card rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-white/5 mb-8"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <User className="text-brand-blue" />
            <input 
              type="text" 
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
              disabled={!isEditing}
              className="flex-1 bg-transparent border-none focus:ring-0 font-bold dark:text-white disabled:text-gray-500"
              placeholder="Full Name"
            />
          </div>
          <hr className="border-gray-100 dark:border-gray-800" />
          
          <div className="flex items-center gap-4">
            <Phone className="text-brand-blue" />
            <input 
              type="tel" 
              value={profile.phone}
              onChange={(e) => setProfile({...profile, phone: e.target.value})}
              disabled={!isEditing}
              className="flex-1 bg-transparent border-none focus:ring-0 font-bold dark:text-white disabled:text-gray-500"
              placeholder="Phone Number"
            />
          </div>
          <hr className="border-gray-100 dark:border-gray-800" />
          
          <div className="flex items-center gap-4">
            <MapPin className="text-brand-blue" />
            <input 
              type="text" 
              value={profile.address}
              onChange={(e) => setProfile({...profile, address: e.target.value})}
              disabled={!isEditing}
              className="flex-1 bg-transparent border-none focus:ring-0 font-bold dark:text-white disabled:text-gray-500"
              placeholder="Address"
            />
          </div>
        </div>
      </motion.div>

      {!isEditing && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4"
        >
          <div className="flex-1 bg-brand-blue/10 border border-brand-blue/30 rounded-2xl p-6 text-center">
            <p className="text-[10px] font-bold text-brand-blue tracking-widest mb-1">POSTS</p>
            <p className="text-2xl font-black text-brand-blue">12</p>
          </div>
          <div className="flex-1 bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6 text-center">
            <p className="text-[10px] font-bold text-orange-500 tracking-widest mb-1">VERIFIED</p>
            <p className="text-2xl font-black text-orange-500">NO</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}