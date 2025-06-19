const container = document.querySelector ('.container')
const SignUpBtn = document.querySelector ('.Sign-Up-btn')
const LoginBtn = document.querySelector ('.Login-btn')
const BackSign = document.getElementById ("BackSign")

SignUpBtn.addEventListener('click', () => {
    container.classList.add('active');
})

LoginBtn.addEventListener('click', () => {
    container.classList.remove('active')
})


BackSign.addEventListener('click', () => {
    container.classList.add('active');
})






let listenerAdded = false;

function myFunction() {
    const container = document.querySelector ('.container');
    const signupForm = document.getElementById ('signupForm');
    const loginForm = document.getElementById ('loginForm');
    // const SignBtn = document.querySelector('.form');

    if (listenerAdded) return;
    listenerAdded = true;


    signupForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        

        // Get input elements
        const usernameInput = document.getElementById("username");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const CpasswordInput = document.getElementById("Cpassword");

        // Get values
        const Signname = usernameInput.value.trim();
        const Signemail = emailInput.value.trim();
        const Signpassword = passwordInput.value;
        const SignConfirmpassword = CpasswordInput.value;


document.querySelectorAll('input').forEach(input => {
            input.classList.remove('input-error');
        })


        // Reset previous error styles
        // [usernameInput, emailInput, passwordInput, CpasswordInput].forEach(input => {
            // input.classList.remove('input-error');
        // });

        // Validation
        if (Signname ===""  || Signemail === "" || Signpassword === "" || SignConfirmpassword === "") {
            if (Signname === "") usernameInput.classList.add('input-error');
            if (Signemail === "") emailInput.classList.add('input-error');
            if (Signpassword === "") passwordInput.classList.add('input-error');
            if (SignConfirmpassword === "") CpasswordInput.classList.add('input-error');
            alert("All fields are mandatory");
            return false;
        }
      

          if (!/^[a-zA-Z\s]+$/.test(Signname)) {
            usernameInput.classList.add('input-error')
            alert("Name can only contain letters and spaces.");
            
            return false;
        }

         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Signemail)) {
            emailInput.classList.add('input-error')
            alert("Please enter a valid email.");
            return false;
    }


    // const SignemailPattern = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    //  if (!SignemailPattern.test(Signemail)) {
    //         alert("Please enter a valid email address.");
    //         return false;
    //     }


          if (Signpassword.length < 8 || Signpassword.length > 16) {
            passwordInput.classList.add('input-error')
            alert("Password length is not right");
            return false;
        }


        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(Signpassword)) {
            passwordInput.classList.add('input-error')
            alert("Password must include uppercase, lowercase, number, and special character.");
            return false;
        }


         if ( SignConfirmpassword != Signpassword){
            CpasswordInput.classList.add('input-error')
    alert("Please enter the same password");
    return false;
}


     const Users = {
        username: Signname,
        email: Signemail,
        password: Signpassword,
        Cpassword: SignConfirmpassword,


     }   
        
        localStorage.setItem("users", JSON.stringify(Users));
        localStorage.setItem("isLoggedIn", "true");
        // localStorage.setItem("email", Signemail);
        // localStorage.setItem("password", Signpassword); 

        alert("Sign-Up successful!");
    
        container?.classList.remove('active');
    

    });


    loginForm?.addEventListener('submit', (e) => {
       e.preventDefault();
       const logusernameInput = document.getElementById("Logusername");
        const logpasswordInput = document.getElementById("Logpassword");

        const logusername = logusernameInput.value.trim();
        const logpassword = logpasswordInput.value;

        const storedUser = JSON.parse(localStorage.getItem("users"));

        if (!storedUser || storedUser.username !== logusername || storedUser.password !== logpassword ){
            if(storedUser.username !== logusername) logusernameInput.classList.add('input-error'); 
            if(storedUser.password !== logpassword) logpasswordInput.classList.add('input-error');
         alert("Invalid Crendential")
        return;
    }
   localStorage.setItem("isLoggedIn", "true");
   alert("Login Successful!");
    window.location.href = "Camera-Capture.html";
    });
}


document.addEventListener('DOMContentLoaded', myFunction);



// For hide password working

// const icon =document.querySelectorAll ("toggle-password").forEach(icon => {
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', () => {

 const targetid = icon.getAttribute('data-target');
 const input = document.getElementById(targetid);

 if (input.type ==='password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
 }
 else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
    

 }
    });
});


