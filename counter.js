const CounterPrototype = {
  increment() {
    throw new Error("Not implemented");
  },
  decrement: () => {
    throw new Error("Not implemented");
  },
  getValue: () => {
    throw new Error("Not implemented");
  },
  reset: () => {
    throw new Error("Not implemented");
  },
};

function createCounter(initialValue = 0) {
  let count = initialValue;
  let counter = Object.create(CounterPrototype);

  counter.increment = () => {
    count++;
    return count;
  };
  counter.decrement = () => {
    count--;
    return count;
  };
  counter.getValue = () => count;
  counter.reset = () => {
    count = initialValue;
    return count;
  };
  counter.transform = (transformFn) => {
    let result = transformFn(count);
    count = result;
    return count;
  };

  counter.createPredicate = () => (threshold) =>
    count >= threshold ? true : false;

  counter.onChange = (callback) => {}; //Do not fully understand this

  counter.add = (value) => {
    return createCounter(count + value);
  };
  counter.subtract = (value) => {
    return createCounter(count - value);
  };
  counter.multiply = (value) => {
    return createCounter(count * value);
  };
  counter.snapshot = () => {
    return createCounter(count);
  };
  counter.batch = (operations) => {
    const { increments, decrements } = operations;
    return createCounter(count + increments - decrements);
  };
  counter.toString = () => `count:${count}`;

  return counter;
}

const counter1 = createCounter(3);

const counter2 = createCounter(10);
console.log(counter1.getValue());
console.log(counter2.getValue());

function createAdvancedCounter(config) {
  const {
    initialValue = 0,
    step = 1,
    min = -Infinity,
    max = Infinity,
  } = config;
  let count = Math.max(min, Math.min(max, initialValue));

  return {
    increment() {
      let value = count + step;
      if (value <= max) {
        count = value;
        return count;
      }
    },
    decrement() {
      let value = count - step;
      if (value >= min) count = value;
      return value;
    },
    getValue() {
      return count;
    },
    reset() {
      count = Math.max(min, Math.min(max, initialValue));
      return count;
    },
    getConfig() {
      return config;
    },
  };
}

const conf1 = createAdvancedCounter({
  initialValue: 16,
  step: 5,
  min: 1,
  max: 9,
});

function SumCounter(ArrConters) {
  return ArrConters.reduce((sum, i) => sum + i.getValue(), 0);
}
console.log(SumCounter([counter1, counter2]));
