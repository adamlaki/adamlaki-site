/**
 * Takes a collection and returns it back in issue order
 *
 * @param {Array} collection The 11ty collection
 * @returns {Array} the sorted collection
 */
 module.exports = collection =>
  collection.sort((a, b) =>
    Number(a.data.issue) > Number(b.data.issue) ? 1 : -1
  );
