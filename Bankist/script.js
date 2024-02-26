"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Peter Parker",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  movementsDates: [
    "2024-02-15T13:15:33.035Z",
    "2024-02-13T09:48:16.867Z",
    "2024-02-09T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  pin: 1111,
};

const account2 = {
  owner: "Tony Stark",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  pin: 2222,
};

const account3 = {
  owner: "Brues Wayen",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  pin: 3333,
};

const account4 = {
  owner: "Clark Kent",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  movementsDates: [
    "2024-02-15T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const calcDisplySummery = function (acc) {
  const income = acc.movements
    .filter((mov) => {
      return mov > 0;
    })
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  const expensess = acc.movements
    .filter((mov) => {
      return mov < 0;
    })
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  const intrest = acc.movements
    .filter((deposit) => {
      return deposit > 0;
    })
    .map((int) => {
      return (int * acc.interestRate) / 100;
    })
    .filter((int) => {
      return int >= 1;
    })
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  // console.log(Math.abs(expensess))
  // console.log(income)
  labelSumInterest.textContent = `${intrest}€`;
  labelSumIn.textContent = `${income}€`;
  labelSumOut.textContent = `${Math.abs(expensess)}€`;
};

//
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort
    ? acc.movements.slice().sort((a, b) => {
        return a - b;
      })
    : acc.movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const calcdaypassed =  function(date1, date2){
      const result = Math.trunc (Math.abs((date1 - date2)/(1000*60*60*24)))
      return result
    }


    const date = new Date(acc.movementsDates[i]);
    const day = `${date.getDate()}`.padStart(2,0)
    const month = `${date.getMonth()+1}`.padStart(2,0)
    const year = date.getFullYear()
    const dayPassed = calcdaypassed( date,new Date())
    console.log(dayPassed)
    let displydate;
    if(dayPassed === 0){
      displydate = "Today"
    }else if (dayPassed === 1) {
      displydate = "Yesterday"
    }else if(dayPassed <=7){
      displydate = `${dayPassed} days ago`
    }else{
      displydate= `${day}/${month}/${year}`
    }



    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} deposit</div>
    <div class="movements__date">${displydate}</div>
    <div class="movements__value">${mov}€</div>
  </div>
  `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const totalMoney = function (acc) {
  const totalBankBalance = acc.movements.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  labelBalance.textContent = `${totalBankBalance}€`;
};



const UpdateUI = function (acc) {
  //display Movement
  displayMovements(acc);
  //display Total
  totalMoney(acc);
  //Display summery
  calcDisplySummery(acc);
};


// console.log(totalMoney(account1.movements))

const createUserName = function (accounts) {
  accounts.forEach((acc) => {
    const lowerCaseUser = acc.owner.toLowerCase().split(" ");
    const userName = lowerCaseUser.map((name) => {
      return name[0];
    });
    acc.userName = userName.join("");
  });
};

createUserName(accounts);
let currentAccountUser, setTimer;
// LoginTime
// logouttime
const startLogTimeout = function(){
  let time = 120
  const tick = function(){
    const min = String(Math.trunc(time/60)).padStart(2,'0');
    const sec = String(time%60).padStart(2, "0")
    labelTimer.textContent = `${min}:${sec}`
    if(time === 0){
      clearInterval(timer);
      labelWelcome.textContent =`Log in to get started`
      containerApp.style.opacity = 0
    }

    time--
  }
  tick()
  const timer = setInterval(tick,1000)
  return timer
}
// Event Handler
// login
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Login");
  currentAccountUser = accounts.find((user) => {
    return user.userName === inputLoginUsername.value;
  });
  console.log(currentAccountUser);
  //UI and Message
  if (currentAccountUser?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Hi, ${currentAccountUser.owner}`;
  }
  containerApp.style.opacity = 100;
  inputLoginUsername.value = inputLoginPin.value = "";
  inputLoginPin.blur();
  if(setTimer){
    clearInterval(setTimer)
  }
  setTimer = startLogTimeout()
  UpdateUI(currentAccountUser);
  //display Movement
  // displayMovements(currentAccountUser.movements);
  // //display Total
  // totalMoney(currentAccountUser.movements);
  // //Display summery
  // calcDisplySummery(currentAccountUser);
});

// Loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccountUser.movements.some((mov) => {
      return mov >= amount * 0.1;
    })
  ) {
    currentAccountUser.movements.push(amount);
    UpdateUI(currentAccountUser);
  }
  clearInterval(setTimer)
  setTimer = startLogTimeout()
});

// Deleting User
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccountUser.userName &&
    Number(inputClosePin.value) === currentAccountUser.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.userName === inputCloseUsername.value
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = "Log in to get started";
    console.log(accounts);
  }
});

// Sorting
let sorted = false;
btnSort.addEventListener("click", function () {
  displayMovements(currentAccountUser, !sorted);
  sorted = !sorted;
});

// console.log(accounts)

// const user = "Perter Parker";
// const lowerCaseUser = user.toLowerCase().split(" ");
// console.log(lowerCaseUser);
// const userName = lowerCaseUser.map((name) => {
//   return name[0];
// });

// console.log(userName.join(""));

