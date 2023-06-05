import {useGoogleLogin} from "@react-oauth/google"
import axios from "axios"

const Signup = () => {

    const handleSignUp = useGoogleLogin({
          onSuccess: async tokenResponse => {
            try{
            // fetching userinfo can be done on the client or the server
            const userInfo = await axios
              .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
              })
              .then(res =>res.data);
              
            if(userInfo){
                  await axios
                    .post("https://priconne-backend-production.up.railway.app/auth/google/refresh-token", {
                        userInfo,
                        tokenResponse             
                    })
                    .then(response=>{
                      localStorage.setItem("mongoID", response.data.user._id);
                      localStorage.setItem("id", userInfo.sub);
                      window.location.reload();
                    });
              };
      
            }catch(err){
              console.error(err);
            }
          },
          // flow: 'implicit
          onError: errorResponse => console.error(errorResponse),  
    });

    return(
      <a href = "/" 
      className = "button" 
      onClick = {(e)=>{
        e.preventDefault();
        handleSignUp()}}>
      <i className = "fab fa-google left"></i> Login
      </a> 

    )

}

export default Signup