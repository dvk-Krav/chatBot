document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
            let input = inputField.value;
            inputField.value = "";
            output(input);
        }
    });
});

function output(input) {
    let product = [];

    let text = input.toLowerCase().trim();

        if (compare(prompts, replies, text)) {
            // Search for exact match in `prompts`
            product.push(compare(prompts, replies, text));
        }
        else {
            let search = Array.from(document.body.getElementsByTagName("p")); //знаходимо всі співпадіння з заданим тегом та створюємо масив
            console.log(search);
            //res1 = [...search].map(({ textContent: txt }) => txt.toLowerCase()); //відображаємо зміст тегів
        
            let letresnormal = []
            let res1 = [];
            for (let i = 0; i<search.length; i++){
                if (search[i].textContent !== ''){
                    res1[i] = search[i].textContent.toLowerCase();
                    letresnormal[i] = search[i].textContent;
                }
            }
            console.log(res1);
            console.log(letresnormal);
        
        
            res2 = res1.includes(text); // на запит
            console.log(res2);
        
            console.log(res1.find(el => el.toLowerCase() === text.toLowerCase()));
        
        
            let resArray = [];
        
            for (let i = 0; i < res1.length; i++) {  ///цикл розбиття массиву змісту тегів на масиви де, кожен тег це масив елементів типу string
                resArray.push(res1[i].split(" "))
                
        
            }
            console.log(resArray);
        
            let inputArray = text.split(" ");   ///з введенного тексту створюється масив, елементами якого є введений текст типу string  
        
            for (let i = 0; i < inputArray.length; i++) {            ///цикл за допомогою якого, якщо довжина слова > 4, то видаляє останні 2 символа, якщо довжина слова > 3, то видаляє 1 символ з кінця
                if (inputArray[i].length > 4) {
                    inputArray[i] = inputArray[i].substring(0, inputArray[i].length - 2);
                } else if (inputArray[i].length > 3) {
                    inputArray[i] = inputArray[i].substring(0, inputArray[i].length - 1);
                    if (inputArray[i].length > 2) {
                        inputArray[i] = inputArray[i].substring(0, inputArray[i].length - 1);
                    }
                    
                } else {
                    inputArray.splice(i, 1);
                }
            }
        
            console.log(inputArray);
        
        
            let indexArray = new Array(res1.length);
        
            for (let i = 0; i < indexArray.length; i++) {
                indexArray[i] = 0;
            }
        
            for (let k = 0; k < inputArray.length; k++) {
                for (let i = 0; i < res1.length; i++) {
                    for (let j = 0; j < resArray[i].length; j++) {
        
                        if (resArray[i][j].includes(inputArray[k])) {
                            indexArray[i]++
                        }
                    }
                }
            }
        
            console.log(indexArray);
        
            let max = 0;
            for (let i = 0; i < indexArray.length; i++) {
                if (indexArray[i] > max) {
                    max = indexArray[i];
                }
            }
        
        
            let response = true;
            for (let j = 0; j < indexArray.length; j++) {
                for (let i = 0; i < indexArray.length; i++) {
                    if (indexArray[i] == max && indexArray[i] > 0) {
                        product.push(letresnormal[i]); ///змінна для боту
                        response = false;
                    }
                }
                max--;
            }
            console.log(response);
            if (response) {
                // якщо фолс, дані беруться з dialog.js
                product.push(alternative[Math.floor(Math.random() * alternative.length)]);
            }
        }

    // Update DOM
    addInput(input);
    for (let i = 0; i < product.length; i++){
        addBot(product[i]);
    }
}



function compare(promptsArray, repliesArray, string) {
    let reply;
    let replyFound = false;
    for (let x = 0; x < promptsArray.length; x++) {
        for (let y = 0; y < promptsArray[x].length; y++) {
            if (promptsArray[x][y] === string) {
                let replies = repliesArray[x];
                reply = replies[Math.floor(Math.random() * replies.length)];
                replyFound = true;
                // Зупинити внутрішній цикл, коли введене значення відповідає promptsArray
                break;
            }
        }
        if (replyFound) {
            // Зупинка зовнішній цикл, коли знайдено відповідь замість повторення всього масиву
            break;
        }
    }
    return reply;
}


function addBot(product) {
    
    const messagesContainer = document.getElementById("messages");
    
    let botDiv = document.createElement("div");
    let botText = document.createElement("span");
    botDiv.id = "bot";
    botDiv.className = "bot response";
    botText.innerText = "Друкує...";
    botDiv.appendChild(botText);
    messagesContainer.appendChild(botDiv);
    // Збереження останніх повідомлень
    messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
    
    
    setTimeout(() => {
    botText.innerText = `${product}`;
    }, 1500
    )
    
   }    

   function addInput(input) {
    
    const messagesContainer = document.getElementById("messages");
    
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.className = "user response";
    userDiv.innerHTML = `<span>${input}</span>`;
    messagesContainer.appendChild(userDiv);
    
    // зберегти останні повідомлення
    messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

    
   }   