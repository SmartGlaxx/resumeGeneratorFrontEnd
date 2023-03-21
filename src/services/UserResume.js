import axios  from "axios";
const USER_RESUME_LIST_URL = "http://localhost:8080/resumes/list" 
const USER_RESUMES_URL = `http://localhost:8080/resumes/list/${sessionStorage.getItem("userEmail")}` 
const USER_RESUME_URL = `http://localhost:8080/resumes/list/${sessionStorage.getItem("userEmail")}` 
const USER_RESUME_CREATE_URL = "http://localhost:8080/resumes/create" 
const USER_RESUME_UPDATE_URL = `http://localhost:8080/resumes/update/${sessionStorage.getItem("userEmail")}` 
const USER_RESUME_DELETE_URL = `http://localhost:8080/resumes/delete/${sessionStorage.getItem("userEmail")}` 

class UserResume{
    getUserData(){
            axios.get(USER_RESUME_LIST_URL)
            .then(response =>{
                alert("Fetched resume")
            }).catch(error =>{
                alert("Error fetching resume")
            })
         }
    

    createNewResume(userId, firstName, lastName, email, 
        address, phone, intro, experience, education, skills){
    const resume = {
        userId : userId,
        firstName : firstName,
        lastName : lastName,
        email : email,
        address : address,
        phone : phone,
        intro : intro,
        experience : experience,
        education : education,
        skills : skills
    }
        axios.post(USER_RESUME_CREATE_URL, resume)
    .then(response => {
        alert("Resume created successfully.");
    })
    .catch(error => {
        alert("Error creating resume.");
    });
    
    }

    getResumes(){
        return  axios.get(USER_RESUMES_URL)  
    }
    getResume(resumeId){
        return  axios.get(`${USER_RESUME_URL}/${resumeId}`)  
    }

    updateUserResume(resumeId, userId, firstName, lastName, email, 
        address, phone, intro, experience, education, skills){
            const resume = {
                userId : userId,
                firstName : firstName,
                lastName : lastName,
                email : email,
                address : address,
                phone : phone,
                intro : intro,
                experience : experience,
                education : education,
                skills : skills
            }
        return axios.put(`${USER_RESUME_UPDATE_URL}/${resumeId}`, resume)
        .then(response => {
            alert("Resume updated successfully.");
        })
        .catch(error => {
            alert("Error updating resume.");
        });
    }

    deleteUserResume(resumeId, router){
        axios.delete(`${USER_RESUME_DELETE_URL}/${resumeId}`)
        .then(response =>{
            if (response.status == 200) {
                this.deleteMessage = response.data
            }
        })
        .catch(error =>{
            console.log("Error")
        })
    }

}

export default new UserResume();