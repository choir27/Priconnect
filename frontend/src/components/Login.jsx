import {useGoogleLogin} from "@react-oauth/google"
import axios from "axios"

const Login = () => {

    const handleLogin = useGoogleLogin({
        onSuccess: async tokenResponse => {
          try{
          // fetching userinfo can be done on the client or the server
          const userInfo = await axios
            .get('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            })
            .then(res => res.data);


            await axios
                .post("http://www.localhost:8000/auth/google/login", {
                  userInfo,
                  tokenResponse             
                })
                .then(response=>{
                  console.log(response);
                  localStorage.setItem("id", response.data.user._id);
                  window.location.reload();
                });

          }catch(err){
            console.error(err);
          }
        }
    });

  return (
      <a href = "/" 
      className = "button" 
      onClick = {(e)=>{
        e.preventDefault();
        handleLogin()}}>
      <i className = "fab fa-google left"></i> Login
      </a> 
      )
}

export default Login