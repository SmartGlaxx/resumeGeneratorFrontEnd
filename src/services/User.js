import axios  from "axios";
const USELISTRURL = "http://localhost:8080/api/users/list" 
const USER_SIGNUP_URL = "http://localhost:8080/api/users/signup" 
const USER_SIGNIN_URL = "http://localhost:8080/api/users/signin"
class User{
    getUserData(){
        return axios.get(USELISTRURL);
    }

    signUpNewUser(firstName, lastName, email, password){
        const user = {
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password
        }
         axios.post(USER_SIGNUP_URL, user)
        .then(response => {
          alert("User created successfully.");
          sessionStorage.setItem("userEmail", user.email);
        })
        .catch(error => {
          alert("Error creating user account.");
        });
        
    }
    signInNewUser(email, password, router){
        const user = {
            email : email,
            password : password
        }
        axios.post(USER_SIGNIN_URL, user)
        .then(response => {
          if (response.status == 200) {
            sessionStorage.setItem("userEmail", user.email);
            sessionStorage.setItem("isLoggedIn", true);
            router.push('/create-resume');
            window.location.reload()
          }else{
            alert("Error logging in")
          }
        })
        .catch(error => {
          alert("Error loggin in user.");
        });
    }
}

export default new User();