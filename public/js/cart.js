const grand_total = () => {
    let prices = document.querySelectorAll('.cart-price');
    let quantities = document.querySelectorAll('.cart-qty-input');
    let total = 0;

    for (let i = 0; i < prices.length; i++) {
        total = Number(prices[i].textContent) * Number(quantities[i].value)
        console.log(prices[i].textContent, quantities[i].value)
    }
}


const cart_plus = (btn) => {
    let qty = btn.parentNode.querySelector('.cart-qty-input');
    let price = btn.parentNode.parentNode.querySelector(".cart-price");
    let sub_total = btn.parentNode.parentNode.querySelector('.cart-sub-total')

    qty.value = Number(qty.value) + 1;
    sub_total.textContent = (Number(qty.value) * (price.textContent));
    console.log(
      sub_total.textContent,
      Number(qty.value),
      (price.textContent)
    );
    grand_total();
    
}