


function generateRandomIcon(boardSize) { // 42
	let maxNmbImg = boardSize/2;     // 21
	let arr = [];
	let result =[];
	for(let i=1;i<=maxNmbImg;i++) {
		arr.push(i);
		arr.push(i);
	}
	const cloneArr = arr.slice();
	for(let j=0;j<cloneArr.length;j++) {
		let rand = Math.floor(Math.random() * arr.length);
		let randElem = Number(arr.splice(rand,1).join(""));

		result.push(randElem);
	}
	return result;
}


let parent = document.querySelector(".memory-game");

let timer1;
let par = document.querySelector(".stopwatch p");
let time = {hours: 0, minets: 0, seconds: 0};

let n = document.getElementById("selectBoardSize").options.selectedIndex;
let boardSize = Number(document.getElementById("selectBoardSize").options[n].value);

let winList12 = [];
let winList16 = [];
let winList20 = [];
let winList30 = [];
let winList36 = [];
let winList42 = [];



// создаем пустые ключи в локалСторедж
if(localStorage.getItem("winList12") == undefined) {
	localStorage.setItem('winList12', JSON.stringify(winList12));
}
if(localStorage.getItem("winList16") == undefined) {
	localStorage.setItem('winList16', JSON.stringify(winList16));
}
if(localStorage.getItem("winList20") == undefined) {
	localStorage.setItem('winList20', JSON.stringify(winList20));
}
if(localStorage.getItem("winList30") == undefined) {
	localStorage.setItem('winList30', JSON.stringify(winList30));
}
if(localStorage.getItem("winList36") == undefined) {
	localStorage.setItem('winList36', JSON.stringify(winList36));
}
if(localStorage.getItem("winList42") == undefined) {
	localStorage.setItem('winList42', JSON.stringify(winList42));
}






let selectCatIcon = document.querySelector('#selectCategoryIcon').options.selectedIndex;
let valueSelectCatIcon = document.getElementById("selectCategoryIcon").options[selectCatIcon].value;



let zero = "0";
function addZero(number){
	if(number<10) {
		number = zero + number;
	}
	return number;
}

function createBoard(boardSize) {
	resetStopWatch();
	// обнуление секундомера

	let arr = generateRandomIcon(boardSize);
	

	let classBoard = '';
	switch (boardSize) {
		case 12:
			classBoard = "memory-card1216";
		  break;
		case 16:
			classBoard = "memory-card1216";
		  break;
		  case 20:
			classBoard = "memory-card2030";
		  break;
		  case 30:
			classBoard = "memory-card2030";
		  break;
		  case 36:
			classBoard = "memory-card3642";
		  break;
		  case 42:
			classBoard = "memory-card3642";
		  break;
	}
	
	for(let i=0;i<boardSize;i++) {
	

		let rand = Math.floor(Math.random() * arr.length);
		let randElem = arr.splice(rand,1);
		
		let imgFront = document.createElement('img');  
		imgFront.src = 'img/'+ valueSelectCatIcon+"/"+randElem +'.png';
		imgFront.classList.add("front-face");
		imgFront.alt= randElem;
	
		let imgBack = document.createElement('img');
		imgBack.src = 'img/production.png';
		imgBack.classList.add("back-face");
		imgBack.alt= randElem;

		
	
		let div = document.createElement('div');
		div.dataset.number = randElem;
		div.classList.add(classBoard);
	
		parent.appendChild(div);
		div.appendChild(imgFront);
		div.appendChild(imgBack);

	}
	
	let cards = document.querySelectorAll("." + classBoard);
	
	let hasFlippedCard = false;
	
	

	function start() {   // старт секундомера
		timer1 = setInterval(timer, 1000);
		
		function timer() {
	
			time.seconds = Number(time.seconds) +1;
			if(time.seconds >=60) {
				time.seconds = 0;
				time.minets++;
			}
			if(time.minets >=60) {
				time.minets=0;
				time.hours++;
			}
			let hour = time.hours;
			let min = time.minets;
			let sec = time.seconds;
			par.innerHTML = "Stopwatch:  " + addZero(hour) + ":"+ addZero(min)+":"+ addZero(sec);
				
				
		}
	}



	function resetStopWatch() {
		time = {hours: 0, minets: 0, seconds: 0};
		
		let hour = time.hours;
		let min = time.minets;
		let sec = time.seconds;
		par.innerHTML = "Stopwatch:  " + addZero(hour) + ":"+ addZero(min)+":"+ addZero(sec);
		clearInterval(timer1);
		
	}


	function winOrNot() {
		let cardsArr = Object.assign([], cards);
		function hasClassFlip(elem) {
			return elem.classList.contains("flip");
		}
		
		if(cardsArr.every(hasClassFlip)) {
			
			winStopWatch(); // остановка таймера, запись в локалСторедж, окно сохранение результат


			// alert("You win,Your time is: " + addZero(time.hours)+ ":"+ addZero(time.minets) +":"+ addZero(time.seconds));
		}
	}





	

	
	

	lockBoard = false;
	let firstCard, secondCard;
	let stop=true;


	function flipCard() {
		
		if(stop) { 
			start();
			stop = false;
		}
		
		if(lockBoard) return;  // если открыта вторая карта - ничего не будет происходить.
		if (this === firstCard) return;

		this.classList.add('flip');
		 if(!hasFlippedCard) {
			hasFlippedCard = true;
			firstCard = this;
		 } else {
			secondCard = this;
			
			
			//console.log(firstCard.dataset.number);
			//console.log(secondCard.dataset.number);
			checkForMatch();
			
		 }
		 winOrNot();

	}

	function checkForMatch() {  // проверить на равность 
		if(firstCard.dataset.number === secondCard.dataset.number) {
			disableCards();
		} else {
			unflipCards();
		}
	}
	
	function disableCards() {  // диактивировать одинаковые карты
		firstCard.removeEventListener('click', flipCard);
		secondCard.removeEventListener('click', flipCard);

		resetBoard();
	}
	

	function unflipCards() {  // убираем класс флип до изначального состояния
		lockBoard = true;

		setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		resetBoard();
		}, 500);
	}

	function resetBoard() {  // скидываем переменные до начальных значений
		[hasFlippedCard, lockBoard] = [false, false];
		[firstCard, secondCard] = [null, null];
	}

		
	
	
	cards.forEach(card => card.addEventListener('click', flipCard));  // добавляем функцию переворота и сравнения для всех карт


	}

	let list = document.querySelectorAll('.records ol li');
	let recordsList = document.querySelector(".records ol");
	let h4 = document.createElement("h4");

	h4.innerHTML = "Board Size: " + boardSize;
	recordsList.prepend(h4);


	
		
		

	

	function byField(field) {
		return (a, b) => a[field] > b[field] ? 1 : -1;
	}

