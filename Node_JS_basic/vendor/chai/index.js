const assert = require('assert');

function expect(value) {
  const api = {};

  Object.defineProperties(api, {
    to: {
      get() {
        return api;
      },
    },
    be: {
      get() {
        return api;
      },
    },
    have: {
      get() {
        return api;
      },
    },
    deep: {
      get() {
        return {
          equal(expected) {
            assert.deepStrictEqual(value, expected);
            return api;
          },
        };
      },
    },
    true: {
      get() {
        assert.strictEqual(value, true);
        return api;
      },
    },
    false: {
      get() {
        assert.strictEqual(value, false);
        return api;
      },
    },
    undefined: {
      get() {
        assert.strictEqual(value, undefined);
        return api;
      },
    },
    exist: {
      get() {
        assert.notStrictEqual(value, null);
        assert.notStrictEqual(value, undefined);
        return api;
      },
    },
  });

  api.equal = function equal(expected) {
    assert.strictEqual(value, expected);
    return api;
  };

  api.lengthOf = function lengthOf(expected) {
    assert.strictEqual(value.length, expected);
    return api;
  };

  api.property = function property(name) {
    assert.ok(value && Object.prototype.hasOwnProperty.call(value, name));
    return expect(value[name]);
  };

  return api;
}

module.exports = { expect };