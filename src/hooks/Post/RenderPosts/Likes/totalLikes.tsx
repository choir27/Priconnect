export function totalLikes(likeArray: string[]){
    let sum = 0;

    likeArray.forEach((like: string)=>{
        const likeObject = JSON.parse(like);
        sum += likeObject.likes;
    })

    return sum;
};
