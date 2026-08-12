'use client'
import { motion } from 'framer-motion';
import { deleteDocument } from '@/firebase/firestore';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

export interface PostCardProps {
  id?: string;
  title?: string;
  summary?: string;
  status?: string;
  collectionName?: string; // Used if you want the delete button to work
  // This catch-all prevents TS errors if other feeds pass different props
  [key: string]: any; 
}

export default function PostCard({ id, title, summary, status, collectionName, ...rest }: PostCardProps) {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    if (!id || !collectionName) return;
    try {
      await deleteDocument(collectionName, id);
      setIsDeleted(true); // Hide the card from the UI immediately
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  if (isDeleted) return null;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/90 dark:bg-brand-card/90 backdrop-blur-md p-6 rounded-3xl border border-brand-blue/20 shadow-lg relative mb-4"
    >
      <div className="flex justify-between items-start mb-4">
        {status && (
          <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${status === 'Verified' ? 'bg-green-500' : 'bg-orange-500'}`}>
            {status.toUpperCase()}
          </span>
        )}
        
        {/* Delete Button */}
        {id && collectionName && (
          <button 
            onClick={handleDelete}
            className="text-red-500 hover:bg-red-500/10 p-2 rounded-full transition-colors ml-auto"
            title="Delete Post"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {title && <h2 className="text-2xl font-black dark:text-white mb-2">{title}</h2>}
      {summary && <p className="text-gray-600 dark:text-gray-300 mb-4">{summary}</p>}

      {/* Render extra common props if they are passed from other feeds */}
      <div className="flex flex-col gap-2">
        {rest.driverName && <p className="text-sm dark:text-gray-400"><strong>Name:</strong> {rest.driverName}</p>}
        {rest.contactNumber && <p className="text-sm dark:text-gray-400"><strong>Contact:</strong> {rest.contactNumber}</p>}
        {rest.time && <p className="text-sm dark:text-gray-400"><strong>Time:</strong> {rest.time}</p>}
        {rest.priceOffer && <p className="text-sm dark:text-gray-400"><strong>Offer:</strong> {rest.priceOffer}</p>}
      </div>
    </motion.div>
  );
}