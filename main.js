window.onload = function () {
  let queryParam = "https://dummyjson.com/products/";
  if (
    location.search &&
    location.search.startsWith("?search") &&
    location.search.split("=")[1]
  ) {
    queryParam += "/search?q=" + location.search.split("=")[1];
  }
  getProducts(queryParam);
};

function getProducts(queryParam) {
  const cardProd = document.getElementById("products");
  let reqHttp = new XMLHttpRequest();

  reqHttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        let resHttp = JSON.parse(this.responseText);
        console.log(resHttp);
        for (let i = 0; i < resHttp.products.length; i++) {
          const prod = resHttp.products[i];
          cardProd.innerHTML += `
          <div class="card-prod">
            <div class="card-prod-img">
              <img
                src="${prod.thumbnail}"
                alt="${prod.title}"
              />
            </div>
            <h3>${prod.title}</h3>
            <h4>${prod.brand}</h4>
            <p>${prod.description}</p>
          </div>
        `;
        }
      } else {
        cardProd.innerHTML = `<h1>Error</h1>`;
      }
    }
  };
  reqHttp.open("GET", queryParam, true);
  reqHttp.send();
}
