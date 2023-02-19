let budget_btn = document.getElementById("budget-btn");
let budget = document.getElementById("budget");
let total_budget = document.getElementById("total-budget");
let title = document.getElementById("title");
let cost = document.getElementById("cost");
let product_btn = document.getElementById("product-btn");
let expense_list = document.getElementById("expense_list");
let expence = document.getElementById("expence");
let balance = document.getElementById("balance")

budget_btn.onclick = function(e){
    e.preventDefault();
    if(budget.value != ""){
        localStorage.setItem("budget",budget.value);
        location.href = location.href;
    }else{
        alert("Plz Fill Your Budget");
    }
}

// store product localstorage

product_btn.onclick = function(e){
    e.preventDefault();
    if(title.value != "" && cost.value != ""){
        let p_title = title.value;
        let p_cost = cost.value;
        let data = {p_title:p_title,p_cost:p_cost}
        let string = JSON.stringify(data);
        localStorage.setItem("budget_"+title.value, string);
        location.href = location.href;
    }else{
        alert("Plz Fill Yor Expencess");
    }
}
// recive from data localStorage
function allData(){
    
    // receive from product localStorage
    for(let i=0; i<localStorage.length; i++){
        let all_keys = localStorage.key(i);
        if(all_keys.match("budget_")){
            let json_data = localStorage.getItem(all_keys);
            let json_Parse = JSON.parse(json_data);
            expense_list.innerHTML += `<div class="row mt-3"style="border-left: 5px solid #547ef9;">
            <div class="col-md-6 mt-2 d-flex justify-content-between">
                <h6>${json_Parse.p_title}</h6>
                <p class="price">${json_Parse.p_cost}</p>
            </div>
            <div class="col-md-6 mt-2 d-flex justify-content-end">
                <i class="fa fa-edit" style="font-size: 20px"></i>
                &ensp;&ensp;&ensp;
                <i class="fa fa-trash delete"style="font-size: 20px"></i>
            </div>

        </div>`;
        }
    }
    // totalbalance recive form localstorage;
    var total_price = document.getElementsByClassName("price")
    var totalAmount = [];
    for(let i=0;i<total_price.length;i++){
        totalAmount[i]=total_price[i].innerHTML;
    }
    let price = [];
    for(let i=0; i<totalAmount.length;i++){
        price.push(parseInt(totalAmount[i]))
    }
    let final_price = 0;
    for(let i=0; i<price.length;i++){
        final_price +=price[i];
    }
    expence.innerHTML = final_price;

    // recieve data from localStorage
    let getData = localStorage.getItem("budget");
    total_budget.innerHTML = getData;

    let total_bud = total_budget.innerHTML;
    let total_exp = expence.innerHTML;
    balance.innerHTML = total_bud-total_exp; 


    // delet budget coding
    let delete_item = document.getElementsByClassName("delete");
    for(let i=0; i<delete_item.length;i++){
        delete_item[i].onclick = function(){
            let cfrm = confirm("Do You Want To Delete")
            if(cfrm){
                let elm = this.parentElement;
                let div = elm.parentElement.firstElementChild;
                let first = div.firstElementChild.innerHTML;
                localStorage.removeItem("budget_"+first);
                location.href = location.href;
            }
        }
    }
}
allData();