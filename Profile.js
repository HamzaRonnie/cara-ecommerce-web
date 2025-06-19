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
    const name = document.getElementById("newName").value;
    const email = document.getElementById("newEmail").value;
    const about = document.getElementById("newAbout").value;

    document.getElementById("userName").textContent = name;
    document.getElementById("userEmail").textContent = email;
    document.getElementById("aboutMe").textContent = about;

    closeEditModal();
  }


  function move() {
    document.getElementById('transactionSidebar').classList.remove('translate-x-full');
  }

  function closeTransaction () {
    document.getElementById('transactionSidebar').classList.add('translate-x-full');
  }




  // 🔹 Section 1: Profile Image Load + Change
  const profilePic = document.getElementById("profilePic");
  const fileInput = document.getElementById("fileInput");

  // ✅ Load saved image from localStorage when page loads
  window.addEventListener("DOMContentLoaded", () => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      profilePic.src = savedImage;
    }
  });

  // ✅ On image click → open file input
  profilePic.addEventListener("click", () => fileInput.click());

  // ✅ On file change → show and save image
  fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgData = e.target.result;
        profilePic.src = imgData;
        localStorage.setItem("profileImage", imgData);
      };
      reader.readAsDataURL(file);
    }
  });


  // 🔹 Section 2: Balance Initialization & Transaction

//   const balanceSpan = document.getElementById('balance');

  const BalanceSpan = document.getElementById('Balance')

  // ✅ Initialize balance if not already stored
  function initializeBalance() {
    let balance = localStorage.getItem('userBalance');
    if (!balance) {
      balance = Math.floor(Math.random() * 9000) + 1000; // Random 4-digit
      localStorage.setItem('userBalance', balance);
    }
    // balanceSpan.textContent = balance;
    BalanceSpan.textContent = balance;
  }


  

 

  // 🔹 Section 3: Load User Data (Name, Email) and Verify Login

  document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userData = JSON.parse(localStorage.getItem("users"));

    // ❌ If not logged in, redirect to login page
    if (isLoggedIn !== "true" || !userData) {
      window.location.href = "login.html";
      return;
    }

    // ✅ Display user name and email
    document.getElementById("userName").textContent = userData.username;
    document.getElementById("userEmail").textContent = userData.email;

    // ✅ Initialize balance
    initializeBalance();
    

  });

  // 🔹 Section 4: Logout Function

  function logout() {
    localStorage.setItem("isLoggedIn", "false"); // Just log out (keep data)
    window.location.href = "login.html";
  }


  // function move() {
  //   window.location.href = "Transaction.html"
  // }

  // 🔹 Section 5: Expose transaction for buttons (optional)
//   window.makeTransaction = makeTransaction;
//   window.logout = logout;



function toggleColumn (columnClass) { 
  const elements = document.querySelectorAll('.' + columnClass);
  elements.forEach(ele => {
  ele.classList.remove('invisible');
  });
  renderTable();
}


let currentPage = 1;
const rowsPerPage = 3;
let sortDirections = [null,'asc','asc'];
let loginHistory = [];

// let transactionHistory = JSON.parse(localStorage.getItem('transactionHistory') || '[]').reverse();

  document.addEventListener('DOMContentLoaded', function() {
    // const HistoryBody = document.getElementById('transactionHistoryBody');
    const historyBody = document.getElementById('loginHistoryBody');
     loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]').reverse();
    
  
  if (!historyBody) {
    console.error("Element with id 'loginHistoryBody' not found.");
    return;
  }
  

  document.getElementById('dateCheckbox').addEventListener('change', renderTable);
  document.getElementById('browserCheckbox').addEventListener('change', renderTable);



document.getElementById('searchInput').addEventListener('keyup', () => {
  currentPage = 1;
  renderTable();
});



renderTable();

});

function renderTable() {
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
    let transactionHistory = JSON.parse(localStorage.getItem('transactionHistory') || '[]').reverse();
    
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
    
      // Success
      // alert(`✅ Transaction of $${amount} Successful!`);


//  ✅ Perform transaction (detuct amount) 
  let currentBalance = parseInt(localStorage.getItem('userBalance'));

  if(isNaN(amount) || amount <= 0) {
    alert ("Please enter a valid amount.");
    return;
  }

  if (currentBalance >= amount) {
    const newBalance = currentBalance - amount;
    localStorage.setItem('userBalance', newBalance);
    BalanceSpan.textContent = newBalance;



     const transactionHistory = JSON.parse(localStorage.getItem('transactionHistory') || '[]');

     const newTransaction = {
      cardNumber : cardNumber,
      amount : amount,
      date : new Date () .toISOString(),
      cvc : cvc,
      status : 'Success',
      
    };

    transactionHistory.unshift(newTransaction);
    localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
    // Success
    alert(`✅Rs. ${amount} paid successfully!`);
  } else {


const transactionHistory = JSON.parse(localStorage.getItem('transactionHistory') || '[]');

const failedTransaction = {
  cardNumber : cardNumber,
  amount : amount,
  date : new Date ().toISOString(),
  cvc : cvc,
  status : 'Failed',

};

transactionHistory.unshift(failedTransaction);
localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));

    alert('❌ Insufficient balance!');
  }

if (typeof renderTransactionTable === 'function') {
  renderTransactionTable();
}

      closeTransaction();
    }
    








    // const VALID_CARD_NUMBER = 42424242424242;
    // const VALID_CVC = 357;


    // function makeTransaction(amount) {
    //   const cardNumber = document.querySelector('#Moveon input[type="text"]').value.trim();
    //   const expiryDate = new Date (document.querySelector('#Moveon input[type="date"]').value);
    //   const cvc = document.querySelector('#Moveon input[type="number"]').value.trim();

    //   const today = new Date ();
    //   today.setHours (0, 0, 0, 0);


    //   if (cardNumber !== VALID_CARD_NUMBER) {
    //      alert ('Invalid Card Number');
    //     return;
    //   }

    //   if(!expiryDate || expiryDate <= today) {
    //     alert('Card is Expired');
    //     return;
    //   }

    //   if (cvc !== VALID_CVC) {
    //     alert ('Invalid CVC');
    //     return;
    //   }

    //   alert (`Transaction of $${amount} Successful!`);
    //   closeTransaction();



    // }