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
    likes: number
};

export interface TextInputInterface{
    setText: (e:string) => void
};

export interface PostsInterface{
    posts: Post[],
    optionDisplay: boolean,
    setOptionDisplay: (e: boolean) => void
};
