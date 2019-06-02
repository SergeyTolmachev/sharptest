const User = require('../schemas/User');

const generateTestData = async () => {
  const names = ['Sergey', 'John', 'Mark', 'Aleksey', 'Jack', 'Denis'];
  const lastNames = ['Petrov', 'Sidorov', 'Klinow', 'Pushkin', 'Tolmachev'];
  const users = [];
  for (let i = 0; i < names.length; i = i + 1) {
    for (let j = 0; j < lastNames.length; j = j + 1) {
      users.push({
        name: `${names[i]} ${lastNames[j]}`,
        password: 12345678,
        balance: 500,
        email: `${i}${j}email@test.ru`
      });
    }
  }
  await User.bulkCreate(users);
  console.log('Users were added');
};

generateTestData();
