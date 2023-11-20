export interface Button{
    text: string,
    classNames?: string,
    onClick: ()=>void
}

export interface User{
    email: string,
    $id: string,
    name: string,
    $createAt: string,
}