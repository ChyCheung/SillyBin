/*
            自动切换图片
        */

// 获取dot
const dots = Array.from(document.querySelectorAll(".dot a"));
const imgArr = [...document.querySelectorAll(".img-list li")];
document.addEventListener("click", (e) => {
  const index = dots.indexOf(e.target);

  if (index !== -1) {
    changeImg(index);
  }
});

/*
            立即执行函数表达式(IIFE):
            之所以要创造“IIFE”，
            是因为它们是立即调用的函数表达式，
            这意味着它们会在运行时立即被调用，
            产生一块独立的块作用域,
            且我们不会再去调用它，
            它只运行一次
        */
const toggleChangeImg = (function () {
  let timer = null;

  return () => {
    if (timer === null) {
      timer = setTimeout(function auto() {
        // 获取当前显示的图片
        changeImg("next");
        timer = setTimeout(auto, 2000);
      }, 2000);
    } else {
      clearTimeout(timer);
      timer = null;
    }
  };
})();

toggleChangeImg();

// 获取outer
const outer = document.getElementsByClassName("outer")[0];
outer.onmouseenter = () => {
  toggleChangeImg();
};
outer.onmouseleave = () => {
  toggleChangeImg();
};

// 点击按钮切换图片
const prev = document.getElementById("prev");
const next = document.getElementById("next");

prev.onclick = () => {
  changeImg("prev");
};

next.onclick = () => {
  changeImg("next");
};

function changeImg(dir) {
  const current = document.querySelector(".img-list .current");

  let next;
  if (dir === "next") {
    // 获取下一张图片
    next = current.nextElementSibling || imgArr[0];
  } else if (dir === "prev") {
    // 获取上一张图片
    next = current.previousElementSibling || imgArr.at(-1);
  } else if (typeof dir == "number") {
    let i = dir;
    next = imgArr[i];
  }

  // 获取要显示图片的索引
  const index = imgArr.indexOf(next);

  // 切换显示状态
  current.classList.remove("current");
  next.classList.add("current");

  // 切换active
  const currentActive = document.querySelector(".dot .active");
  currentActive.classList.remove("active");
  dots[index].classList.add("active");
}
