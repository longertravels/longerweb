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

  // ===== 联系表单：异步提交，提交后不跳页 =====
  document.querySelectorAll('form.contact-form').forEach(function (form) {
    var btn = form.querySelector('button[type="submit"]');
    var msg = form.querySelector('.form-msg');
    var originalText = btn ? btn.textContent : '';

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // 蜜罐：被机器人填了就当作成功，静默返回
      var bot = form.querySelector('[name="botcheck"]');
      if (bot && bot.checked) return;

      if (btn) { btn.disabled = true; btn.textContent = '发送中… / Sending…'; }
      if (msg) { msg.textContent = ''; msg.style.display = 'none'; }

      try {
        var res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          form.reset();
          if (msg) {
            msg.style.display = 'block';
            msg.style.color = 'var(--teal)';
            msg.textContent = '收到了！我会在 1–2 天内回复你。/ Got it — I\'ll reply within 1–2 days.';
          }
        } else {
          throw new Error('bad status ' + res.status);
        }
      } catch (err) {
        if (msg) {
          msg.style.display = 'block';
          msg.style.color = '#b3452f';
          msg.textContent = '发送失败，请直接发邮件给我。/ Failed — please email me directly.';
        }
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = originalText; }
      }
    });
  });
});
