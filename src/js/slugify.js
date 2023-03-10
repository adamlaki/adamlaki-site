(() => {
  const form = document.querySelector('.form-slugify');
  const copyBtn = document.querySelector('.form-slugify__copy');
  const generateBtn = form.querySelector('.form-slugify__generate');
  const resetBtn = form.querySelector('.form-slugify__reset');
  const input = form.querySelector('.form-slugify__input');
  const output = form.querySelector('.form-slugify__output');

  /*
   * Slugify a string
   * @param {String} string
   * @return {String}
   * Source: https://mhagemann.medium.com/the-ultimate-way-to-slugify-a-url-string-in-javascript-b8e4a0d849e1
   *
   */
  function slugify(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (input.value.length < 3) return;

    copyBtn.removeAttribute('disabled');
    output.value = slugify(input.value);
  });

  form.addEventListener('reset', function(e) {
    generateBtn.setAttribute('disabled', true);
    resetBtn.setAttribute('disabled', true);
    copyBtn.setAttribute('disabled', true);
  });

  input.addEventListener('input', function(e) {
    if (input.value.length > 2) {
      generateBtn.removeAttribute('disabled');
      resetBtn.removeAttribute('disabled');
    } else {
      generateBtn.setAttribute('disabled', true);
      resetBtn.setAttribute('disabled', true);
    }
  });

  copyBtn.addEventListener('click', function(e) {
    if (output.value.length === 0) return;

    navigator.clipboard.writeText(output.value).then(() => {
      copyBtn.innerHTML = 'Copied!';

      setTimeout(() => copyBtn.innerHTML = 'Copy', 2000);
    });
  });
})();
