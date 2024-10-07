export type Comment = {
    user: string;
    message: string;
    dateAdded: string;
};

export type Post = {
    id: number;
    title: string;
    body: string;
    dateAdded: string;
    user: string;
    message: string;
    amountLikes: number;
    comments: Comment[];
};
