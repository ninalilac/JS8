'use strict';











// --- fetch


const div = document.getElementById("api-users");
const ulElement = document.getElementById('ul-list');
const btnLoad = document.getElementById ("loadmore");
const btnLoadPrev = document.getElementById("loadprev");
let currentPage = 1;
let totalPages;







function getUsersInfo (page) {

    fetch('https://reqres.in/api/users?page=' + page, {
        method: 'GET'
    })
    
    .then(function(response) {
        console.log(response); // received object detail information
        if (!response.ok) {
            throw response.status
        }
        return response.json();
    })
    
    .then(function(responseData) {
        console.log(responseData); // received info from link
        const fragment = document.createDocumentFragment();

        responseData.data.forEach(element => {
            const li = document.createElement('li');
            li.textContent = `${element.first_name} ${element.last_name}`;
            fragment.appendChild(li);
        });
        ulElement.innerHTML = " ";
        ulElement.appendChild(fragment);
        
        totalPages = responseData.total_Pages
    })
    
    .catch(function(error) {
        console.log(error);
        if (error == 404) {
            const pDescr = document.createElement('p');
            pDescr.textContent = "Server Error"
            div.appendChild(pDescr);
         }
    });
    
    
}

function toggleBtns() {
    getUsersInfo(currentPage);
    if (currentPage ===1) {
        btnLoadPrev.disabled = true;
    } else {
        btnLoadPrev.disabled = false;
    }


    if (currentPage === 2) {
        btnLoad.disabled = true;
    } else {
        btnLoad.disabled = false;
    }
}

btnLoadPrev.addEventListener ('click', function() {
    if (currentPage === 1) {
        return;
    }
   
    currentPage --;
    getUsersInfo(currentPage);
    toggleBtns();
})
  
  btnLoad.addEventListener("click", function () {
    if (currentPage == 2) {
      return;
    }
    // currentPage = currentPage + 1;
    // currentPage += 1;
    currentPage++;
    getUsersInfo(currentPage);
    toggleBtns();
  });
  
  toggleBtns();
  
  getUsersInfo(currentPage);
  
  
 //