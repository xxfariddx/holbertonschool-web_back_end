function createTracker(original) {
  const tracker = function (...args) {
    tracker.calls.push(args);
    if (tracker._fakeImpl) {
      return tracker._fakeImpl.apply(this, args);
    }
    if (tracker._returnValueSet) {
      return tracker._returnValue;
    }
    return original && original.apply(this, args);
  };

  tracker.calls = [];
  tracker.calledOnce = false;
  tracker._returnValueSet = false;
  tracker._returnValue = undefined;
  tracker._fakeImpl = null;
  tracker.restore = () => {};
  tracker.returns = (value) => {
    tracker._returnValueSet = true;
    tracker._returnValue = value;
    return tracker;
  };
  tracker.calledWith = (...expectedArgs) => tracker.calls.some((call) => call.length >= expectedArgs.length && expectedArgs.every((arg, index) => call[index] === arg));
  tracker.calledOnceWithExactly = (...expectedArgs) => tracker.calls.length === 1 && tracker.calledWith(...expectedArgs) && tracker.calls[0].length === expectedArgs.length;
  Object.defineProperty(tracker, 'calledOnce', {
    get() {
      return tracker.calls.length === 1;
    },
  });
  return tracker;
}

function spy(object, methodName) {
  const original = object[methodName];
  const tracker = createTracker(original);
  object[methodName] = tracker;
  tracker.restore = () => {
    object[methodName] = original;
  };
  return tracker;
}

function stub(object, methodName) {
  return spy(object, methodName);
}

module.exports = { spy, stub };