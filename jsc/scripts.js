import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, onValue, push, ref, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings={databaseURL:"https://playground-58ae1-default-rtdb.firebaseio.com/"}

const app=initializeApp(appSettings)
const databaseAZ=getDatabase(app)
const shoppingListInDB=ref(databaseAZ,"shoppingList")

const inputFieldEl=document.getElementById("input-field")
const addButtonEl=document.getElementById("add-button")
const shoppingListEl=document.getElementById("shopping-list")


addButtonEl.addEventListener("click",function(){
    let inputValue=inputFieldEl.value
    push(shoppingListInDB,inputValue)
    clearInputFieldEl()
    
})

onValue(shoppingListInDB,function(snapshot){

    if(snapshot.exists()){

        let itemsArray=Object.entries(snapshot.val())

        clearShoppingListEl()
    
        for(let i=0;i<itemsArray.length;i++){
    
            let currentItem=itemsArray[i]
            let currentItemID=currentItem[0]
            let currentItemValue=currentItem[1]
            appendItemToShoppingListEl(currentItem)
        }
    }
    else{
        shoppingListEl.innerHTML="No items here... yet"
    }
})


function clearShoppingListEl(){
    shoppingListEl.innerHTML=""
}

function clearInputFieldEl(){
    inputFieldEl.value=""
}

function appendItemToShoppingListEl(item){
    // shoppingListEl.innerHTML+=`<li>${itemValue}</li>`
    let itemID=item[0]
    let itemValue=item[1]

    let newEl=document.createElement("li")
    newEl.textContent=itemValue

    newEl.addEventListener("dblclick",function(){
        let exactLocationOfItemInDB=ref(databaseAZ,`shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingListEl.append(newEl)
}




