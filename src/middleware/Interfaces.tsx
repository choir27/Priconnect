export interface ButtonInterface{
    text: string,
    classNames?: string,
    onClick: ()=>void
}

export interface User{
    email: string,
    $id: string,
    name: string,
    $createdAt: string,
}

export interface Image{
    created_at: string,
    original_filename: string,
    public_id: string,
    secure_url: string
}
