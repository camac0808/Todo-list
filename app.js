// 유저가 input에 값을 입력
// + 버튼 누르면 할일 추가된다
// delete 버튼 누르면 삭제된다
// check 버튼 누르면 할일 밑줄 그인다
// 진행중 끝남 탭을 누르면 언더바 이동
// 끝남탭은 끝난 아이템만
// 진행중은 진행중 아이템만 출력
// 전체누르면 전체로 돌아옴

const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const tabsButton = document.getElementsByClassName("tabs-btn");
let taskList = [];

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
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].taskComplete == true) {
      resultHTML += `
      <div class="task" style="background-color: lightgray">
        <div class="task-line">${taskList[i].taskValue}</div>
        <div class="button-box">
          <button onClick="toggleComplete('${taskList[i].id}')" class="button-85">➖</button>
          <button onClick="deleteTask('${taskList[i].id}')" class="button-85">❌</button>
        </div>
      </div>`;
    } else if (taskList[i].taskDelete == true) {
      resultHTML += `<div class="task" id="delete">
      <div class="task-line">${taskList[i].taskValue}</div>
      <div class="button-box">
        <button onClick="toggleComplete('${taskList[i].id}')" class="button-85">✔️</button>
        <button onClick="deleteTask('${taskList[i].id}')" class="button-85">❌</button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
    <div>${taskList[i].taskValue}</div>
    <div class="button-box">
      <button onClick="toggleComplete('${taskList[i].id}')" class="button-85">✔️</button>
      <button onClick="deleteTask('${taskList[i].id}')" class="button-85">❌</button>
    </div>
  </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function filterTabs() {
  tabsArr = []
}

taskInput.addEventListener("keydown", enterTask);
addButton.addEventListener("click", addTask);
tabsButton.addEventListener("click", filterTabs)