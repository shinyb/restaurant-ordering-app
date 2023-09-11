import { menuArray } from "./data.js";


const menu = document.getElementById('menu')
const orderDetails = document.getElementById('order-details')
let orderedItemsHtml = ''
let sum = 0
const tempOrderList = []
const completeOrderBtn = document.getElementById("complete-order-btn")
const paymentModule = document.getElementById("payment-module")
const reset = document.querySelector("#reset")
const endTransaction = document.getElementById('end-transaction')


/*EVENT LISTENERS*/
document.addEventListener('click', function(e){
    //e.preventDefault()
    if(e.target.dataset.addBtn) {
    handleAddClick(e.target.dataset.addBtn)}
       
    else if(e.target.dataset.removeBtn) {
      handleRemoveClick(e.target.dataset.removeBtn)
      console.log(e.target.dataset.removeBtn)
    }})

  
 
/*===end event listener===*/

function handleAddClick(itemId) {
  const orderedFoodItems = menuArray.filter(function(item){
      return item.uuid === itemId    
})[0];

  renderItems(orderedFoodItems)
  setPriceTotal(orderedFoodItems)
}

function handleRemoveClick(itemId) {
  decrementPriceTotal(itemId)
  deleteItems(itemId)
}

let html =''
   menuArray.forEach(function(item) {
       
       html = `<div class="items">
       <img src="./images/${item.image}" alt="${item.name}"/>
       <div>
           <h2>${item.name}</h2>
           <p class="ingredients">${item.ingredients.join(', ')} </p>
           <p class="price">$${item.price}</p>
       </div>
       <div class="add-item">
       <button data-add-btn="${item.uuid}">+</button>
    </div>`
     menu.innerHTML += html
      }) 
 
/*ORDER BOX*/
function renderItems(test) {
     menuArray.forEach(function(item) {
     if(test.uuid === item.uuid) {
      tempOrderList.push(item)
      orderedItemsHtml += 

    `<li id="order-list" class="flex">
        <h2>${item.name}</h2>
          <button id="remove-item" data-remove-btn="${item.uuid}">remove</button>
          <p class="price grid-item">$${item.price}</p>
      </li>`
    }
  
  document.getElementById('order-summary').classList.remove('hidden')
  document.getElementById('order-details').innerHTML = orderedItemsHtml
  
  })
  return orderedItemsHtml

}

function deleteItems(element) {
  element = document.getElementById("order-list"); 
  element.parentNode.removeChild(element);
  if(orderDetails.childNodes.length === 0) {
    resetOrderForm()
  }
 } 

    function setPriceTotal(listOfItems) {
      menuArray.forEach(function(item){
          if(item.uuid === listOfItems.uuid) {
            sum = sum + item.price
            
            document.getElementById('total').textContent = `$${sum}`
            console.log(sum)
           
          } return sum
        })
      }
       
    function decrementPriceTotal(listId) {
      menuArray.forEach(function(item) {
        let newPrice;
        if(sum > 0 && listId === item.uuid) {
          newPrice = sum - item.price 
        document.getElementById('total').textContent = newPrice
      }
          else return sum }
      )}
       

//Resets Order form if all items are removed

function resetOrderForm() {
  
  document.getElementById('order-summary').classList.add('hidden')
  location.reload(true)
}

//cancel order
reset.addEventListener('click', resetOrderForm)

//place the order
completeOrderBtn.addEventListener('click', function() {
  paymentModule.style.display = "block"
    document.querySelector(".overlay").classList.remove('hidden')
})

//complete payment for order
document.getElementById('pay-btn').addEventListener('click', function() {
  
  const greetingName = document.getElementById('firstName').value
  

  if(greetingName.length === 0 ) {
   alert("Please fill in your first name")
    
  }
    //hide the overlay
  else {
    paymentModule.style.display = "none"
    document.querySelector('.overlay').classList.add('hidden')
    endTransaction.style.display = "block"
    endTransaction.innerHTML = `<p>Thanks, ${greetingName}! Your order is on it's way! </p>`
   
  }
   
  //hide the order summary
  document.getElementById('order-summary').classList.add('hidden')
 
})

//Close order and open new form
endTransaction.addEventListener('click', resetOrderForm)
  
 




