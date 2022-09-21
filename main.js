console.log("Hello World");

var items = [];

//FETCHING DATA FROM API
window.addEventListener("load", () => {
  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
      items = data.products;
      let cards = ``;
      items.map((ele) => {
        cards += `<div class="card">
                    <img src="${ele.thumbnail}" alt="img">
                    <div class="details">
                        <h3  onclick="displayDetails(${ele.id})">${ele.title}</h3>
                        <div style="display: flex;justify-content: space-between;">
                            <p>${ele.brand}</p>
                            <h4>$${ele.price}</h4>
                        </div> 
                        <button id="addC${ele.id}" onclick="addToCart(${ele.id})" class="btn1">Add to cart</button>
                        <button id="removeC${ele.id}" onclick="addToCart(${ele.id})" class="btn2" style="display:none;">Remove from Cart</button>
                    </div>
                </div>`;
      });
      document.getElementById("container").innerHTML = cards;
    });
});

//FITERING PRODUCT FROM SEARCH BAR
function filterProducts() {
  let cards = ``;
  let x = document.getElementById("filter").value.toUpperCase();
  for (i = 0; i < items.length; i++) {
    if (
      items[i].title.toUpperCase().indexOf(x) > -1 ||
      items[i].brand.toUpperCase().indexOf(x) > -1
    ) {
      html = `<div onclick="displayDetails(${items[i].id})">
                <img src="${items[i].thumbnail}" alt="thumbnail">
                <h5>${items[i].title}</h5>
                <h5>$${items[i].price}</h5>
            </div>`;
      cards += html;
    }
  }
  document.getElementById("dropdown").innerHTML = cards;
}

function myFocusFunction() {
  document.getElementById("dropdown").style.display = "block";
}

function myBlurFunction() {
  document.getElementById("dropdown").style.display = "none";
}

//DISPLAYING DETAILS
function displayDetails(x) {
  card = `<div><div>
        <img src="${items[x - 1].thumbnail}" alt="img" id="mulImg">
      </div>
      <div>
        <h1 >${items[x - 1].title}</h1>
        <h3 >$${items[x - 1].price}</h3>
      </div>
      <div>
        <h3 style="font-size: 18px;">${items[x - 1].brand}</h3>
        <h5 style="font-size: 18px;">Rating: ${items[x - 1].rating}</h5>
      </div>
      <div>
        <p style="font-size: 18px;">${items[x - 1].description}
      </div>
      <div>
        <h6 style="font-size: 18px;">Discount Percent: ${
          items[x - 1].discountPercentage
        }</h6>
        <h6 style="font-size: 18px;">Stocks: ${items[x - 1].stock}</h6>
      </div></div>
      <h5 id="closeDetail" onclick="closeDetail()">X</h5>`;
  document.getElementById("expand").innerHTML = card;
  document.getElementById("expand").style.display = "block";
  document.getElementById("container").setAttribute("class", "blur");
}
function closeDetail() {
  document.getElementById("expand").style.display = "none";
  document.getElementById("container").removeAttribute("class", "blur");
}
document.getElementById("header").addEventListener("click", closeDetail);

//Add to cart
var cart = [];
function addToCart(x) {
  const index = cart.indexOf(x);
  if (index > -1) {
    cart.splice(index, 1);
    document.getElementById("addC" + x).style.display = "";
    document.getElementById("removeC" + x).style.display = "none";
  } else {
    cart.push(x);
    document.getElementById("addC" + x).style.display = "none";
    document.getElementById("removeC" + x).style.display = "";
  }
  console.log(cart);
}

//Cart
function openCart() {
  document.getElementById("container").style.display = "none";
  document.getElementById("cartPage").style.display = "";

  cards = ``;
  total = 0;
  cart.forEach((x) => {
    cards += `<div class="cardDiv">
              <img src="${items[x - 1].thumbnail}" alt="thumbnail">
              <div>
                  <h2>${items[x - 1].title}</h2>
                  <h4>${items[x - 1].brand}</h4>
              </div>
              <div class="qChange">
                  <p onclick="incQ(${items[x - 1].id})">+</p>
                  <h2 style="margin: 10px;" id="q${items[x - 1].id}">1</h2>
                  <p style="background-color: #ff6363;padding-left: 12px;" onclick="decQ(${
                    items[x - 1].id
                  })">-</p>
              </div>
              <h2>$${items[x - 1].price}</h2>
          </div>`;
  });
  document.getElementById("cartPage").innerHTML += cards;
  total = calTotal();
  document.getElementById("cartPage").innerHTML += `<div id="total">
                                                    <div><h5 id="totalVal" style="margin-right: 10px;">${total}</h5><h5>Total: $</h5></div>
                                                  </div>`;
}

function calTotal() {
  total = 0;
  cart.forEach((x) => {
    total +=
      parseInt(items[x - 1].price) *
      parseInt(document.getElementById("q" + items[x - 1].id).innerHTML);
  });
  return total;
}

function incQ(x) {
  q = parseInt(document.getElementById("q" + items[x - 1].id).innerHTML);
  document.getElementById("q" + items[x - 1].id).innerHTML = q + 1;
  total = calTotal();
  document.getElementById("totalVal").innerHTML = total;
}

function decQ(x) {
  q = parseInt(document.getElementById("q" + items[x - 1].id).innerHTML);
  if (q > 0) {
    document.getElementById("q" + items[x - 1].id).innerHTML = q - 1;
    total = calTotal();
    document.getElementById("totalVal").innerHTML = total;
  }
}
