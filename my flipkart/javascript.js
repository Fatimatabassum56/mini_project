import { imageSlider } from "./Data/imageSlider.js"
let imageSliderListEl = document.querySelector(".imageSliderList")
let imageSliderListHTML = ''
console.log(imageSlider)


imageSlider.forEach(el => {
    imageSliderListHTML += `
    <div class="imageSliderItem">
        <a href="${el.link}">
            <img src="${el.img}" />
        </a>
    </div>
    `
})
imageSliderListEl.innerHTML = imageSliderListHTML;

let preve_imageBtnEl = document.getElementById("preve_imageBtn")
let next_imageBtn = document.getElementById("next_imageBtn")
let start = 0;
let end = -400;

preve_imageBtnEl.addEventListener("click", handlePreveImage)
next_imageBtn.addEventListener("click", handleNextImage)

function handlePreveImage() {
    let imageallList = document.querySelectorAll(".imageSliderItem")
    console.log(imageallList)
    if (start < 0)
        start += 100
    imageallList.forEach(el => {
        el.style.transform = `translateX(${start}%)`
    })

}
function handleNextImage() {
    let imageallList = document.querySelectorAll(".imageSliderItem")
    if (start > end)
        start -= 100
    imageallList.forEach(el => {
        el.style.transform = `translateX(${start}%)`
    })
}

function renderImageSlider() {
    if (start > end) {
        handleNextImage()
    }
    else {
        start = 100
    }
}

setInterval(renderImageSlider, 5000)
//features
async function fetchData() {
    let fetData = await fetch('https://dummyjson.com/products')
    let res = await fetData.json()
    return res
}

let catgContainer = document.querySelector('.categories')
let card = document.querySelector('.items')

window.onload = async function () {
    catgContainer.innerHTML = `<div class="shimmer-catg"></div><div class="shimmer-catg"></div>
    <div class="shimmer-catg"></div><div class="shimmer-catg"></div><div class="shimmer-catg">
    </div><div class="shimmer-catg"></div>`
    let data = await fetchData()
    let products = data.products

    uniqCatgs(products)
    displayItems(products)
    displayProdRatingAboveFourToPointFive(products)
    displayProdRatingAboveFourPointFive(products)
}

function uniqCatgs(products) {
    let catgs = products.map(items => {
        return items
            
    })
    // console.log(catgs)
    let uniqCatgs = catgs.filter((item, index) => {
        return catgs.indexOf(item) === index
    })
    // console.log(uniqCatgs)

    let elemCatgs = uniqCatgs.map((items) => {
        let elem = `<div class="diff-cat">
        <div class="image">
            <img src="${items.thumbnail}" alt="">
        </div>
        <div class="name-cat">
            <p>${items.category}</p>
        </div>
        </div>`
        return elem
    })
    catgContainer.innerHTML = elemCatgs.join('')
}
function displayItems(products) {
    // console.log(products[0])
    let items = products.map((item) => {
        console.log(item.id)
        let elemItem = `
        <a href="prodDetail.html?id=${item.id}">
        <div class="cards">
        <div class="image-product">
        <img src="${item.thumbnail}" alt="">
    </div>
    <div class="description">
        <p>${item.title}</p>
    </div>
    <div class="discount"><h4>${item.rating}</h4>
    <h5>${item.stock}</h5>
    <h3>${item.price}</h3></div>
</div>
    </a>`
        return elemItem
    })
    card.innerHTML = items.join('')
}