// Map

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const depositAndWithdrawal = movements.map((currentElement, i, arr) => {
//   if (currentElement > 0) {
//     return `Deposit ${i + 1}:  ${currentElement}`;
//   } else {
//     return `Withdrawal ${i + 1}:  ${Math.abs(currentElement)}`;
//   }
// });

// console.log(depositAndWithdrawal);

// const student = [
//   { name: 'John', score: 88 },
//   { name: 'Jane', score: 92 },
//   { name: 'Oliver', score: 78 },
//   { name: 'Nakul', score: 33 },
// ]

// const studentGrade = student.map((stu)=>{
//   if(stu.score >=90){
//     return {...stu, grade:"A"}
//   }else if(stu.score >=80){
//     return {...stu, grade:"B"}
//   }else if(stu.score >=70){
//     return {...stu, grade:"C"}
//   }else{
//     return {...stu, grade:"D"}
//   }
// })

// console.log(studentGrade)
// console.log("----------Filter----------")
// // Filter
// const deposit = movements.filter((dep, i)=>{
//   return  dep>0;
// })
// console.log(deposit)
// const withdrawals = movements.filter((witd)=>{
//   return witd < 0
// })
// console.log(withdrawals)

// // Reduce
// const balance = movements.reduce((acc, cur)=>{
//   return acc + cur
// },0)

// console.log(balance)

// const displayMovements = function (movements) {
//   containerMovements.innerHTML = "";
//   movements.forEach((mov, i) => {
//     //Temple litral is good for creating the html in js
//     const type = mov > 0 ? "deposit" : "withdrawal";
//     const html = `
//     <div class="movements__row">
//     <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
//     <div class="movements__value">${mov}€</div>
//   </div>
//   `;
//     // To insert this above html we going to use a method insertAdjacentHTML
//     // This method get two parameters strings i) position in which we want to attache the element ii)
//     containerMovements.insertAdjacentHTML("afterbegin", html);
//   });
// };
// displayMovements(account1.movements);

// Find method
const movements = [200, 450, -400, 3000, -650, -130, 200, 1300];
const firstElement = movements.find((mov) => {
  return mov === 200;
});
console.log(firstElement);

const firstIndex = movements.findIndex((mov) => {
  return mov > 400;
});
console.log(firstIndex);





// return < 0 A,B
//retun > 0 B,A

console.log(
  movements.sort((a, b) => {
    if (a > b) {
      return 1;
    }
    if (b > a) {
      return -1;
    }
  })
);

const arr1 = [
  [1, [2, 3]],
  [4, [5, 6], 7],
];
const flattenArr = arr1.flat(2);
console.log(flattenArr);

const accountMovement = accounts.map((acc) => {
  return acc.movements;
});

const accountMovementflate = accountMovement.flat();
const arr2 = accounts.flatMap((acc) => {
  return acc.movements;
});
console.log(arr2);
console.log(accountMovementflate);


const somevalue = movements.some((mov) => {
  return mov > 300;
});

console.log(somevalue);


// Number
console.log(0.1+0.2)

console.log(Number.parseInt("123hu")); // parseInt()
console.log(Number.parseFloat("123.3hu")); // parseInt()

console.log(isNaN(45))
console.log(isNaN("45"))
console.log(isNaN(0/0))
// isFinite
console.log(isFinite(0/0))
console.log((45/0))

const arr = [1,2,3,44]


console.log(Math.max(...arr))
console.log(Math.min(...arr))

const random = Math.trunc(Math.random()*6 + 1)

console.log(random)

const randomInt = (min,max)=>{
  return Math.trunc(Math.random() * (max - min) + 1) + min
}

console.log(randomInt(30,50))

// Trunc
console.log(Math.trunc(12.3));
console.log(Math.trunc(12.9));

// Rounding]
console.log(Math.round(12.3));
console.log(Math.round(12.9));

// ceil
console.log(Math.ceil(12.1));
console.log(Math.ceil(12.9));
// floor
console.log(Math.floor(12.3))
console.log(Math.floor(12.9))
console.log(Math.floor(-12.9))
console.log(Math.trunc(-12.9))

// Numerical Saparation

console.log(30_00_00_000)

// Big Int



console.log(2**53 + 1)
console.log(2**53 + 5)
console.log(2**53 + 60)
console.log(2**53 + 50)
console.log(2**53 + 90)

console.log(34 > 56468464654564568463545646584658435815384684n)
console.log(BigInt(100000))

// Create Date

// const future = new Date(2024, 1, 11)
// const future = new Date()
// console.log(future)
// const [day, mon, date, year] = String(future).split(" ")
// console.log(day)
// console.log(mon)
// console.log(date)
// console.log(year)

// const day1 = future.getDay()
// const date1 = future.getDate()
// const month= future.getMonth()
// const Year = future.getFullYear()
// console.log(Year)

// const date3 = future.setDate(11)
// console.log(date3)
// console.log(future)
const movementsDates= [
  "2024-01-01T13:15:33.035Z",
  "2019-11-30T09:48:16.867Z",
  "2019-12-25T06:04:23.907Z",
  "2020-01-25T14:18:46.235Z",
  "2020-02-05T16:33:06.386Z",
  "2020-04-10T14:43:26.374Z",
  "2020-06-25T18:49:59.371Z",
  "2020-07-26T12:01:20.894Z",
]

const calcdaypassed =  function(date1, date2){
      const result = Math.trunc (Math.abs((date1 - date2)/(1000*60*60*24)))
      return result
    }

    const date = new Date(movementsDates[0]);
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const dayPassed = calcdaypassed( date,new Date())
    console.log(dayPassed)

    // Timer setTimeout
    const ingredents = ["gdsfg", "onion"]
    const timer = setTimeout((ing1, ing2)=> console.log(`Here is you pizza ${ing1} and ${ing2}`), 2000, ...ingredents)
    console.log("waiting...")

    if(ingredents.includes("spinach")){
      clearTimeout(timer)
    }
  
    // setInterval

    // setInterval(function(){
    //   const now = new Date()
    //   console.log(now)
    // }, 1000)