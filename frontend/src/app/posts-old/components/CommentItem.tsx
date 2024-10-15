import React from 'react';
import { Comment } from '@/types/Post';
export default function CommentItem({ comment, index } : { comment: Comment, index: number }) {
    return (
        <li key={index} className="p-2 border rounded-lg shadow-sm bg-gray-50">
            <div className="flex items-center mb-2">
                {/* <img src={comment.userAvatar} alt={comment.user} className="w-8 h-8 rounded-full mr-2" /> */}
                <div>
                    <p className="text-sm font-semibold">{comment.user}</p>
                    <p className="text-xs text-gray-500">{new Date(comment.dateAdded).toLocaleDateString()}</p>
                </div>
            </div>
            <p className="text-gray-700">{comment.message}</p>
        </li>
    );
};

