// 移动端导航开合 + 年份自动更新
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    // 点击链接后自动收起
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
