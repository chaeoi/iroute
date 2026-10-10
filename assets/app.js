// 自适应布局：列数由 CSS 按屏宽决定，这里只负责「按屏高决定多少行显示国旗」——
// 放不下的行降级为缩写 chip，保证 64 个地区在一屏内完全显示、不滚动不截断。
(function () {
  var list = document.querySelector('.store-list');
  if (!list) return;

  var cards = Array.prototype.slice.call(list.children);
  var total = cards.length;

  function readVar(name, fallback) {
    var v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
    return isNaN(v) ? fallback : v;
  }

  function apply(flagRows, cols) {
    var cut = flagRows * cols;
    for (var i = 0; i < total; i++) {
      var compact = i >= cut;
      if (compact !== cards[i].classList.contains('is-compact')) {
        cards[i].classList.toggle('is-compact', compact);
      }
    }
  }

  function shellPadBottom() {
    var shell = document.querySelector('.page-shell');
    return shell ? parseFloat(getComputedStyle(shell).paddingBottom) || 0 : 0;
  }

  // 按公式估算能放下多少行国旗（含降级行），作为验证循环的起点
  function estimateFlagRows(cols) {
    var cardH = readVar('--card-h', 76);
    var chipH = readVar('--chip-h', 22);
    var gap = readVar('--gap', 8);
    var rowsAll = Math.ceil(total / cols);
    var top = list.getBoundingClientRect().top;
    var avail = window.innerHeight - top - shellPadBottom();

    for (var r = rowsAll; r >= 0; r--) {
      var chipRows = Math.ceil((total - r * cols) / cols);
      var rows = r + chipRows;
      var h = r * cardH + chipRows * chipH + Math.max(0, rows - 1) * gap;
      if (h <= avail) return r;
    }
    return 0;
  }

  function fits() {
    var rect = list.getBoundingClientRect();
    return rect.top >= 0 && document.documentElement.scrollHeight <= window.innerHeight + 1;
  }

  function fit() {
    var cols = readVar('--cols', 8);
    if (!cols) cols = 8;
    var rowsAll = Math.ceil(total / cols);
    var r = Math.min(rowsAll, estimateFlagRows(cols) + 1); // 乐观一档，验证不通过再降

    while (r >= 0) {
      apply(r, cols);
      if (fits()) break;
      r--;
    }
    if (r < 0) apply(0, cols);
  }

  var timer = null;
  function scheduleFit() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fit, 80);
  }

  fit();
  window.addEventListener('resize', scheduleFit);
  window.addEventListener('orientationchange', scheduleFit);
  window.addEventListener('load', fit);
})();
