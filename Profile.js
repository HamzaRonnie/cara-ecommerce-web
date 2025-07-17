function editProfile() {
    // Show the modal
    document.getElementById("editProfileModal").classList.remove("hidden");

    // Prefill current data
    document.getElementById("newName").value = document.getElementById("userName").textContent;
    document.getElementById("newEmail").value = document.getElementById("userEmail").textContent;
    document.getElementById("newAbout").value = document.getElementById("aboutMe").textContent;
  }

  function closeEditModal() {
    document.getElementById("editProfileModal").classList.add("hidden");
  }

  function saveProfile() {
    const name = document.getElementById("newName").value.trim();
    const email = document.getElementById("newEmail").value.trim();
    const about = document.getElementById("newAbout").value.trim();

// if (!name || email ) {
//   alert ("Please Name or Email are mandetory");
//   return;
// }

    document.getElementById("userName").textContent = name;
    document.getElementById("userEmail").textContent = email;
    document.getElementById("aboutMe").textContent = about;

    closeEditModal();



  // ✅ Save to localStorage for persistence
const user = JSON.parse(localStorage.getItem("loggedInUser"));

const oldUsername = user.username;
const oldEmail = user.emai;

user.username = name;
user.email = email;
user.about = about;
localStorage.setItem("loggedInUser", JSON.stringify(user));

const users = JSON.parse(localStorage.getItem("users") || "[]")

const index = users.findIndex(u => u.username === oldUsername && u.email === oldEmail);

if (index !== -1) {
  users [index] = user;
  localStorage.setItem("users", JSON.stringify(users));
}   else {
    alert("❌ User not found in users[] list!");
  }  


  }




  function move() {
    document.getElementById('transactionSidebar').classList.remove('translate-x-full');
  }

  function closeTransaction () {
    document.getElementById('transactionSidebar').classList.add('translate-x-full');
  }





