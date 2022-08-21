const readlineSync = require("readline-sync");
// количество попыток
let movesNumber = 5;
// для хранения тек хода
let currentMove = 0;
// количество цифр в числе
let lengthNumber;
// число введеное пользователем
let currentUserNumderArr;

//функция для ввода числа пользователем
const userNumber = () => {
  let number;
  do {
    console.log(`введите число из ${lengthNumber} цифр`);
    number = readlineSync.question("Ваше число: ");
  } while (lengthNumber != number.split("").length);
  return number.split("");
};

// функция для определения количества верных цифр в числе
let numberCorrectPlacesF = () => {
  let numberCorrectPlaces = 0;
  for (let i = 0; i < lengthNumber; i++) {
    if (Number(computerNumberArr[i]) === Number(currentUserNumderArr[i])) {
      numberCorrectPlaces++;
    }
  }
  return numberCorrectPlaces;
};

// функция для проверки числа
const checkNumber = () => {
  let numberCorrectPlaces = numberCorrectPlacesF();
  let numberWrongPlaces = 0;

  for (let j = 0; j < lengthNumber; j++) {
    if (computerNumberArr.includes(Number(currentUserNumderArr[j]))) {
      numberWrongPlaces++;
      // console.log("numberWrongPlaces", numberWrongPlaces);
    }
  }

  numberWrongPlaces = Math.abs(
    Number(numberWrongPlaces) - Number(numberCorrectPlaces)
  );
  console.log(
    `Цифр на своих местах: ${numberCorrectPlaces}, совпавших цифр не на своих местах ${numberWrongPlaces}`
  );
};

// задали количество цифр в числе
do {
  lengthNumber = readlineSync.question(
    "введите желаемое количество цифр в числе(от 3 до 6): "
  );
} while (lengthNumber < 3 || lengthNumber > 6);

// ГЕНЕРИРУЕМ ПРОИЗВОЛЬНОЕ ЧИСЛО
// задаем первую цифру в чиcле
const numberOne = Math.trunc(1 + Math.random() * 8);
let computerNumberArr = [];
computerNumberArr.push(numberOne);
let nextNumber;
// заполняем число, чтоб не было повторных цифр
for (let i = 1; i < lengthNumber; i++) {
  do {
    nextNumber = Math.trunc(0 + Math.random() * 9);
  } while (computerNumberArr.includes(nextNumber));
  computerNumberArr.push(nextNumber);
}
console.log("случайное число", computerNumberArr);

// ПРОВЕРКА ЧИСЛА
while (currentMove < movesNumber) {
  // пользователь вводит число
  currentUserNumderArr = userNumber();
  checkNumber();
  // проверка на правильность числа
  let numberCorrectPlaces = numberCorrectPlacesF();
  if (numberCorrectPlaces == lengthNumber) {
    console.log(`ПОЗДРАВЛЯЕМ! ВЫ УГАДАЛИ ЧИСЛО`);
    break;
  }
  currentMove++;
  // проверка количества ходов
  if (currentMove === movesNumber) {
    console.log(
      "Количество возможных ходов закончилось(((( Попробуйте в следующий раз"
    );
    break;
  }
}
