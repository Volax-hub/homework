const userInfo = {
  name: "Alex",
  age: 24,
  getName(name) {
    return `Hello "${name}".`;
  },
};

console.log(userInfo.getName("Oleg"));

const usersArr = [
  {
    name: "alex",
    age: 23,
    isAdmin: false,
  },
  {
    name: "john",
    age: 30,
    isAdmin: true,
  },
  {
    name: "ivan",
    age: 30,
    isAdmin: false,
  },
];

let countUsers = 0;

for (let i = 0; i < usersArr.length; i++) {
  if (usersArr[i].isAdmin === false) {
    countUsers += 1;
  }
}

console.log(countUsers);
