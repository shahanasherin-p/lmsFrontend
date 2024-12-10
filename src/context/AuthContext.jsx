import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthAPI, loginAPI, registerAPI } from "@/services/allAPI";
import { createContext, useEffect, useState } from "react";

export const AuthContext=createContext(null)

export default function AuthProvider({children}){
    const [signInFormData, setSignInFormData] =useState(initialSignInFormData)
    const [signUpFormData, setSignUpFormData] =useState(initialSignUpFormData)
    const [auth, setAuth] = useState({
        authenticate: false,
        user: null,
      });
      const [loading, setLoading] = useState(true);

      useEffect(()=>{
        checkAuthUser()
      },[])

      console.log(auth)

     const handleRegisterUser=async(event) =>{
        event.preventDefault();
        const data = await registerAPI(signUpFormData)
        console.log(data)
        alert("user register successfully Please SignIn")
        setSignUpFormData(initialSignUpFormData)

    }

    const handleLoginUser = async (event) => {
      event.preventDefault();
      try {
        const data = await loginAPI(signInFormData);
        console.log(data);
    
        if (data.success) {
          sessionStorage.setItem(
            "accessToken",
            JSON.stringify(data.data.accessToken)
          );
          setAuth({
            authenticate: true,
            user: data.data.user,
          });
          setSignInFormData(initialSignInFormData);
          alert("Login successful! Welcome back.");
        } else {
          alert("Login failed! Incorrect email or password.");
          setAuth({
            authenticate: false,
            user: null,
          });
        }
      } catch (error) {
        console.error(error);
        alert("Login failed! Incorrect email or password.");
        setAuth({
          authenticate: false,
          user: null,
        });
      }
    };
    

    //  const handleLoginUser=async(event)=> {
    //     event.preventDefault();
    //     const data = await loginAPI(signInFormData);
    //     console.log(data);
    
    //     if (data.success) {
    //       sessionStorage.setItem(
    //         "accessToken",
    //         JSON.stringify(data.data.accessToken)
    //       );
    //       setAuth({
    //         authenticate: true,
    //         user: data.data.user,
    //       });
    //       setSignInFormData(initialSignInFormData)
    //     } else {
    //       setAuth({
    //         authenticate: false,
    //         user: null,
    //       });
    //     }
    //   }

      const checkAuthUser=async()=>{
        try{
          const data = await checkAuthAPI();
        if (data.success) {
            setAuth({
                authenticate: true,
                user: data.data.user,
              });
              setLoading(false);
        }
        else{
            setAuth({
                authenticate: false,
                user: null,
            }); 
            setLoading(false);
        }
        }
        catch (error) {
          console.log(error);
          if (!error?.response?.data?.success) {
            setAuth({
              authenticate: false,
              user: null,
            });
            setLoading(false);
          }
        }
      }

      const resetCredentials=()=>{
        setAuth({
          authenticate: false,
          user: null,
        });
      }

    return <AuthContext.Provider value={{signInFormData,
         setSignInFormData,
         signUpFormData, 
         setSignUpFormData,
         handleRegisterUser,
         handleLoginUser,
         auth,
         resetCredentials
        }}>
        {loading ? <Skeleton /> : children}
        </AuthContext.Provider>
}
