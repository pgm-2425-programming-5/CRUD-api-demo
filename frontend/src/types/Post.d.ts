export type Comment = {
    dateAdded: Date;
    documentId: string;
    message: string;
    users_permissions_user: {
        username: string;
    };
};

export type Post = {
    createdAt: Date;
    documentId: string;
    message: string;
    user: {
        username: string;
    };
    amountLikes: number;
    comments: Comment[];
    dateAdded: Date;
};
