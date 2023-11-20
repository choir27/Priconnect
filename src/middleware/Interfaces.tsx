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