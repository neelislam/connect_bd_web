'use client';

import { TravelPost, MedicalService, ServicePost } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { deleteDocument } from '@/firebase/firestore';
import toast from 'react-hot-toast';

interface PostCardProps {
  post: TravelPost | MedicalService | ServicePost;
  type: 'travel' | 'medical' | 'service';
}

export default function PostCard({ post, type }: PostCardProps) {
  const { user } = useAuth();
  const isOwner = post.id && user?.uid === (post as any).userId;

  const handleDelete = async () => {
    if (!post.id || !confirm('Delete this post?')) return;
    try {
      const collectionMap = {
        travel: 'travelPosts',
        medical: 'medicalServices',
        service: 'servicePosts',
      };
      await deleteDocument(collectionMap[type], post.id);
      toast.success('Deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  // Render different content based on type
  if (type === 'travel') {
    const p = post as TravelPost;
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border-l-4 border-blue-500">
        <div className="flex justify-between">
          <span className={`text-xs font-bold ${p.isPassengerPost ? 'text-red-500' : 'text-blue-500'}`}>
            {p.isPassengerPost ? 'PASSENGER' : 'RIDER'}
          </span>
          <span className="text-xs text-gray-500">{p.date} {p.time}</span>
        </div>
        <div className="my-2">
          <p className="text-lg font-bold">{p.fromDivision} → {p.toDivision}</p>
          {p.intermediateStops && p.intermediateStops.length > 0 && (
            <p className="text-sm text-gray-500">via {p.intermediateStops.join(', ')}</p>
          )}
        </div>
        <div className="flex gap-4 text-sm">
          <span>🚗 {p.vehicleType}</span>
          {p.rentOffer && <span>💰 {p.rentOffer}</span>}
        </div>
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div>
            <p className="font-medium">{p.driverName}</p>
            <p className="text-sm text-gray-500">{p.contactNumber}</p>
          </div>
          <div className="flex gap-2">
            {isOwner && (
              <button onClick={handleDelete} className="text-red-500 text-sm">Delete</button>
            )}
            <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Connect</button>
          </div>
        </div>
      </div>
    );
  }

  // Similar for medical and service...
  return <div>Post type not implemented</div>;
}