window.onload = function () {
	
	// var taskArr = [];
	var outerDiv = document.getElementById("out");
	var button = document.getElementById("add");
	var kilLocalStorage = document.getElementById("kilLocalStorage");
	var refresh = document.getElementById("refresh");
	var mainList = document.getElementById("mainList")

	var newDiv = document.createElement("div");
	
	var fav, favs = [];

	button.addEventListener("click", showArr);
	kilLocalStorage.addEventListener("click", clearLocalStorage);
	refresh.addEventListener("click", refreshPage); 

	// if(localStorage.getItem("taskArr")!=undefined){
	// 	taskArr = JSON.parse(localStorage.getItem("taskArr"));
	// };

	if(localStorage.getItem("divIn")!=undefined){
		outerDiv.innerHTML = localStorage.getItem("divIn");
	};

	if(localStorage.getItem("favorites2")!=undefined) {
		var favorites = JSON.parse(localStorage.getItem('favorites2'));
		for (var i = 0; i < favorites.length; i++) {
			document.getElementById(favorites[i].id).className = (favorites[i].class);
		}
	}

	function getRandom(x) {
		return parseInt(Math.random()*x);
	}; 

	console.log(getRandom(10000))
	function createNewTask() {
		var newTask = document.createElement("li");
		var task = document.getElementById("in").value;
		document.getElementsByTagName("ul")[0].appendChild(newTask);
		newTask.id = getRandom(10000);
		newTask.className = "newTask";
		var temp = {};
		temp.main = task;
		// temp.check = false;
		// var i = taskArr.length;
		// taskArr[i] = temp;
		newTask.innerHTML = temp.main;
		newTask.innerHTML.toUpperCase()
		newTask.addEventListener("click", setSmallDiv);
	};
	function showArr() {
		var testP = document.getElementById("testP");
		if(testP) {
			testP.remove();
		};
		createNewTask();
		
		setStorage();

		document.getElementById("in").value = "";
		// console.log(taskArr);
		
		console.log()
	};

	for(var j=0; j< document.getElementsByClassName("newTask").length; j++) {
		document.getElementsByClassName("newTask")[j].addEventListener("click", setSmallDiv);
	};
	
	function setStorage() {
		// localStorage.setItem("taskArr", JSON.stringify(taskArr));
		localStorage.setItem("divIn", outerDiv.innerHTML);
	};

	function clearLocalStorage() {
		 localStorage.clear();
	};

	function refreshPage() {
		location.reload();
	};			
	
	function clearTimer(x) {clearTimeout(x)};
	
	var liTargetId;

	function setSmallDiv(event) {
		liTargetId = event.target.id;
		outerDiv.appendChild(newDiv);
		newDiv.className = "newDiv";
		newDiv.style.left = event.clientX + "px";
		newDiv.style.top = event.clientY-40 + "px";
		newDiv.innerHTML = "<button id='setDone' class='buttons'>Выполнил</button> <button id='removeTask' class='buttons'>Удалить задание</button>";
		var setDone = document.getElementById('setDone');
		var removeTask = document.getElementById('removeTask');
		
	
		
		function setAndSaveClass() {
			event.target.classList.add("done");
			for (var j = 0; j < document.getElementsByTagName("li").length; j++) {
				fav = {
					id: document.getElementsByTagName("li")[j].getAttribute('id'),
					class: document.getElementsByTagName("li")[j].getAttribute('class')
				};
				favs.push(fav);
			}
			// console.log(favs)
			localStorage.setItem("favorites2", JSON.stringify(favs));
		};
		
		function killTask(evt) {
			evt.target.parentNode.remove();
			document.getElementById(liTargetId).remove();

			localStorage.setItem("divIn", outerDiv.innerHTML);
			console.log(evt.target.parenNode)
		
		}

		setDone.addEventListener("click", setAndSaveClass);
		removeTask.addEventListener("click", killTask);

		
		var timer = setTimeout(
				function(){
					newDiv.remove();
				}, 1000);
		
		newDiv.addEventListener("mouseover", function() {clearTimer(timer);});
		newDiv.addEventListener("mouseleave", removeNewDiv);
	};

	function removeNewDiv() {
			var timer = setTimeout(
				function(){
					newDiv.remove();
				}, 1000);
	};
};