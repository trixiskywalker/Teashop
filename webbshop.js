const products =
    [
        {
            "name": "Peppermint",
            "origin": "USA",
            "description": "Aromatic, refreshing & minty. This tea can soothe digestive discomfort, as well as stimulate passion and creativity.",
            "weight": "100g",
            "price": 140,
            "image": "peppermint.jpg"
        },
        {
            "name": "Ginger",
            "origin": "China",
            "description": "Ginger has many healing properties, enjoy this tea whenever you need a cup of cozy goodness.",
            "weight": "100g",
            "price": 150,
            "image": "ginger.jpg"
        },
        {
            "name": "Chamomile",
            "origin": "Egypt",
            "description": "Chamomile is known for its soothing properties, enjoy before bedtime or during your break.",
            "weight": "100g",
            "price": 130,
            "image": "chamomile.jpg"
        },
        {
            "name": "Hibiscus",
            "origin": "North Africa",
            "description": "The delicate sweetness and beautiful tartness of this tea makes it comforting in the colder months, as well as refreshing in the warmer months!",
            "weight": "100g",
            "price": 120,
            "image": "hibiscus.jpg"
        }  
    ];

// Protokollet lagras som en array vars nycklar är tesorternas namn
let basket = {};

// Funktionen sätter noll som start för alla produkter antal och pris i varukorgen. 
function initBasket() {
    for (let product of products) {
        basket[product.name] = 0;
    }
}

// Ritar upp tabellen för varukorgen med alla sorter och antalet och pris av varje sort i varukorgen.
function renderBasket() {
    let tbody = document.querySelector("#protocol > tbody");
    tbody.innerHTML = "";
    for (let product of products) {
        let row = tbody.insertRow(-1);
        let cellName = row.insertCell(-1);
        let cellAmount = row.insertCell(-1); 
        let cellScore = row.insertCell(-1);
        let amount = basket[product.name];
        cellName.textContent = product.name;
        cellAmount.textContent = amount;
        cellScore.textContent = amount * [product.price];
    }
}

// Ökar antalet för antal och pris i varukorgen med 1
function increment(name) {
    console.log("Name: " + name);
    basket[name]++;
    renderBasket();
}
//Minskar antalet för antal och pris i varukorgen med 1
function decrease(name) {
    console.log("Name: " + name);
    basket[name]--;
    renderBasket()
}

// Renderar översikten över tesorter med utgångspunkt från en mall som hjälper
// oss att producera den HTML-kod som behövs för att presentera varje sort.
//Classen w-50 presenterar bilderna och div-texterna med 50% width genom bootstrap css. 
function renderProducts() {
    const template = `
        <img class="w-50 p-3" class="">
        <div class="w-50 p-3" class="p-2">
            <div>
                <span class="name"></span>
                <span class="minus float-right" title="Remove from basket">
                <i class="fa fa-minus-square" aria-hidden="true">Remove</i>
                </span>
                <span class="plus float-right" title="Add to basket">
                    <i class="fa fa-plus-square" aria-hidden="true" class="button">Add to basket</i>
                </span>
            </div>
            <div class="origin"></div>
            <div class="description"></div>
            <div class="weight"></div>
            <div class="instruction"></div>
            <div class="price"></div>
        </div>
    `;
    
    //Här kallar vi på elementet som har id="products" och skapar ett div element. 
    //i div elementet lägger vi sedan in variabeln template som håller data för HTML kod för
    //de olika tesorternas boxar. 
    //alla div-element i template har en egen class som vi kallar på med div elementet "item" och
    //lägger in värdena från products objecten högst upp i koden. 
    //sedan lägger vi till eventlisteners till plus och minusknapparna som lades in i template HTML datan.
    //och de kallar på funktionerna increment() som ökar antalet med plusknappen och 
    //decrease() som minskar antalet med minusknappen. Sedan lägger vi in div elementet "item" i 
    //elementet med id="products". 
    const container = document.querySelector("#products");
    for (let product of products) {
        let item = document.createElement("div");
        item.classList.add("item", "ml-2", "col-10", "d-flex", "flex-wrap"); //Lägger en class för diven och bootstrap css. 
        item.innerHTML = template;
        item.querySelector("img").src = product.image;
        item.querySelector(".name").textContent = product.name;
        item.querySelector(".origin").textContent = product.origin;
        item.querySelector(".description").textContent = product.description;
        item.querySelector(".weight").textContent = product.weight;
        item.querySelector(".price").textContent = product.price;
        item.querySelector(".plus").addEventListener("click", () => increment(product.name));
        item.querySelector(".minus").addEventListener("click", () => decrease(product.name));
        container.appendChild(item);
    }
    //Styling för korten
        let textNames = document.querySelectorAll(".name"); //Skapa en loop som lägger till 
        for (let textName of textNames) {                 //fontFamily etc. till flera element.
        textName.style.fontFamily = "Helvetica";
        textName.style.textTransform = "uppercase";
        textName.style.fontWeight = "bold";
        }
        //Priset syns bättre med bold-attributet
        let textPrices = document.querySelectorAll(".price");
        for (let textPrice of textPrices) {
            textPrice.style.fontWeight = "bold";
        }
        //Origin-texten får en slantad stil med italic. 
        let textOrigins = document.querySelectorAll(".origin");
        for (let textOrigin of textOrigins) {
            textOrigin.style.fontStyle = "italic";
        }

}