window.addEventListener("DOMContentLoaded", () => {

    const fileInput = document.getElementById('fileInput');
    const uploadFromFile = document.getElementById('uploadFromFile');
    const profilePic = document.getElementById('profilePic');
    const openCamera = document.getElementById('openCamera');
    const cameraModal = document.getElementById('cameraModal');
    const video = document.getElementById('video');
    const captureBtn = document.getElementById('captureBtn');
    const closeCamera = document.getElementById('closeCamera');
    const BalanceSpan = document.getElementById('Balance')
    const loginHistory = document.getElementById('loginHistoryBody');
    const tnxHistory = document.getElementById('transactioHistoryBody');
    let stream;


      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  // const currentUserStr = localStorage.getItem("loggedInUser");
const currentUserStr = localStorage.getItem("loggedInUser");
if (!isLoggedIn || !currentUserStr) {
 alert ("No login user exists!");
 window.location.href = "login.html";
  return;
}
 const currentUser = JSON.parse(currentUserStr);
   const users = JSON.parse(localStorage.getItem("users") || "[]");
//  const username = currentUser.username;


  // 🔹 Find the full user object from stored users
  const user = users.find(
    u => u.username === currentUser.username && u.email === currentUser.email
  );

  if (!user) {
    alert("User data not found. Please login again.");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
    return;
  }

  const username = user.username;



  // 🔹 Display user details
  document.getElementById("userName").textContent = user.username;
  document.getElementById("userEmail").textContent = user.email;
  document.getElementById("aboutMe").textContent = user.about || "About you...";
  BalanceSpan.textContent = user.balance || "0";





  // ✅ Initialize balance if not already stored
  function initializeBalance() {
    let balance = localStorage.getItem(`userBalance_${username}`);
    if (!balance) {
      balance = Math.floor(Math.random() * 9000) + 1000; // Random 4-digit
      localStorage.setItem(`userBalance_${username}`, balance);
    }
    // balanceSpan.textContent = balance;
    BalanceSpan.textContent = balance;
  }

  initializeBalance();


  updateLoginHistory();


  // ————— LOGIN HISTORY —————
  function updateLoginHistory() {

const currentUserStr = localStorage.getItem("currentUser");

  if (!currentUserStr) {
    console.error("❌ No current user found in localStorage.");
    return;
  }


const currentUser = JSON.parse(currentUserStr);
const username = currentUser.username;
  console.log("📛 username:", username);


    const key = `loginHistory_${username}`;
    const hist = JSON.parse(localStorage.getItem(key) || "[]");

    
  if (!sessionStorage.getItem("loginRecorded")) {

const image = localStorage.getItem(`profileImage_${username}`) || ""; // current image
  const browser = detectBrowser(navigator.userAgent);
  const entry = {
    date: new Date().toLocaleString(),
    photo: image || "",
    browser: browser
  };


  hist.unshift(entry);
  localStorage.setItem(key, JSON.stringify(hist));
  sessionStorage.setItem("loginRecorded", "true");
  loginHistory = hist;
  // loginHistory.innerHTML = hist.map(item => `<li>${item}</li>`).join("");


  }

  renderLoginHistoryTable();

}



function renderLoginHistoryTable() {
// ✅ Yahan karo

  // const currentUser = JSON.parse(currentUserStr);
  // const username = currentUser.username;
  //   console.log("📛 username:", username);

  const currentUserStr = localStorage.getItem("loggedInUser"); // Same as used in capture.js
  if (!currentUserStr) {
    console.error("No logged-in user found.");
    return;
  }

  const currentUser = JSON.parse(currentUserStr);
  const username = currentUser.username;



  const key = `loginHistory_${username}`;
  const hist = JSON.parse(localStorage.getItem(key) || "[]");

  const LoginContainer = document.getElementById("loginHistoryBody");
  if (!LoginContainer) {
    console.log("❌ loginHistoryBody not found!");
    return;
  }

  if (hist.length === 0) {
    LoginContainer.innerHTML = `<tr><td colspan='3' class="py-4 text-gray-500">No login history found.</td></tr>`;
    return;
  }

  LoginContainer.innerHTML = hist.map(item => `
    <tr class="hover:bg-gray-100 transition">
      <td class="border px-4 py-2 cursor-pointer"><img src="${item.photo}" class="rounded-full w-14 h-14 object-cover mx-auto"/></td>
      <td class="border px-4 py-2 cursor-pointer">${item.date}</td>
      <td class="border px-4 py-2 cursor-pointer">${item.browser}</td>
    </tr>
  `).join("")
}




// function detectBrowser(userAgent) {
//   userAgent = userAgent.toLowerCase();
//   if (userAgent.includes("chrome") && !userAgent.includes("edg") && !userAgent.includes("opr")) {
//     return "Chrome";
//   }
//   if (userAgent.includes("firefox")) {
//     return "Firefox";
//   }
//   if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
//     return "Safari";
//   }
//   if (userAgent.includes("opr") || userAgent.includes("opera")) {
//     return "Opera";
//   }
//   if (userAgent.includes("edg")) {
//     return "Edge";
//   }
//   return "Other";
// }




  // ————— TRANSACTION HISTORY —————
  function loadTxnHistory() {

const currentUserStr = localStorage.getItem("loggedInUser");
// if (!currentUserStr) return;
  if (!currentUserStr) {
    console.log("❌ No logged in user found");
    return;
  }
const currentUser = JSON.parse(currentUserStr);
const username = currentUser.username;

    const key = `tnxHistory_${username}`;
    const hist = JSON.parse(localStorage.getItem(key) || "[]");
  
  const txnContainer = document.getElementById("transactioHistoryBody");
  if (!txnContainer) {
    console.log("❌ transactioHistoryBody not found in HTML!");
    return;
  }

  if (hist.length === 0) {
    txnContainer.innerHTML = "<li>No transactions found.</li>";
    return;
  }



    txnContainer.innerHTML = hist.map(t => `<li>${t.date} – ${t.amount}</li>`).join("");
  }
  loadTxnHistory();





     const savedImage = localStorage.getItem(`profileImage_${username}`);
    if (savedImage) {
      profilePic.src = savedImage;
    }
    // Upload from gallery/file

uploadFromFile.addEventListener('click', () => fileInput.click());

    profilePic.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const imgData = e.target.result;
          profilePic.src = imgData;
          localStorage.setItem(`profileImage_${username}`, imgData); 
        };
        reader.readAsDataURL(file);
      }
    });

    // Open camera modal
    openCamera.addEventListener('click', async () => {
      cameraModal.classList.remove('hidden');
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

await new Promise(resolve => {
  video.onloadedmetadata = () => {
    video.play();
    resolve();
  }
});

      } catch (err) {
         console.error("Camera Error:", err);
        alert("Camera not accessible. Please check permissions.");
      }
    });

    // Capture from camera
    captureBtn.addEventListener('click', () => {

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        alert ("video is not yet ready. Please wait a moment.");
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

const maxSize = 400;

let w = video.videoWidth;
let h = video.videoHeight;      

if (w > h) {
  if (w > maxSize) {
    h *= maxSize  / w;
    w = maxSize;
  }
} else {
  if ( h > maxSize) {
    w *= maxSize / h;
    h = maxSize;
  }
}

canvas.width = w;
canvas.height = h;


      ctx.drawImage(video, 0, 0, w, h);

      const imageDataURL = canvas.toDataURL('image/png');
      profilePic.src = imageDataURL;

        try {
    localStorage.setItem(`profileImage_${username}`, imageDataURL);
    console.log('✅ Image saved to localStorage');
  } catch (e) {
    console.error('❌ Failed to save image to localStorage:', e);
    alert("Failed to save image. Maybe it's too large?");
  }

      // localStorage.setItem('profileImage', imageDataURL);
      

      stream.getTracks().forEach(track => track.stop());
      cameraModal.classList.add('hidden');
    });

    // Close camera modal
    closeCamera.addEventListener('click', () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      cameraModal.classList.add('hidden');
    });








  // 🔹 Section 1: Profile Image Load + Change
  // const CameraBtn = document.getElementById('cameraBtn')
  // const profilePic = document.getElementById("profilePic");
  // const fileInput = document.getElementById("fileInput");

  // ✅ Load saved image from localStorage when page loads
 

  });


     function logout() {
    localStorage.setItem("isLoggedIn", "false"); // Just log out (keep data)
    window.location.href = "login.html";
  }

  // ✅ On image click → open file input
  

  // 🔹 Section 2: Balance Initialization & Transaction

