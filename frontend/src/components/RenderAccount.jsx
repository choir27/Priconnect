import {useCallback, useMemo} from "react"
import {handleDelete, handleLike} from "../hooks/Account"
import {Link} from "react-router-dom"

const RenderAccount = ({listOfPosts, setPosts, posts}) => {

    const renderPosts = useCallback(()=>{
        if(listOfPosts){
          let c1 = false;
          const postArray = [];

          listOfPosts.forEach(post=>{
            if(post.user === localStorage.getItem("id") && post.comments){
              c1 = true;
              postArray.push(
                <tr key = {post._id}>
                    <Link to = "/viewPost"
                    onClick = {()=>localStorage.setItem("postId",post._id)}
                    >
                        <td className = "tableImage">
                            <img src = {post.post} alt = {`Post of ${post.title}`}/>
                        </td>
                    </Link>
    
                    <td>{post.title}</td>
    
                    <td className = "icons buttons">
                        <div className = "flex">
                            <section className = "button" onClick = {(e)=>handleLike(e,post._id)}>
                                <i className="fa-solid fa-thumbs-up" ><span>{post.likes}</span></i>
                            </section>
                            <Link to = "/comments" className="button" onClick = {()=>localStorage.setItem("postId",post._id)}>
                                <i className="fa-solid fa-comment"><span>{post.comments.length}</span></i>
                            </Link>
                        </div>
                    </td>
    
                    <td className = "buttons">
                        <div className = "flex"> 
                            <button className = "fa-solid fa-trash button" onClick = {(e)=>{handleDelete(e,post._id)}}></button>
                            <Link to = "/editPost" className = "fa-solid fa-pen-to-square button" onClick = {()=>localStorage.setItem("postId", post._id)}></Link>
                        </div>
                    </td>
               
                </tr>
              );
            }
          });
    
          if(!c1){
            postArray.push(
              <tr key = "defaultValue">
                  <td>N/A</td>
                  <td>N/A</td>
                  <td>N/A</td>
                  <td>N/A</td>
              </tr>
            )
          }
          return postArray;
        };
    },[listOfPosts]);
    
    useMemo(()=>{setPosts(renderPosts())},[renderPosts, setPosts]);

    return posts;
}

export default RenderAccount