//Här har vi skapat en köpknapp som läggs in under varukorgen. 
//Knappen läggs in i elementet med id="protocol" genom appendChild() funktionen. 
//Vi la till en eventlistener så när man trycker på knappen körs funktionen priceCount()
//priceCount deklarerar först en tom variabel totalPrice
//med for loopen skapar vi en variabel inuti som kallar på arrayen basket. 
//och sedan adderas antalet av produkter med priset och läggs till += i variabeln totalPrice.
//Vi skapar ett nytt p-element där vi sedan skriver in total amount: och värdet i varabeln totalPrice
//och sedan lägger vi in p-elementet i elementet #protocol och specifikt tbody-taggen så priset kommer
//upp under varukorgen när knappen "check-out" klickas. 
const buyBtn = document.createElement("button");
buyBtn.innerHTML = "Check Out";
document.querySelector("#protocol").appendChild(buyBtn);
buyBtn.addEventListener("click", function priceCount() {
        let totalPrice = 0;
        for (let product of products) {
        let amount = basket[product.name];
        totalPrice += amount * [product.price];
        }
        console.log(totalPrice);
        const totalAmount = document.createElement("p");
        totalAmount.innerText = "Total amount: " + totalPrice;
        document.querySelector("#protocol > tbody").appendChild(totalAmount);
        
    });


//Reset button
// Rensa varukorgen – Denna knapp återställer antalet varor till 0 för respektive produkt. 
//Först skapar vi ett element och lägger till text inuti knappen. 
//sedan lägger vi in knappen i HTMLen i tabellen med id "protocol"
//Sedan lägger vi till ett event för knappen, när den klickas så kallar den på en funktion som
//går igenom initbasket() funktionen och sedan renderBasket() funktionen. 
const resetBtn = document.createElement("button");
resetBtn.innerHTML = "Empty basket";
document.querySelector("#protocol").appendChild(resetBtn);
resetBtn.addEventListener("click", function resetBasket() {
    initBasket();
    renderBasket();
});

//JSON Styling av header och footer.
const websiteInformation = [
    {
        "title": "Tea Shop",
        "quote": '"A simple cup of tea is far from a simple matter" -Mary Lou Heiss',
        "footer": "Design by Karin Falkenby & Trixi Orstadius",

    }
];
//Koden loopar igenom websiteInformation och hämtar det värdet som kallas på
//t.ex header.querySelector("h1").textContent = websiteInfo.title; lägger in title värdet "Tea shop"
//i h1 som ligger i elementet med id="ourHeader" med textContent.
//Sedan gör vi detsamma för värdena quote och footer i websiteInformation som läggs på respektive plats.
//Vi skapade även två nya element för som  vi lägger in i HTML med appendChild() och sedan
//gjorde vi lite lätt styling för webbsidan. 

for (let websiteInfo of websiteInformation) {
    const header = document.querySelector("#ourHeader");
    const footer = document.querySelector("#ourFooter");
    header.querySelector("h1").textContent = websiteInfo.title;
    header.querySelector("h1").style.textTransform = "upperCase";
    header.querySelector("h1").style.fontFamily = "georgia";
    const quote = document.createElement("p");
    quote.textContent = websiteInfo.quote;
    quote.classList.add("ml-2", "text-center");
    quote.style.fontStyle = "italic";
    header.appendChild(quote);
    header.style.backgroundColor = "#f7d9fc";
    
    const info = document.createElement("span");
    info.textContent = websiteInfo.footer;
    footer.style.backgroundColor = "lightgrey";
    footer.style.textAlign = "center";
    footer.appendChild(info);
}
function searchbar() {

    const searchBar = `
    <input type="text" id="userInput" onkeyup="searchbar()" placeholder="Search...">

    <ul id="myUL">
        <li><a href="#">Chamomile</a></li>
        <li><a href="#">Ginger</a></li>
        <li><a href="#">Hibiscus</a></li>
        <li><a href="#">Peppermint</a></li>
    </ul>
    `;

    const searchContainer = document.querySelector("tr");
    let searchBox = document.createElement("div");
    searchBox.innerHTML = searchBar;
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("userInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
    searchContainer.appendChild(searchBox);
}

window.onload = function() {
    renderProducts();
    initBasket();
    renderBasket();    
}

