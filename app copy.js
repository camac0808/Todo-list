let taskList = [
  (task1 = {
    a: 1,
    b: 2,
    c: false,
  }),
  (task2 = {
    a: 1,
    b: 2,
    c: false,
  }),
  (task3 = {
    a: 1,
    b: 2,
    c: true,
  }),
];

taskList = taskList.filter((task) => task.c === true);
console.log(taskList[0].c)

let list = [1, 2, 3];
let fli = list.filter((num) => {
  if (num > 2) {
    // true값을 리턴한다
    return "first";
  }
});
console.log(fli);
