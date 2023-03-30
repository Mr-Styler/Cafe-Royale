const addToCart = (btn) => {
    const productId = btn.parentNode.querySelector('[name=productId]').value;

    console.log(productId)

    fetch(`/cart/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({productId})
    }).then(result => {
        if (result.redirected) console.log(result.url);
        console.log(result.url)
    }).catch(err => {
        console.log(err)
    });
}