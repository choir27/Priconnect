import {useGoogleLogin} from "@react-oauth/google"
import axios from "axios"
import {toast} from "react-toastify"
import {useCallback, useEffect, useState} from "react"

const Signup = () => {
    const [users, setUsers] = useState([]);

    const fetchData = useCallback(async()=>{
        try{
          const {data: userData} = await axios.get("http://localhost:8000/api/users");
          setUsers(userData);
        }catch(err){
          console.error(err);
        }
    }, []);

    useEffect(()=>{fetchData()},[fetchData]);

    const handleSignUp = useGoogleLogin({
          onSuccess: async tokenResponse => {
            try{
            // fetching userinfo can be done on the client or the server
            const userInfo = await axios
              .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
              })
              .then(res => res.data);
                
                if(users && users.find(account=>account.email === userInfo.email)){

                  toast.error("User Already Exists");
                  return;

                }else if(userInfo){

                  await axios
                    .post("http://www.localhost:8000/auth/google/refresh-token", {
                        userInfo,
                        tokenResponse             
                    })
                    .then(response=>{
                      console.log(response);
                      localStorage.setItem("id", response.data.user._id);
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
      <i className = "fab fa-google left"></i> SignUp
      </a> 

    )

}

export default Signup