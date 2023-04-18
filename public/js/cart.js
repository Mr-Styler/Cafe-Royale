let cartObj = {
    items: [],
    total: 0
};

const grand_total = () => {
    let prices = document.querySelectorAll('.cart-price');
    let quantities = document.querySelectorAll('.cart-qty-input');
    let prodIds = document.querySelectorAll('.product-id');
    let total = 0;


    for (let i = 0; i < prices.length; i++) {

        if (!cartObj.items.find((prod) => prod.productId === prodIds[i].value)) {
          cartObj.items.push({
            productId: prodIds[i].value,
            quantity: Number(quantities[i].value),
          });
        } else {
          cartObj.items[i].productId = prodIds[i].value;
          cartObj.items[i].quantity = Number(quantities[i].value);
        }
        
        total += (Number(prices[i].textContent) * Number(quantities[i].value));
      cartObj.total = total
    }

    document.querySelector('.grand-total').textContent = `Grand Total: $${total}`
}


const cart_edit = (btn) => {
    let qty = btn.parentNode.querySelector('.cart-qty-input');
    let price = btn.parentNode.parentNode.querySelector(".cart-price");
    let sub_total = btn.parentNode.parentNode.querySelector('.cart-sub-total')


    if (btn.textContent === "+") {
        qty.value = Number(qty.value) + 1;
    } else if (btn.textContent === "-" && qty.value !== '1') {
        qty.value = Number(qty.value) - 1;
    }

    sub_total.textContent = (Number(qty.value) * (price.textContent));
    grand_total();
    document.getElementById("order-link").classList.add("disabled");
    
}

const update_cart = (btn) => {
    fetch(`/update-cart`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartObj),
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        document.getElementById('order-link').classList.remove('disabled')
      })
      .catch((err) => {
        console.log(err);
      });
};