let isAlphabet = false;
let alphabetString = "";

let favoriteList = [];

function woosh(){
    document.getElementById('Left').classList.add('wooshLeft');
    document.getElementById('Right').classList.add('wooshRight');
    document.getElementById('welcome').classList.add('delete');
}

function isLetter(char) {
    return (/[a-zA-Z]/).test(char)
  }
   
function insertAslArea(char){
    char = char.toUpperCase();
    let aslArea = document.getElementById('aslArea');
    let newAslKey = document.createElement('div');
    newAslKey.classList.add('aslCard');
    newAslKey.classList.add(char);
    aslArea.appendChild(newAslKey);
}

function clearAslArea(){
    let aslArea = document.getElementById('aslArea');
    while(aslArea.firstChild){
        aslArea.removeChild(aslArea.lastChild);
    }
}

function updateTextArea(){
    let txtArea = document.getElementById('txtArea');
    txtArea.value = alphabetString.toUpperCase();
}

function updateAslArea(){
    clearAslArea();
    for(i=0; i<alphabetString.length; i++){
        if(isLetter(alphabetString[i]))insertAslArea(alphabetString[i]);
        else continue;
    }
}

function checkFavourite(){
    let isFavourite = false;
    let string = document.getElementById('txtArea').value.toString().trim().toUpperCase();
    console.log("check : "+ string);

    for (let i = 0; i < favoriteList.length; i++){
        if(string === favoriteList[i]){
            isFavourite = true;
            break;
        }
    }
    var btn = document.getElementById('favouriteBtn');
    var icon = document.getElementById('favouriteIcon');

    if(isFavourite){
        btn.classList.add('active');
        icon.classList.add('svgActive');
    }else{
        if(btn.classList.contains('active'))btn.classList.remove('active');
        if(icon.classList.contains('svgActive'))icon.classList.remove('svgActive');
    }
}

function updatePage(){
    updateTextArea();
    updateAslArea();
    checkFavourite();
    refreshFavorite();
}

function textChange(input){
    alphabetString = input.toUpperCase();
    updatePage();
}

function delClick(){
    alphabetString = alphabetString.slice(0, -1);
    updatePage();
}

document.getElementById('txtArea').addEventListener('input', function (event) {
    let input = event.target.value.toString();
    textChange(input);
    updatePage();
});

function swapClick(){
    let letterKeys = document.getElementsByClassName('letterKey');
    let aslKeys = document.getElementsByClassName('aslKey');

    let txtArea = document.getElementById('txtArea');
    let aslArea = document.getElementById('aslArea');

    if(!isAlphabet){
        for (i = 0; i < letterKeys.length; i++) {
            letterKeys[i].style.display = "none";
        }
        for (i = 0; i < aslKeys.length; i++) {
            aslKeys[i].style.display = "flex";
        }

        txtArea.classList.add('swapTextGo');
        aslArea.classList.add('swapAslGo');
        
        if(txtArea.classList.contains('swapTextBack')) txtArea.classList.remove('swapTextBack');
        if(aslArea.classList.contains('swapAslBack')) aslArea.classList.remove('swapAslBack');
        
    }else{
        for (i = 0; i < aslKeys.length; i++) {
            aslKeys[i].style.display = "none";
        }
        for (i = 0; i < letterKeys.length; i++) {
            letterKeys[i].style.display = "flex";
        }
        txtArea.classList.add('swapTextBack');
        aslArea.classList.add('swapAslBack');
        
        if(txtArea.classList.contains('swapTextGo')) txtArea.classList.remove('swapTextGo');
        if(aslArea.classList.contains('swapAslGo')) aslArea.classList.remove('swapAslGo');
    }

    isAlphabet =  !isAlphabet;
}

function press(char){
    alphabetString = alphabetString + char + "";
    updatePage();
}

function settingButton(){
    let menuContainer = document.getElementById('menuContainer');
    console.log('setting');

    if(menuContainer.classList.contains('menuExit')){
        menuContainer.classList.remove('menuExit');
        menuContainer.classList.add('menuShow');
        refreshFavorite();
    }else if(menuContainer.classList.contains('menuShow')){
        menuContainer.classList.remove('menuShow');
        menuContainer.classList.add('menuExit');
    }
    updatePage();
}

function updateFontLable(){
    let slider = document.getElementById('slider');
    let label = document.getElementById('sizeLabel');
    document.documentElement.style.setProperty('--font-size', slider.value.toString() + 'px');
    label.innerHTML = "Font Size : " + slider.value.toString() + " px";
}

function addFavourite(){
    var push = true;
    let string = document.getElementById('txtArea').value.toString().trim();

    if(string === ""){
        push = false;
        console.log(favoriteList);
        return;
    } 

    for(i=0; i<favoriteList.length; i++){
        if(favoriteList[i] === string){
            push = false;
            break;
        } 
    }

    if(push){
        favoriteList.push(string);
        alert('Added "' + string + '" to your favourite list!');
    }
    checkFavourite();
    console.log(favoriteList);
}

function insert(string){
    textChange(string);
    updatePage();
    settingButton();
}

function dump(string){
    console.log(favoriteList);
    favoriteList.splice(favoriteList.indexOf(string), 1);
    console.log(favoriteList);
    updatePage();
    settingButton();
}

function createFavouriteCard(string){
    let favoriteMenu = document.getElementById('favouriteMenu');

    //creating the "Card"
    let card = document.createElement('div');
    card.classList.add('historyCard');

    //creating and inserting "Content"
    let content = document.createElement('div');
    content.classList.add('content');
    content.innerHTML = string;

    //creating the insert and delete button
    let btnContainer = document.createElement('div');
    btnContainer.classList.add('btnContainer');

    let insertBtn = document.createElement('button');
    insertBtn.value = string;
    insertBtn.classList.add('cardBtn');
    insertBtn.innerHTML = "INSERT";
    insertBtn.setAttribute("onClick", "insert(this.value)");

    let deleteBtn = document.createElement('button');
    deleteBtn.value = string;
    deleteBtn.classList.add('cardBtn');
    deleteBtn.innerHTML = "DELETE";
    deleteBtn.setAttribute("onClick", "dump(this.value)");

    btnContainer.appendChild(insertBtn);
    btnContainer.appendChild(deleteBtn);

    card.appendChild(content);
    card.appendChild(btnContainer);
    

    favoriteMenu.appendChild(card);
}

function clearFavoriteMenu() {
    let favoriteMenu = document.getElementById('favouriteMenu');
    while (favoriteMenu.firstChild){
        favoriteMenu.removeChild(favoriteMenu.lastChild);
    }
}

function refreshFavorite(){
    clearFavoriteMenu();
    for (i = 0; i < favoriteList.length; i++){
        createFavouriteCard(favoriteList[i]);
    }
}