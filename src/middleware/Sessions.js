export function getEmail(){
    return sessionStorage.getItem("email");
}

export function setEmail(email){
    return sessionStorage.setItem("email", email)
}
