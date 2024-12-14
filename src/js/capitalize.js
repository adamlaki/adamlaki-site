(() => {
  const form = document.querySelector('.form-capitalize');
  const copyBtn = document.querySelector('.form-capitalize__copy');
  const generateBtn = form.querySelector('.form-capitalize__generate');
  const resetBtn = form.querySelector('.form-capitalize__reset');
  const input = form.querySelector('.form-capitalize__input');
  const output = form.querySelector('.form-capitalize__output');
  const small = '(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v[.]?|via|vs[.]?)';
  const punct = "([!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)";

  function lower (word) {
    return word.toLowerCase();
  }

  function upper (word) {
    return word.substr(0, 1).toUpperCase() + word.substr(1);
  }

  function isString (val) {
    return typeof val === 'string' ||
      ((!!val && typeof val === 'object') &&
      Object.prototype.toString.call(val) === '[object String]');
  }

  /*
   * Capitalize a string
   * @param {String} str
   * @return {String}
   * Source: https://github.com/a-axton/capitalize-title
   */
  function capitalize (str) {
    if (!isString(str)) return;
    const parts = [];
    const split = /[:.;?!] |(?: |^)["Ō]/g;
    let index = 0;

    while (true) {
      const m = split.exec(str);
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
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (input.value.length < 3) return;

    copyBtn.removeAttribute('disabled');
    output.value = capitalize(input.value);
  });

  form.addEventListener('reset', function (e) {
    generateBtn.setAttribute('disabled', true);
    resetBtn.setAttribute('disabled', true);
    copyBtn.setAttribute('disabled', true);
  });

  input.addEventListener('input', function (e) {
    if (input.value.length > 2) {
      generateBtn.removeAttribute('disabled');
      resetBtn.removeAttribute('disabled');
    } else {
      generateBtn.setAttribute('disabled', true);
      resetBtn.setAttribute('disabled', true);
    }
  });

  copyBtn.addEventListener('click', function (e) {
    if (output.value.length === 0) return;

    navigator.clipboard.writeText(output.value).then(() => {
      copyBtn.innerHTML = 'Copied!';

      setTimeout(() => { copyBtn.innerHTML = 'Copy'; }, 2000);
    });
  });
})();
