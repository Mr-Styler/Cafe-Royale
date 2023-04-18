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

const updateMe = (btn) => {
    const image = btn.parentNode.querySelector("[name=image]").files[0];
    const username = btn.parentNode.querySelector("[name=username]").value;
    const email = btn.parentNode.querySelector("[name=email]").value;
    const formData = new FormData();

    formData.append("image", image);
    formData.append("username", username);
    formData.append("email", email);

    let alert = document.querySelector('.alert');
    fetch(`/update-me`, {
      method: "PATCH",
      body: formData,
    })
        .then(res => res.text())
        .then(data => {
            alert.classList.replace('alert-danger', 'alert-success');
            alert.innerHTML = `<button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            <strong>Success!</strong> ${data}.`
            alert.hidden = false;
            console.log(alert.hidden,data);
        })
        .catch(err => {
            alert.classList.replace('alert-danger', 'alert-success');
            alert.innerHTML = `<button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            <strong>Success!</strong> ${err}.`
            alert.hidden = false;
            console.log(alert.hidden, err);
        }    
    );
}