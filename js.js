window.onload = function () {
	
	var taskArr = [];
	var outerDiv = document.getElementById("out");
	var button = document.getElementById("add");
	var kilLocalStorage = document.getElementById("kilLocalStorage");
	var refresh = document.getElementById("refresh");

	button.addEventListener("click", showArr);
	kilLocalStorage.addEventListener("click", clearLocalStorage);
	refresh.addEventListener("click", refreshPage); 

	if(localStorage.getItem("taskArr")!=undefined){
		taskArr = JSON.parse(localStorage.getItem("taskArr"));
	};

	if(localStorage.getItem("divIn")!=undefined){
		outerDiv.innerHTML = localStorage.getItem("divIn");
	};

	
	
	function showArr() {
		var testP = document.getElementById("testP");
		if(testP) {
			testP.remove();
		};
		var task = document.getElementById("in").value;
		var newTask = document.createElement("p");
		outerDiv.appendChild(newTask);		
		newTask.className = "newTask";
		var temp = {};
		temp.main = task;
		var i = taskArr.length;
		taskArr[i] = temp;
		newTask.innerHTML = temp.main;
		setStorage();
		document.getElementById("in").value = "";
		console.log(taskArr);
		//добавляем событие к новому праграфу
		newTask.addEventListener("click", setParagraph);
	};

	function setStorage() {
		localStorage.setItem("taskArr", JSON.stringify(taskArr));
		localStorage.setItem("divIn", outerDiv.innerHTML);
	};

	function clearLocalStorage() {
		 localStorage.clear();
	};

	function refreshPage() {
		location.reload();
	};

	function setParagraph(event) {
		var newDiv = document.createElement("div");
		outerDiv.appendChild(newDiv);
		newDiv.className = "newDiv";
		newDiv.style.left = event.clientX + "px";
		newDiv.style.top = event.clientY-40 + "px";
		var timer = setTimeout(
				function(){
					newDiv.remove();
				}, 2000);
		newDiv.addEventListener("mouseover", function() {clearTimeout(timer);});
		newDiv.addEventListener("mouseleave", function() {
			newDiv.style.opacity = 0;
			// newDiv.style.display = "none";
			}
		);
	};
};