//   const balanceSpan = document.getElementById('balance');


function toggleColumn (columnClass) { 
  const elements = document.querySelectorAll('.' + columnClass);
  elements.forEach(ele => {
  ele.classList.remove('invisible');
  });
  renderLoginHistoryTable();
}


let loginHistory = [];
let currentPage = 1;
const rowsPerPage = 3;
let sortDirections = [null,'asc','asc'];

// let transactionHistory = JSON.parse(localStorage.getItem('transactionHistory') || '[]').reverse();

  document.addEventListener('DOMContentLoaded', function() {
    // const HistoryBody = document.getElementById('transactionHistoryBody');
    const historyBody = document.getElementById('loginHistoryBody');

    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const username = currentUser?.username || "guest";
     loginHistory = JSON.parse(localStorage.getItem(`loginHistory_${username}`) || '[]').reverse();
    
  
  if (!historyBody) {
    console.error("Element with id 'loginHistoryBody' not found.");
    return;
  }
  

  document.getElementById('dateCheckbox').addEventListener('change', renderTable);
  document.getElementById('browserCheckbox').addEventListener('change', renderTable);



document.getElementById('searchInput').addEventListener('keyup', () => {
  currentPage = 1;
  renderLoginHistoryTable();
});



renderLoginHistoryTable();

});

