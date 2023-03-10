(() => {
  const form = document.querySelector('.form-capitalize');
  const copyBtn = document.querySelector('.form-capitalize__copy');
  const small = "(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v[.]?|via|vs[.]?)";
  const punct = "([!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)";

  function lower(word) {
    return word.toLowerCase();
  }

  function upper(word) {
    return word.substr(0,1).toUpperCase() + word.substr(1);
  }

  function isString(val) {
    return typeof val === 'string' ||
      ((!!val && typeof val === 'object') &&
      Object.prototype.toString.call(val) === '[object String]');
  }

  function capitalize(str) {
    if (!isString(str)) return;
    let parts = [];
    let split = /[:.;?!] |(?: |^)["Ō]/g;
    let index = 0;

    while (true) {
      let m = split.exec(str);
      parts
        .push(str.substring(index, m ? m.index : str.length)
        .replace(/\b([A-Za-z][a-z.'Õ]*)\b/g, (all) => {
          return /[A-Za-z]\.[A-Za-z]/.test(all) ? all : upper(all);
        })
        .replace(RegExp('\\b' + small + '\\b', 'ig'), lower)
        .replace(RegExp('^' + punct + small + '\\b', 'ig'), (all, punct, word) => {
          return punct + upper(word);
        })
        .replace(RegExp('\\b' + small + punct + '$', 'ig'), upper));

      index = split.lastIndex;

      if (m) parts.push(m[0]);
      else break;
    }

    return parts
      .join('')
      .replace(/ V(s?)\. /ig, 'v$1.')
      .replace(/(['Õ])S\b/ig, '$1s')
      .replace(/\b(AT&T|Q&A)\b/ig, (all) => all.toUpperCase());
  };

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const input = form.querySelector('.form-capitalize__input');
    const output = form.querySelector('.form-capitalize__output');

    output.value = capitalize(input.value);
  });

  copyBtn.addEventListener('click', function(e) {
    const output = form.querySelector('.form-capitalize__output').value;
    navigator.clipboard.writeText(output).then(() => {
      copyBtn.innerHTML = 'Copied!';

      setTimeout(() => copyBtn.innerHTML = 'Copy', 2000);
    });
  });
})();
