const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const tabs = document.querySelectorAll(".task-tabs div");
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");

let mode = "all";
let taskList = [];
let filterList = [];

// 날짜 표시 h1
const date = new Date();
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];
h1.innerHTML = `${weekday[date.getDay()]}, `;
h2.innerHTML = `${date.getUTCDate()}th`;
h3.innerHTML = `${month[date.getMonth()]}`;

// 추가 버튼 누를때
function addTask() {
  if (taskInput.value !== "") {
    let task = {
      id: randomIDGenerate(),
      taskValue: taskInput.value,
      taskComplete: false,
    };
    taskList.push(task);
    taskInput.value = "";
  }
  render();
}

// 엔터 쳐서 추가할때
function enterTask(event) {
  if (taskInput.value !== "" && event.keyCode === 13) {
    let task = {
      id: randomIDGenerate(),
      taskValue: taskInput.value,
      taskComplete: false,
    };
    taskList.push(task);
    taskInput.value = "";
  }
  render();
}

// 랜덤id값 부여
function randomIDGenerate() {
  return "_" + Math.random().toString(36).slice(2, 9);
}

// 체크 버튼 누를때
function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].taskComplete = !taskList[i].taskComplete;
      break;
    }
  }
  render();
}

// 삭제 버튼 누를때
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

// 실행 (그리기) 함수
function render() {
  let resultHTML = "";
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].taskComplete == true) {
      resultHTML += `
      <div class="task" style="background-color: lightgray">
        <div class="task-line">
          <input type="checkbox" id="task-checkbox" checked disabled/>${list[i].taskValue}
        </div>
        <div class="button-box">
          <button onClick="toggleComplete('${list[i].id}')" class="button-85">➖</button>
          <button onClick="deleteTask('${list[i].id}')" class="button-85">❌</button>
        </div>
      </div>`;
    } else if (list[i].taskDelete == true) {
      resultHTML += `<div class="task" id="delete">
      <div>${list[i].taskValue}</div>
      <div class="button-box">
        <button onClick="toggleComplete('${list[i].id}')" class="button-85">✔️</button>
        <button onClick="deleteTask('${list[i].id}')" class="button-85">❌</button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
    <div><input type="checkbox" id="task-checkbox" disabled/>${list[i].taskValue}</div>
    <div class="button-box">
      <button onClick="toggleComplete('${list[i].id}')" class="button-85">✔️</button>
      <button onClick="deleteTask('${list[i].id}')" class="button-85">❌</button>
    </div>
  </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

// tab 선택할때 (모두, 진행중, 완료 탭)
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", (event) => {
    mode = event.target.id; // "all" "ongoing" "done"
    //모두탭
    if (mode == "all") {
      render();
    }
    //진행중탭
    else if (mode == "ongoing") {
      filterList = taskList.filter((todo) => todo.taskComplete === false);
      render();
    }
    //완료탭
    else if (mode == "done") {
      filterList = taskList.filter((todo) => todo.taskComplete === true);
      render();
    }
  });
}

taskInput.addEventListener("keydown", enterTask);
addButton.addEventListener("click", addTask);

// pink underline 만들기
const line = document.getElementById("under-line");

tabs.forEach((menu) => {
  menu.addEventListener("click", underLine);
});

function underLine(e) {
  line.style.top = e.target.offsetTop + e.target.offsetHeight + "px";
  line.style.left = e.target.offsetLeft + "px";
  line.style.width = e.target.offsetWidth + "px";
}
