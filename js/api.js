//global variables
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchDiv = document.getElementById("search-div");
const errorDiv = document.getElementById("error-div");
const searchResultDiv = document.getElementById("search-results");
const spinner = document.getElementById("spinner");

//search button handler
searchBtn.addEventListener("click", () => {
  // clearing messages and display
  clearingDisplay();
  const searchText = searchInput.value;
  const url = `https://openlibrary.org/search.json?q=${searchText}`;

  //enabling spinner
  searchInput.value = "";
  spinner.classList.remove("d-none");
  spinner.classList.add("block");
  //fetch data from the server
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //data error handler after fetch
      if (data.numFound === 0) {
        errorDiv.classList.remove("d-none");
        errorDiv.classList.add("block");
        removingSpinner();
        //data display processing
      } else {
        searchDiv.classList.remove("d-none");
        searchDiv.classList.add("block");
        searchDiv.innerText = `${data.numFound} books found`;
        return displayResults(data.docs);
      }
    });
});

//clearing display results, error log and results counter
const clearingDisplay = () => {
  searchResultDiv.textContent = "";
  searchDiv.classList.remove("block");
  searchDiv.classList.add("d-none");
  errorDiv.classList.remove("block");
  errorDiv.classList.add("d-none");
};
//removing spinner
const removingSpinner = () => {
  spinner.classList.remove("block");
  spinner.classList.add("d-none");
};

//displaying results
const displayResults = (books) => {
  //looping data array through forEach
  books.slice(0, 36).forEach((book) => {
    const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    const div = document.createElement("div");
    //dynamic div creation and setting loop result
    div.classList.add("col");
    div.innerHTML = `
      <div class="card flex-row mb-3" style="max-width: 600px;">
        <div class="row g-0">
        <img src="${
          book.cover_i ? `${coverUrl}` : `images/no-preview.png`
        }" class="img-fluid rounded-start" alt="" style="width: 180px; height:240px;" />
        </div>
        <div class="col-md-8 d-flex align-items-center">
            <div class="card-body d-flex flex-column align-items-start ">
                <h5 class="card-title fw-bolder">${book.title}</h5>
                <h6 class="card-title">By<span class="text-primary">${
                  book.author_name
                    ? ` ${book.author_name[0]}</span>`
                    : `Author not available`
                }</h6>
                <h6 class="card-title">${
                  book.publisher
                    ? `Publisher: ${book.publisher[0]}`
                    : `Publisher not available`
                }</h6>
                <p class="card-text">${
                  book.first_publish_year
                    ? ` First published in : ${book.first_publish_year}`
                    : `<span class="fst-italic">First published info not available</span>`
                }</p>                
            </div>
        </div>
    </div>
</div>
    `;
    //appending dynamic data and removing spinner
    searchResultDiv.appendChild(div);
    removingSpinner();
  });
};