function renderLoginHistoryTable() {
// const HistoryBody = document.getElementById('transactionHistoryBody');
const historyBody = document.getElementById('loginHistoryBody');
const searchValue = document.getElementById('searchInput').value.toLowerCase();

const showDate = document.getElementById('dateCheckbox').checked;
const showBrowser = document.getElementById('browserCheckbox').checked;



const dateClass = showDate ? '' : 'invisible';
const browserClass = showBrowser ? '' : 'invisible';


document.querySelectorAll('.dateCol').forEach(col => col.style.display = showDate ? '' : 'none');
document.querySelectorAll('.browserCol').forEach(col => col.style.display = showBrowser ? '' : 'none');

  // HistoryBody.innerHTML = ''
  historyBody.innerHTML = ''


const filtered = loginHistory.filter(item => {
  let match = false;
  if (showDate && item.date.toLowerCase().includes(searchValue)) match = true;
  if ( showBrowser && item.browser.toLowerCase().includes(searchValue)) match = true;
  return  match;
  // item.browser.toLowerCase().includes(searchValue) ||
  // item.date.toLowerCase().includes(searchValue)
});

const totalPages = Math.ceil(filtered.length / rowsPerPage);
currentPage =  Math.min(currentPage, totalPages) || 1;
const start = (currentPage - 1) * rowsPerPage;
const paginatedData = filtered.slice(start, start + rowsPerPage);



if (paginatedData.length === 0){
const noRow = document.createElement('tr');
noRow.innerHTML = `<td colspan="3" class="text-center text-gray-500 py-6">No loginHistory found.</td>`;
historyBody.appendChild(noRow);
// renderPagination(filtered.length);
return;
}

paginatedData.forEach(item => {
  const row = document.createElement('tr');
  row.classList = 'border-t';

// const dateClass = showDate ? 'dateCol' : 'dateCol invisible';
// const browserClass = showBrowser ? 'browserCol' : 'browserCol invisible'


  row.innerHTML = `

  <td class="px-4 py-2 border border-gray-100 photoCol"><span class="photoCol transition-opacity duration-300"><img src="${item.photo}" alt="Login Photo" class="rounded-full w-20 h-20"/></span></td> 
  <td class="px-4 py-2 border border-gray-100 dateCol"><span class="dateCol transition-opacity duration-300 ${dateClass}">${item.date}</span></td>
  <td class="px-4 py-2 border border-gray-100 browserCol"><span class="browserCol transition-opacity duration-300 ${browserClass}">${item.browser}</span></td>
`;

  historyBody.appendChild(row);

});

renderPagination(filtered.length);
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const container = document.getElementById('paginationControls');
  container.innerHTML = '';

  if  (totalPages <= 1) return;

  const createButton = (text, page) => {
   const btn = document.createElement("button");
   btn.textContent = text;
   btn.className = `px-3 py-1 rounded border border-gray-400 hover:bg-gray-200 ${page === currentPage? 'bg-blue-500 text-white' : '' }`;
   btn.onclick = () => {
    currentPage = page;
    renderTable();
   };

   return btn;
  };


  if (currentPage > 1) container.appendChild(createButton('prev', currentPage - 1 ));
  for (let i = 1; i <= totalItems; i++) container.appendChild(createButton(i, i));
  if (currentPage < totalPages) container.appendChild(createButton('Next', currentPage + 1));
}




// document.getElementById('dateSortIcon').addEventListener('click', (e) => {
// e.stopPropagation();
// sortTable(1);
// }); 
// document.getElementById('browserSortIcon').addEventListener('click', () => sortTable(2));


