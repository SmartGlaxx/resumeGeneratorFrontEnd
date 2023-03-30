import axios  from "axios";
// const USELISTRURL = "http://localhost:8080/api/users/list" 
const RECRUITER_SIGNUP_URL = "http://localhost:8080/recruiters/signup" 
const RECRUITER_SIGNIN_URL = "http://localhost:8080/recruiters/signin"
class Recruiter{
    // getUserData(){
    //     return axios.get(USELISTRURL);
    // }

    signUpNewRecruiter(firstName, lastName, email, password, router){
        const recruiter = {
            firstName : firstName,
            lastName : lastName,
            recruiterEmail : email,
            password : password
        }
         axios.post(RECRUITER_SIGNUP_URL, recruiter)
        .then(response => {
          alert("Recruiter created successfully.");
          sessionStorage.setItem("recruiterEmail", recruiter.recruiterEmail);
          router.push('/sign-in');
        })
        .catch(error => {
          alert("Error creating recruiter account.");
        });
        
    }
    signInNewRecruiter(email, password, router){
        const recruiter = {
            recruiterEmail : email,
            password : password
        }
        axios.post(RECRUITER_SIGNIN_URL, recruiter)
        .then(response => {
          if (response.status == 200) {
            sessionStorage.setItem("recruiterEmail", recruiter.recruiterEmail);
            sessionStorage.setItem("isRecruiterLoggedIn", true);
            router.push('/search-resumes');
        
          }else{
            alert("Error logging in")
          }
        })
        .catch(error => {
          alert("Error loggin in user.");
        });
    }
}

export default new Recruiter();