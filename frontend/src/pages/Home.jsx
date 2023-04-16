    import {useGoogleLogin} from "@react-oauth/google"
    import axios from "axios"

    const Home = () => {

      const googleLogin = useGoogleLogin({
    
        onSuccess: async tokenResponse => {
          // fetching userinfo can be done on the client or the server
          const userInfo = await axios
            .get('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            })
            .then(res => res.data);
    
            if(userInfo){
                await axios
                  .post("http://www.localhost:8000/google/refresh-token", {
                      userInfo,
                      tokenResponse             
                  })
            }
        },
        // flow: 'implicit
        onError: errorResponse => console.error(errorResponse),
    });
     
      return (
        <>
          <button onClick = {()=>googleLogin()}>
            Login
          </button>
        </>
      )
    }

    export default Home