function sortLoginTable (colIndex) {
  const direction = sortDirections[colIndex] === 'asc' ? 'desc' : 'asc';
  sortDirections[colIndex] = direction;

  loginHistory.sort((a,b) => {
    let aVal, bVal;

    if (colIndex === 1){
    aVal = new Date(a.date);
    bVal = new Date(b.date);
  }
   else if (colIndex ===2){
    aVal = a.browser.toLowerCase();
    bVal = b.browser.toLowerCase();
   }


if (aVal < bVal) return direction === 'asc' ? -1 : 1;
if (aVal > bVal) return direction === 'asc' ? 1 : -1;
return 0;

  });


  document.getElementById('dateSortIcon').textContent = '⬍';
  document.getElementById('browserSortIcon').textContent = '⬍';
  document.getElementById('dateSortIcon').classList.remove('text-blue-700', 'font-bold');
  document.getElementById('browserSortIcon').classList.remove('text-blue-700', 'font-bold');

if (colIndex === 1) {
  document.getElementById('dateSortIcon').textContent = direction === 'asc' ? '▲' : '▼';
  document.getElementById('dateSortIcon').classList.add('text-blue-700', 'font-bold');
}
else if (colIndex === 2) {
  document.getElementById('browserSortIcon').textContent = direction === 'asc' ? '▲' : '▼'; 
  document.getElementById('browserSortIcon').classList.add('text-blue-700', 'font-bold');
}

  renderTable();

} 
     
    
    window.clearHistory = function() {
      localStorage.removeItem('loginHistory');
      location.reload();
    };
  
 


  
    function toggleColumn(columnClass, isChecked) {

      const headers = document.querySelectorAll(`th.${columnClass}`);
      const cells = document.querySelectorAll(`td.${columnClass}`);

      
     headers.forEach(header => {
     header.style.display = isChecked ? '' : 'none'; // Show header
    });

    cells.forEach(cell => {
      cell.style.display = isChecked ? '' : 'none'
    });




  }

  //   } cell.style.display = ''); // Show data cells
  // } else {
  //   header.style.display = 'none'; // Hide header
  //   cells.forEach(cell => cell.style.display = 'none'); // Hide data cells
  // }
      // const elements = document.querySelectorAll('.' + columnClass);
      // elements.forEach(ele => {
      //   ele.classList.toggle('invisible');
      // });
    
    // renderTransactionTable();

    let currentsPage = 1;
    const rowssPerPage = 3;
    let sortsDirections = [null, null, null, 'asc', 'asc', 'asc', 'asc', 'asc'];

    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const username = currentUser?.username || "guest";
    let transactionHistory = JSON.parse(localStorage.getItem(`tnxHistory_${username}`) || '[]').reverse();
    
    document.addEventListener('DOMContentLoaded', () => {
      // if (!localStorage.getItem('transactionHistory')) {
      //   localStorage.setItem('transactionHistory', JSON.stringify([
      //     {
      //       cardNumber: 'T1234',
      //       amount: 5000,
      //       date: '2025-05-19T10:30:00',
      //       cvc: '123',
      //       status: 'Success'
      //     },
      //     {
      //       cardNumber: 'T1235',
      //       amount: 2500,
      //       date: '2025-05-18T12:00:00',
      //       cvc: '456',
      //       status: 'Failed'
      //     },
      //     {
      //       cardNumber: 'T1236',
      //       amount: 3000,
      //       date: '2025-05-20T15:00:00',
      //       cvc: '789',
      //       status: 'Success'
      //     }
      //   ]));
      // }


      // transactionHistory = JSON.parse(localStorage.getItem('transactionHistory') || '[]').reverse();
      renderTransactionTable();

    
      document.getElementById('SearchInput').addEventListener('keyup', () => {
        currentsPage = 1;
        renderTransactionTable();
      });

    

    });
  
    
    function renderTransactionTable() {
      const tbody = document.getElementById('transactionHistoryBody');
      const searchValue = document.getElementById('SearchInput').value.toLowerCase();
      tbody.innerHTML = '';
    
      const visibleKeys  = [];

       if (document.getElementById('idCheckbox').checked)visibleKeys.push('cardNumber');
       if (document.getElementById('amountCheckbox').checked)visibleKeys.push('amount');
       if (document.getElementById('tradateCheckbox').checked)visibleKeys.push('date');
       if (document.getElementById('cvcCheckbox').checked)visibleKeys.push('cvc');
       if (document.getElementById('statusCheckbox').checked)visibleKeys.push('status');



        const filtered = transactionHistory.filter(item => {
      return visibleKeys.some(key => {
        const value = item[key]?. toString().toLowerCase();
         return value?.includes(searchValue);
      })
    });
    
      const totalPages = Math.ceil(filtered.length / rowssPerPage);
      currentsPage = Math.min(currentsPage, totalPages) || 1;
      const start = (currentsPage - 1) * rowssPerPage;
      const paginatedData = filtered.slice(start, start + rowssPerPage);
    
      if (paginatedData.length === 0) {
        const noRow = document.createElement('tr');
        noRow.innerHTML = `<tr><td colspan="5" class="text-center text-gray-500 py-6">No transaction history found.</td></tr>`;
        tbody.appendChild(noRow);
        return;
      }
    
      paginatedData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="border px-4 py-2 idCol">${item.cardNumber}</td>
          <td class="border px-4 py-2 amountCol">${item.amount}</td>
          <td class="border px-4 py-2 tradateCol">${new Date (item.date).toLocaleString()}</td>
          <td class="border px-4 py-2 cvcCol">${item.cvc}</td>
          <td class="border px-4 py-2 statusCol ${item.status === 'Success' ? 'text-green-600' : 'text-red-600'}">${item.status}</td>
        `;
        tbody.appendChild(row);
      });
    
      renderTransactionPagination(filtered.length);


      toggleColumn('idCol', document.getElementById('idCheckbox').checked);
      toggleColumn('amountCol', document.getElementById('amountCheckbox').checked);
      toggleColumn('tradateCol', document.getElementById('tradateCheckbox').checked);
      toggleColumn('cvcCol', document.getElementById('cvcCheckbox').checked);
      toggleColumn('statusCol', document.getElementById('statusCheckbox').checked);

    




    }
    
    function renderTransactionPagination(totalItems) {
      const totalPages = Math.ceil(totalItems / rowssPerPage);
      const container = document.getElementById('PaginationControls');
      container.innerHTML = '';
    
      if (totalPages <= 1) return;
    
      const createButton = (text, page) => {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.className = `px-3 py-1 rounded border border-gray-400 hover:bg-gray-200 ${page === currentsPage ? 'bg-blue-500 text-white' : ''}`;
        btn.onclick = () => {
          currentsPage = page;
          renderTransactionTable();
        };
        return btn;
      };
    
      if (currentsPage > 1) container.appendChild(createButton('Prev', currentsPage - 1));
      for (let i = 1; i <= totalPages; i++) container.appendChild(createButton(i, i));
      if (currentsPage < totalPages) container.appendChild(createButton('Next', currentsPage + 1));
    }
    
    function sortTable(colIndex) {
      const direction = sortsDirections[colIndex] === 'asc' ? 'desc' : 'asc';
      sortsDirections[colIndex] = direction;
    
      transactionHistory.sort((a, b) => {
        let aVal, bVal;
        if (colIndex === 3) {
          aVal = a.cardNumber.toLowerCase();
          bVal = b.cardNumber.toLowerCase();
        } else if (colIndex === 4) {
          aVal = parseFloat(a.amount);
          bVal = parseFloat(b.amount);
        } else if (colIndex === 5) {
          aVal = new Date(a.date);
          bVal = new Date(b.date);
        } else if (colIndex === 6) {
          aVal = a.cvc.toLowerCase();
          bVal = b.cvc.toLowerCase();
        } else if (colIndex === 7) {
          aVal = a.status.toLowerCase();
          bVal = b.status.toLowerCase();
        }
    
        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
      });



      
  document.getElementById('idSortIcon').textContent = '⬍';
  document.getElementById('amountSortIcon').textContent = '⬍';
  document.getElementById('tradateSortIcon').textContent = '⬍';
  document.getElementById('cvcSortIcon').textContent = '⬍';
  document.getElementById('statusSortIcon').textContent = '⬍';

  document.getElementById('idSortIcon').classList.remove('text-blue-700', 'font-bold');
  document.getElementById('amountSortIcon').classList.remove('text-blue-700', 'font-bold');
  document.getElementById('tradateSortIcon').classList.remove('text-blue-700', 'font-bold');
  document.getElementById('cvcSortIcon').classList.remove('text-blue-700', 'font-bold');
  document.getElementById('statusSortIcon').classList.remove('text-blue-700', 'font-bold');

if (colIndex === 3) {
  document.getElementById('idSortIcon').textContent = direction === 'asc' ? '▲' : '▼';
  document.getElementById('idSortIcon').classList.add('text-blue-700', 'font-bold');
}
else if (colIndex === 4) {
  document.getElementById('amountSortIcon').textContent = direction === 'asc' ? '▲' : '▼'; 
  document.getElementById('amountSortIcon').classList.add('text-blue-700', 'font-bold');
}

else if (colIndex === 5) {
  document.getElementById('tradateSortIcon').textContent = direction === 'asc' ? '▲' : '▼';
  document.getElementById('tradateSortIcon').classList.add('text-blue-700', 'font-bold');
}


else if (colIndex === 6) {
  document.getElementById('cvcSortIcon').textContent = direction === 'asc' ? '▲' : '▼';
  document.getElementById('cvcSortIcon').classList.add('text-blue-700', 'font-bold');
}


else if (colIndex === 7) {
  document.getElementById('statusSortIcon').textContent = direction === 'asc' ? '▲' : '▼';
  document.getElementById('statusSortIcon').classList.add('text-blue-700', 'cursor-pointer', 'font-bold');
}


      renderTransactionTable();
    }
    

    window.ClearHistory = function () {
      localStorage.removeItem('transactionHistory')
      location.reload();
    };




    const VALID_CARD_NUMBER = "42424242424242"; // Correct spelling and string
    const VALID_CVC = "357"; // Also string
    
    function makeTransaction() {
      const inputs = document.querySelectorAll('#Moveon input');
      const cardNumber = inputs[0].value.trim();
      const expiryDate = new Date(inputs[1].value);
      const amountInput = inputs[2];
      const amount = parseInt(amountInput.value);
      const cvc = inputs[3].value.trim();
    

const today = new Date();
today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() +1);
    
      // Card Number Check
      if (cardNumber !== VALID_CARD_NUMBER) {
        alert('❌ Invalid Card Number');
        return;
      }
    
      // Expiry Date Check
      if (!expiryDate || expiryDate < tomorrow)
      if (!expiryDate || expiryDate.getFullYear() !== tomorrow.getFullYear() ||
          expiryDate.getMonth() !== tomorrow.getMonth() ||
          expiryDate.getDate() !== tomorrow.getDate()
        ) {
        alert('❌ Card is Expired');
        return;
      }
    
      // CVC Check
      if (cvc !== VALID_CVC) {
        alert('❌ Invalid CVC');
        return;
      }


  // ✅ Fetch current logged-in user
  const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!currentUser || !currentUser.username) {
    alert('❌ User not logged in.');
    return;
  }

    
      // Success
      // alert(`✅ Transaction of $${amount} Successful!`);


    const username = currentUser.username;
    const balanceKey = `userBalance_${username}`;
    const tnxKey = `tnxHistory_${username}`;



//  ✅ Perform transaction (detuct amount) 
  let currentBalance = parseInt(localStorage.getItem(balanceKey) || "0");

  if(isNaN(amount) || amount <= 0) {
    alert ("Please enter a valid amount.");
    return;
  }

  if (currentBalance >= amount) {
    const newBalance = currentBalance - amount;
    localStorage.setItem(balanceKey, newBalance);

    if ( typeof BalanceSpan !== "undefined") {
    BalanceSpan.textContent = newBalance;
    }


     const transactionHistory = JSON.parse(localStorage.getItem(tnxKey) || '[]');

     const newTransaction = {
      cardNumber : cardNumber,
      amount : `- ₹${amount}`,
      date : new Date () .toLocaleString(),
      cvc : cvc,
      status : 'Success',
      
    };

    transactionHistory.unshift(newTransaction);
    localStorage.setItem(tnxKey, JSON.stringify(transactionHistory));
    // Success
    alert(`✅Rs. ${amount} paid successfully!`);
  } else {


const transactionHistory = JSON.parse(localStorage.getItem(tnxKey) || '[]');

const failedTransaction = {
  cardNumber : cardNumber,
  amount : `- ₹${amount}`,
  date : new Date ().toISOString(),
  cvc : cvc,
  status : '❌ Failed',

};

transactionHistory.unshift(failedTransaction);
localStorage.setItem(tnxKey, JSON.stringify(transactionHistory));

    alert('❌ Insufficient balance!');
  }

if (typeof renderTransactionTable === 'function') {
  renderTransactionTable();
}

      closeTransaction();
    }
    