function winStopWatch() { // остановка секундомера

	clearInterval(timer1);
	winersThis = JSON.parse(localStorage.getItem("winList"+boardSize));

	// добавление в таблицу записи....
	let resultWindow = document.querySelector(".resultWindow"); // окно резульата с местом
	resultWindow.classList.remove("hidden");

	let winnerTimeP = document.querySelector("#winnerTime");
	let winnerBoardSize = document.querySelector("#winnerBoardSize");
	let winnerName = document.querySelector("#winnerName");

	let winnerTime = addZero(time.hours)+":"+addZero(time.minets)+":"+(time.seconds);
	winnerTimeP.innerHTML = winnerTime;
	winnerBoardSize.innerHTML = boardSize;
	console.log(time);
	let btnSendResult = document.querySelector("#btnSendResult");

	btnSendResult.addEventListener("click", sendToLocalStor);

	function sendToLocalStor() {
		resultWindow.classList.add("hidden"); // прячем окно результата
		
		// добавить в ЛокСтор новые данные , отсортировать и показать только первые 5 поз. остальное удалить.
		let newResultObj = {time: winnerTime, boardSize: boardSize , name: winnerName.value}
		winersThis.push(newResultObj);
		localStorage.setItem("winList"+boardSize , JSON.stringify(winersThis));
		winersThis = JSON.parse(localStorage.getItem("winList"+boardSize));
		

		winersThis.sort(byField("time"));
		//console.log(winersThis); // отсортированый массив обьектов 

		for ( let i=0;i<list.length;i++) {
			if(winersThis[i] !== undefined) {
				list[i].innerHTML = winersThis[i].name + ", time " + winersThis[i].time;
			}
			
		}

		
		btnSendResult.removeEventListener("click", sendToLocalStor);
		reloadBoard();
	}
	
	
}






/// Кнопка select 
let buttonChangeBoard = document.querySelector("#changeBoard");

buttonChangeBoard.addEventListener("click", reloadBoard );

function reloadBoard() {
	
	for ( let i=0;i<list.length;i++) {
		list[i].innerHTML ="";
	}
	parent.textContent = '';
	n = document.getElementById("selectBoardSize").options.selectedIndex;
	boardSize = Number(document.getElementById("selectBoardSize").options[n].value);

	selectCatIcon = document.querySelector('#selectCategoryIcon').options.selectedIndex;
	valueSelectCatIcon = document.getElementById("selectCategoryIcon").options[selectCatIcon].value;

	createBoard(boardSize);

	let winersThis = JSON.parse(localStorage.getItem("winList"+boardSize));   // {1: time:.., bs:.. , name:..}, 2: {…}, 3: {…}, 4: {…}, 5: {…}}

	h4.innerHTML = "Board Size: " + boardSize;
	
	if(winersThis.length !== 0) {
		winersThis.sort(byField("time"));

		for ( let i=0;i<list.length;i++) {
			if(winersThis[i] !== undefined) {
				list[i].innerHTML = winersThis[i].name + ", time " + winersThis[i].time;
			}
			
		}
	
	}
	
	

	
}
reloadBoard()

// кнопка clear records list
let clearRecList = document.querySelector("#clearRecList");
clearRecList.addEventListener('click', function() {
	localStorage.setItem('winList' + boardSize, JSON.stringify([]));
	
	for ( let i=0;i<list.length;i++) {
		list[i].innerHTML ="";
	}
})

































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































