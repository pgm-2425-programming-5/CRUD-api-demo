export type Comment = {
    user: string;
    message: string;
    dateAdded: string;
};

export type Post = {
    id: number;
    dateAdded: string;
    user: string;
    message: string;
    amountLikes: number;
    comments: Comment[];
};
