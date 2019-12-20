var searchInput = document.getElementById("input0");
var searchResult = document.getElementById("search_result");

// 清除建议框内容
function clearContent() {
  var size = searchResult.childNodes.length;
  for (var i = size - 1; i >= 0; i--) {
    searchResult.removeChild(searchResult.childNodes[i]);
  }
};

// 清除建议框内容和输入框内容
function clearContent2() {
  var size = searchResult.childNodes.length;
  for (var i = size - 1; i >= 0; i--) {
    searchResult.removeChild(searchResult.childNodes[i]);
  }
  input0.value = '';
};

var timer = null;

// 注册输入框键盘抬起事件
searchInput.onkeyup = function (e) {
  // 如果输入框内容为空 清除内容且无需跨域请求
  if (this.value.length === 0) {
    clearContent();
    return;
  }
  if (this.timer) {
     clearTimeout(this.timer);
  }
  if (e.keyCode !== 40 && e.keyCode !== 38) {
    // 函数节流优化
    this.timer = setTimeout(() => {
      // 创建script标签JSONP跨域
      var script = document.createElement("script");
      script.src = "https://www.baidu.com/su?&wd=" + encodeURI(this.value.trim()) +
        "&p=3&cb=handleSuggestion";
      document.body.appendChild(script);
    }, 130)
  }
};

// 回调函数处理返回值
function handleSuggestion(res) {
  // 清空之前的数据！！
  clearContent();
  var result = res.s;
  // 截取前九个搜索建议项
  if (result.length > 8) {
    result = result.slice(0, 9)
  }
  for (let i = 0; i < result.length; i++) {
    // 动态创建li标签
    var liObj = document.createElement("li");
    liObj.innerHTML = result[i];
    searchResult.appendChild(liObj);
  }
  // 自执行匿名函数--删除用于跨域的script标签
  (function () {
    var s = document.querySelectorAll('script');
    for (var i = 1, len = s.length; i < len; i++) {
      document.body.removeChild(s[i]);
    }
  })()
}


function jumpPage() {
  form0.submit();
  searchInput.value = '';
  clearContent();
}

// 事件委托 点击li标签或者点击搜索按钮跳转到百度搜索页面
searchResult.addEventListener("click", function (e) {
  if (e.target.nodeName.toLowerCase() === 'li') {
    searchInput.focus();
    var keywords = e.target.innerText;
    searchInput.value = keywords;
    jumpPage();
  } else if (e.target.id === 'btn') {
    jumpPage();
  }
}, false);

var i = 0;
var flag = 1;

// 事件委托 监听键盘事件
searchInput.addEventListener("keydown", function (e) {
  var size = searchResult.childNodes.length;
  // 键盘向下事件
  if (e.keyCode === 40) {
    if (flag === 0) {
      i = i + 2;
    }
    flag = 1;
    e.preventDefault();
    if (i >= size) {
      i = 0;
    }
    if (i < size) {
      searchInput.value = searchResult.childNodes[i++].innerText;
    }
  };
  // 键盘向上事件
  if (e.keyCode === 38) {
    if (flag === 1) {
      i = i - 2;
    }
    flag = 0;
    e.preventDefault();
    if (i < 0) {
      i = size - 1;
    }
    if (i > -1) {
       searchInput.value = searchResult.childNodes[i--].innerText;
    }
  };
}, false);

// 点击页面任何其他地方 搜索结果框消失
document.onclick = () => clearContent2()
