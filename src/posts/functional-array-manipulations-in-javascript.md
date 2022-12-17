---
title: 'Functional Array Manipulations in JavaScript'
date: '2022-12-17'
tags: ['JS', 'Notes']
---

Simple array collection manipulation is an essential part of any language. In JS, we have a lot of helper methods that we can quickly get, modify and transform our base data.

We will alter - _through examples_ - the following cart array:

```javascript
const cart = [
  {
    name: 'iPhone 14',
    price: 999,
    quantity: 2
  },
  {
    name: 'Google Pixel 7',
    price: 899,
    quantity: 3
  },
  {
    name: 'POCO M5',
    price: 799,
    quantity: 1
  }
];
```

## Array Filtering

Using the `filter` method, we can return - _and create a new array_ - items from our collection based on a condition.

If you want to get just the items with a price higher than 900, you can use this one-line filter:

```javascript
const filteredCart = cart.filter(item => item.price > 900);
```
```javascript
[
  {
    name: 'iPhone 14',
    price: 999,
    quantity: 2
  }
]
```

## Array Mapping

With the `map` method, we can individually manipulate items while iterating through the base collection. It is also will give us back a new array.

In the following example, we modify the quantity of the items by multiplying them by two:

```javascript
const newCart = cart.map(item => {
    return {
        ...item,
        quantity: item.quantity * 2
    }
});
```

```javascript
const cart = [
  {
    name: 'iPhone 14',
    price: 999,
    quantity: 4
  },
  {
    name: 'Google Pixel 7',
    price: 899,
    quantity: 6
  },
  {
    name: 'POCO M5',
    price: 799,
    quantity: 2
  }
];
```

## Array Reducing

We can combine more values into one with the `reduce` method. This can be useful if we want to sum something like, in this example, the price:

```javascript
const sum = cart.reduce((accumulator, item) => accumulator + item.price, 0) ;

// the result will be 2697
```

## Testing Items With Every

The `every` method will test all elements on a provided test and returns an overall boolean value based on it. If all items pass the test, it is `true`; otherwise `false`.

```javascript
cart.every(item => item.price > 500)
// will return true
```

```javascript
cart.every(item => item.price > 800)
// will return false
```

## Testing Items With Some

The `some` method will run until the callback function doesn’t return `true`. It is kind of the opposite of the `every` approach; here you only need one item to pass the callback’s condition to return a `true` value.

```javascript
cart.some(item => item.name === 'iPhone 14')
// will return true
```

## References
- [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
