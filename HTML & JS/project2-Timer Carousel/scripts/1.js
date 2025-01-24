window.onload = function () {
  /*
        点击按钮切换图片
    */

  // 获取info
  const info = document.getElementById("info");

  // 获取到图片
  const img = document.getElementsByTagName("img")[0];

  // 获取两个按钮
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  // 创建一个数组存储图片路径
  const imgArr = [
    "./img/1.png",
    "./img/2.png",
    "./img/3.png",
    "./img/4.png",
    "./img/5.png",
    "./img/6.png",
  ];

  // 创建变量存储图片索引值
  let current = 0;

  const autoBtn = document.getElementById("autoBtn");

  // 创建一个变量来存储定时器的id
  let timer;

  autoBtn.onclick = () => {
    // 关闭定时器
    clearTimeout(timer);

    // 开启定时器
    timer = setTimeout(function auto() {
      // 修改索引
      next.onclick();

      timer = setTimeout(auto, 3000);
    }, 3000);
  };

  info.textContent = `总共 ${imgArr.length} 张图片，当前第 ${
    current + 1
  } 张图片`;

  // 绑定按钮事件：点击prev按钮时切换上一张图片
  prev.onclick = function () {
    clearTimeout(timer);
    // 检查current是否合法
    current--;
    if (current < 0) {
      current = imgArr.length - 1;
    }
    // 切换图片 ---> 1.jpg
    img.src = imgArr[current];
    info.textContent = `总共 ${imgArr.length} 张图片，当前第 ${
      current + 1
    } 张图片`;
  };
  // 绑定按钮事件：点击next按钮时切换下一张图片
  next.onclick = function () {
    clearTimeout(timer);
    // 检查current是否合法
    current++;
    if (current > imgArr.length - 1) {
      current = 0;
    }
    // 切换图片 ---> 2.jpg 修改img的src属性
    img.src = imgArr[current];
    info.textContent = `总共 ${imgArr.length} 张图片，当前第 ${
      current + 1
    } 张图片`;
  };
};
