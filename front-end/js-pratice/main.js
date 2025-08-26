// 1. Swap two variables without using a third variable
let a = 5;
let b = 10;

a = a + b; // 15
b = a - b; // 5
a = a - b; // 10

console.log("a =", a, "b =", b);


// 2. Find the maximum number in an array
let numbers = [4, 9, 2, 7, 5];
let max = numbers[0]; // assume first is max
for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] > max) {
    max = numbers[i];
  }
}
console.log("Max:", max);


// 3. Count vowels in a string
let str = "JavaScript is awesome";
let count = 0;
for (let i = 0; i < str.length; i++) {
  let ch = str[i].toLowerCase();
  if (ch === "a" || ch === "e" || ch === "i" || ch === "o" || ch === "u") {
    count++;
  }
}
console.log("Vowel count:", count);


// 4. Check if a number is prime
function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}
console.log("Is 17 prime?", isPrime(17));


// 5. Reverse a string
function reverseString(word) {
  let reversed = "";
  for (let i = word.length - 1; i >= 0; i--) {
    reversed = reversed + word[i];
  }
  return reversed;
}
console.log("Reverse of hello:", reverseString("hello"));


// 6. Sum only even numbers in an array
let nums = [1, 2, 3, 4, 5, 6];
let sumEven = 0;
for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 === 0) {
    sumEven = sumEven + nums[i];
  }
}
console.log("Sum of even numbers:", sumEven);


// 7. Remove duplicates from an array
let arr = [1, 2, 3, 2, 4, 1, 5];
let newArr = [...new Set(arr)];
console.log("Unique array:", newArr);


// 8. FizzBuzz challenge
for (let i = 1; i <= 30; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}


// 9. Factorial of a number
function factorial(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result = result * i;
  }
  return result;
}
console.log("Factorial of 5:", factorial(5));


// 10. Create an object and loop over its properties
let car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
  color: "blue"
};

for (let key in car) {
  console.log(key + ": " + car[key]);
}
