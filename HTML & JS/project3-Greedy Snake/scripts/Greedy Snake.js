// 获取GameOver
const gameOver = document.querySelector(".game-over");
// 获取蛇
const snake = document.getElementById("snake");
// 获取蛇的各个部分
const snakes = snake.getElementsByTagName("div");
// 获取食物
const food = document.getElementById("food");

// 获取分数和level的span
const scoreSpan = document.getElementById("score");
const levelSpan = document.getElementById("level");

let score = 0;
let level = 0;

function changeFoodPosition() {
  // 改变食物的位置(坐标: 0~290, 10的倍数, 随机值)
  const x = Math.floor(Math.random() * 30) * 10; // 0~29
  const y = Math.floor(Math.random() * 30) * 10; // 0~29
  // console.log(`食物坐标: ${x},${y}`);

  food.style.left = x + "px";
  food.style.top = y + "px";
}

// 定义变量存储蛇的移动方向
let dir;

// 定义变量记录按键状态
let keyActive = true;

/*
    绑定按键事件keydown keyup
        - 键盘事件只能绑定给可以获取焦点的元素或者document
*/

const keyArr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

/*
    禁止掉头
        构成要件:
            1.身体超过2
            2.不能是相反的方向
        处理:
            保持原来的方向不变(不修改dir值)

*/
const reObj = {
  ArrowUp: "ArrowDown",
  ArrowDown: "ArrowUp",
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft",
};

document.addEventListener("keydown", (e) => {
  // console.log("keydown");
  // 判断蛇是否掉头
  if (keyActive && keyArr.includes(e.key)) {
    if (snakes.length < 2 || reObj[dir] !== e.key) {
      dir = e.key;
      keyActive = false;
    }
  }
});

changeFoodPosition();

setTimeout(function move() {
  // 获取蛇头
  const headS = snakes[0];

  let x = headS.offsetLeft;
  let y = headS.offsetTop;

  switch (dir) {
    case "ArrowUp":
      // console.log("↑");
      y -= 10;
      break;
    case "ArrowDown":
      // console.log("↓");
      y += 10;
      break;
    case "ArrowLeft":
      // console.log("←");
      x -= 10;
      break;
    case "ArrowRight":
      // console.log("→");
      x += 10;
      break;
  }

  /*
        检查蛇是否吃到食物
    */

  // console.log(food.offsetTop, food.offsetLeft);
  // console.log(headS.offsetTop, headS.offsetLeft);

  if (
    headS.offsetTop === food.offsetTop &&
    headS.offsetLeft === food.offsetLeft
  ) {
    // 改变食物位置
    changeFoodPosition();
    // 增加蛇的身体
    snake.insertAdjacentHTML("beforeend", "<div/>");
    score++;
    scoreSpan.textContent = score;

    // 检查等级
    if (score % 10 === 0 && level < 14) {
      level++;
      levelSpan.textContent = level + 1;
    }
  }

  /*
        游戏终止
            1.撞墙
            2.撞自己
    */
  if (x < 0 || x > 290 || y < 0 || y > 290) {
    // 游戏结束
    // alert("撞墙了,游戏结束!");
    gameOver.style.display = "block";
    return;
  }

  for (let i = 0; i < snakes.length - 1; i++) {
    if (snakes[i].offsetLeft === x && snakes[i].offsetTop === y) {
      // 游戏结束
      //   alert("撞到自己了,游戏结束");
      gameOver.style.display = "block";
      return;
    }
  }

  /*评分*/

  // 获取尾巴
  const tail = snakes[snakes.length - 1];
  // 移动蛇的位置
  tail.style.top = y + "px";
  tail.style.left = x + "px";

  // 将尾巴设置为蛇头
  snake.insertAdjacentElement("afterbegin", tail);
  keyActive = true;
  setTimeout(move, 300 - level * 20);
}, 300);
