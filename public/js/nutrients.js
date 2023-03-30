var input = document.querySelectorAll(".nutrient")
var btn = document.querySelector("#Add")
var form = document.querySelector(".ui.form")

btn.addEventListener("click", (e)=>{
    e.preventDefault()
    var newFormDiv = document.createElement("div");
    newFormDiv.classList.add("field");
    form.appendChild(newFormDiv)
    var newInput = document.createElement("input");
    newInput.placeholder = "Description"
    newInput.name = "body"
    newInput.onfocus = true
    newFormDiv.appendChild(newInput)
})

console.log(input[0])