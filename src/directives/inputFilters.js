// 不允许输入特殊字符
export const filterSpecialChar = {
  bind: function(El) {
    const el = El.children[0];
    el.addEventListener('change', function() {
      const value = el.value;
      if (!value) {
        return false;
      }
      el.value = el.value
        .replace(
          /[`~!#$%^&*()_\-+=<>?:"{}|,/;'\\[\]·~！#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
          ''
        )
        .replace(/\s/g, '');
    });
  }
};

// 只允许输入纯数字
export const filterDigital = {
  bind: function(El) {
    const el = El.children[0];
    el.addEventListener('input', function() {
      const tempValue = el.value.match(/\d/gi)
        ? el.value.match(/\d/gi)
        : '';
      el.value = tempValue.join('');
      if (el.value.length > 11) {
        el.value = el.value.substr(0, 11);
      }
    });
  }
};
