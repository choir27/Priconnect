import {useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"
import HeaderAuth from "../components/HeaderAuth"
import {handleSubmit} from "../hooks/HandleSubmit"

const Post = () => {

  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  //Set default value for submit input
  useEffect(()=>{
    setStatus("public");
  },[]);

  return (
    <main className = "flex column">
      <HeaderAuth className = {"pages"}/>
      <div className = "flex justifyContent">
        <section className = "flex column alignItems" id = "add">

          <form onSubmit = {(e) => handleSubmit(e, navigate, post, title, status, description)}>
            <h1 className = "flex justifyContent">Add Post</h1>

            <section className = "flex form">

              <section>
                <h2>Add</h2>

                <label className = "button" htmlFor="file">{post? post.name : "Choose File"}</label>
                <input
                  id="file"
                  name="file"
                  accept="image/*"
                  type="file"
                  onChange={(e)=>setPost(e.target.files[0])}
                  className="hidden"
                />
              </section>

              <section>
                <h2>Status</h2>
                  <select name="status" className = 'button' onChange = {(e)=>setStatus(e.target.value)}>
                    <option value="public" defaultValue = "public">Public</option>
                    <option value="private">Private</option>
                  </select>
              </section>
            </section>

            <section className = "flex justifyContent">
              <input spellCheck = {true} className = "input" type = "text" name = "title" onChange = {(e)=>setTitle(e.target.value)} placeholder = "Give your post a title here"/>
            </section>

            <section className = "flex justifyContent textarea">
              <textarea 
              spellCheck = {true} 
              wrap = "hard" 
              type = "text" 
              name = "description" 
              placeholder = "Put description of your post here!" 
              onChange={(e)=>setDescription(e.target.value)}/>
            </section>

            <section className = "flex submit">
              <input type = "submit" className = "button"/>
            </section>

    
          </form>
        </section>
      </div>
    </main>
  )
}

export default Post