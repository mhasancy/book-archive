// const error = document.getElementById("error");
// const searchCounter = document.getElementById("search-counter");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchDiv = document.getElementById("search-div");
const errorDiv = document.getElementById("error-div");
const searchResultDiv = document.getElementById("search-results");
const spinner = document.getElementById("spinner");
searchBtn.addEventListener("click", () => {
  // clearSearch
  clear();

  const searchText = searchInput.value;
  console.log(searchText);

  const url = `http://openlibrary.org/search.json?q=${searchText}`;
  searchInput.value = "";
  spinner.classList.remove("d-none");
  spinner.classList.add("block");
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.numFound === 0) {
        errorHandler("error");
      } else {
        // console.log(data.docs);
        searchDiv.classList.remove("d-none");
        searchDiv.classList.add("block");
        searchDiv.innerText = `${data.numFound} Books Found`;
        return displayResults(data.docs);

        //   searchCounter.classList.remove("d-none");
        //   searchCounter.classList.add("block");
        //   searchCounter.innerText = `${data.numFound} Books Found`;
        // }
        // error.innerHTML = "";
        // searchCounter.innerHTML = "";
      }
    });
});
const clear = () => {
  searchResultDiv.textContent = "";
  searchDiv.classList.remove("block");
  searchDiv.classList.add("d-none");
  errorDiv.classList.remove("block");
  errorDiv.classList.add("d-none");
  // clearSpinner();
};

const errorHandler = (received) => {
  if (received === "error") {
    errorDiv.classList.remove("d-none");
    errorDiv.classList.add("block");
    clearSpinner();
  } else {
    displayResults();
  }
};
// const displayData = () => {
//   console.log(searchText);

//   // if (error === books.q) {
//   //   error.innerText = "nothing";
//   // }

//   // searchCounter.innerText = data.numFound;
// };
const displayResults = (books) => {
  //   console.log(books);
  // const searchCounter = document.getElementById("search-counter");
  // const searchResults = document.getElementById("search-results");
  // const searchCounterArr = [...books];

  books.forEach((book) => {
    console.log(book);
    // searchCounter.innerText = searchCounterArr.length;
    const CoverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    ("https://openlibrary.org/images/icons/avatar_book-sm.png");
    // console.log(book);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="card flex-row mb-3" style="max-width: 540px;">
        <div class="row g-0">
        <img src="${
          book.cover_i
            ? `${CoverUrl}`
            : `https://openlibrary.org/images/icons/avatar_book-sm.png`
        }" class="img-fluid rounded-start" alt="" style="width: 180px; height:240px;" />
        </div>
        <div class="col-md-8 d-flex align-items-center">
            <div class="card-body d-flex flex-column align-items-start ">
                <h5 class="card-title">${book.title}</h5>
                <h6 class="card-title">${
                  book.author_name
                    ? `By ${book.author_name[0]}`
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
                    : `First published info not available`
                }</p>
                
            </div>
        </div>
    </div>
</div>
    `;
    searchResultDiv.appendChild(div);
    clearSpinner();
  });
};

const clearSpinner = () => {
  spinner.classList.remove("block");
  spinner.classList.add("d-none");
};
