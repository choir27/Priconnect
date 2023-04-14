import { useGoogleLogin, googleLogout } from '@react-oauth/google';

const Home = () => {

    const login = useGoogleLogin({
        onSuccess: codeResponse => console.log(codeResponse),
        flow: 'auth-code',
    });
      
  return (
    <div>
        <h1>Home</h1>
        <button onClick = {()=>login()}>
            Login
        </button>
        <button onClick = {()=>googleLogout()
        }>
            Logout
        </button>
    </div>
  )
}

export default Home