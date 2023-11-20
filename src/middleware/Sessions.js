export function getEmail(){
    return sessionStorage.getItem("email");
}

export function setEmail(email){
    return sessionStorage.setItem("email", email);
}

export function getPostId(){
    return sessionStorage.getItem("postId");
}

export function setPostId(postId){
    return sessionStorage.setItem("postId", postId);
}
