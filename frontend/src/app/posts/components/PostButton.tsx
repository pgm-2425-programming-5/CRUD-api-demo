"use client";

interface ButtonProps {
    color: string;
    onClick: (postId: string) => void;
    children: React.ReactNode;
    postId: string;
}

export default function PostButton({ color, onClick, children, postId } : ButtonProps) {
    return (
        <button
            className={`px-4 py-2 bg-${color}-500 text-white rounded hover:bg-${color}-700`}
            onClick={() => onClick(postId)}
        >
            {children}
        </button>
    );
};