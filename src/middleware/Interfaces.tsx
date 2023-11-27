export interface ButtonInterface{
    text: string,
    classNames?: string,
    onClick: ()=>void
};

export interface User{
    email: string,
    $id: string,
    name: string,
    $createdAt: string,
};

export interface Image{
    created_at: string,
    original_filename: string,
    public_id: string,
    secure_url: string
};

export interface CreatePostInterface{
    text: string,
    image: Image
};

export interface Post{
    $id: string,
    $createdAt: string,
    $updatedAt: string,
    text: string,
    image: string,
    likes: string[],
    email: string,
    comments: string[]
};

export interface TextInputInterface{
    setText: (e:string) => void
};

export interface CommentInputInterface{
    setComment: (e:string) => void
};

export interface PostsInterface{
    posts: Post[],
    optionDisplay: boolean,
    setOptionDisplay: (e: boolean) => void,
    user: User
};

export interface addLikeInterface{
    post: Post,
    user: User,
    navigate: (e:string)=>void
};

export interface Comment{
    comment: string,
    id: string
};

export interface addCommentInterface extends addLikeInterface{
    comment: string
};

export interface PostOptionsInterface{
    post: Post, 
    props: PostsInterface, 
    checkLikeLogic: string
};

export interface CommentLike{
    id: string
};

export interface CommentOptionsInterface{
    post: Post,
    index: number
};

export interface ReplyOptionsInterface extends CommentOptionsInterface{
    replyIndex: number
};

export interface Reply{
    comment: string,
    id: string,
    likes: string[]
};