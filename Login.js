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




document.addEventListener('DOMContentLoaded', myFunction);


let listenerAdded = false;

function myFunction() {
    const container = document.querySelector ('.container');
    const signupForm = document.getElementById ('signupForm');
    const loginForm = document.getElementById ('loginForm');
    // const SignBtn = document.querySelector('.form');

// if(!signupForm) {
    // console.log("Signup Form is not Found!");
    // return;
// }


    if (listenerAdded) return;
    listenerAdded = true;


    signupForm?.addEventListener('submit', function (e)  {
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
        });


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
        balance: Math.floor(Math.random() * 9000) + 1000,
        loginHistory: [],
        transactionHistory: [],
        profilePic: "default.png"
        // Cpassword: SignConfirmpassword,
     }




          // ✅ Step 3: Load existing users safely from localStorage
          let users = [];
          try {
            const data = localStorage.getItem("users");
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed)) {
              users = parsed;
            } else {
              console.warn("Expected array, got something else. Resetting.");
              users = [];
              localStorage.removeItem("users");
            }
          } catch (err) {
            console.error("Failed to parse users from localStorage:", err);
            users = [];
            localStorage.removeItem("users");
          }






    //  let users = JSON.parse(localStorage.getItem("users")) || [];

     const existingUser = users.some(user => user.username === Signname || user.email === Signemail);

     if (existingUser) {
        alert ("Username or Email already exists!");
        return;
     };


    users.push(Users);


        
        localStorage.setItem("users", JSON.stringify(users));

        // localStorage.setItem(`${username}_balance`, Math.floor(Math.random() * 9000) + 1000); // Random balance
    // localStorage.setItem(`${username}_loginHistory`, JSON.stringify([])); //


        localStorage.setItem("isLoggedIn", "true");
         localStorage.setItem('loggedInUser', JSON.stringify(Users));

        alert("Sign-Up successful!");
    
        signupForm.reset();
        container?.classList.remove('active');
    

    });

   

// Login Form Code Start Here!


    loginForm?.addEventListener('submit', function (e)  {
       e.preventDefault();

       const logusernameInput = document.getElementById("Logusername");
        const logpasswordInput = document.getElementById("Logpassword");

        const logusername = logusernameInput.value.trim();
        const logpassword = logpasswordInput.value;

        const storedUser = JSON.parse(localStorage.getItem("users")) || [];

const user = storedUser.find(u => u.username === logusername && u.password === logpassword);


if (!user) {
    logusernameInput.classList.add("input-error");
    logpasswordInput.classList.add("input-error");
    alert("Invalid Credential!");
    return;
}

// const noRow = new Date().toLocaleString();
// user.loginHistory = user.loginHistory || [];
// user.loginHistory.push(`Logged in at ${now}`);


// const updatedUsers = user.map(u => u.username === user.username ? user : u);
// localStorage.setItem("users", JSON.stringify(updatedUsers));


    //     if (!storedUser || storedUser.username !== logusername || storedUser.password !== logpassword ){
    //         if(storedUser.username !== logusername) logusernameInput.classList.add('input-error'); 
    //         if(storedUser.password !== logpassword) logpasswordInput.classList.add('input-error');
    //      alert("Invalid Crendential")
    //     return;
    // }
   localStorage.setItem("isLoggedIn", "true");
   localStorage.setItem("loggedInUser", JSON.stringify(user));
// localStorage.setItem("isLoggedIn", "true");
//   localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

  // ✅ Save login history for that user
  const loginHistoryKey = `loginHistory_${user.username}`;
  const currentHistory = JSON.parse(localStorage.getItem(loginHistoryKey) || "[]");
  currentHistory.push({
    time: new Date().toLocaleString(),
  });
  localStorage.setItem(loginHistoryKey, JSON.stringify(currentHistory));


   alert("Login Successful!");
    window.location.href = "Camera-Capture.html";
    });
}





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


