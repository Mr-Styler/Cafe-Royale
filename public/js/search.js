let searchInput = document.getElementById('searchInput');

searchInput.addEventListener('keyup', (e) => {
    searchMeal(searchInput);
})


const searchMeal = (e) => {
    let searchResults = document.getElementById("searchResults");
    
  let match = e.value.match(/^[a-zA-Z ]*/);
  let match2 = e.value.match(/\s*/);
  if (match2[0] === e.value) {
    searchResults.innerHTML = "";
    return;
  }

  if (match[0] === e.value) {
    fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: e.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let results = data.results;
        searchResults.innerHTML = "";

        if (results.length < 1) {
          searchResults.innerHTML = `<p>Sorry, No Meal was found</p>`;
          return;
        }
        results.forEach((item, index) => {
          if (index > 0) searchResults.innerHTML += "<hr>";
          searchResults.innerHTML += `<p>${item.name}</p>`;
        });
        console.log(results);
      });
    return;
  }
};