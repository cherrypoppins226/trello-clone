import faker from "faker";

faker.seed(1);

const lists = [];

let nextCardId = 1;

for (let i = 1; i < 7; i++) {
  const list = {
    id: i,
    title: faker.lorem.sentence(),
    cards: []
  };
  for (let j = 0; j < faker.random.number({ min: 2, max: 50 }); j++) {
    list.cards.push({
      id: nextCardId++,
      title: faker.lorem.sentence()
    });
  }
  lists.push(list);
}

const appData = { lists };

export default appData;
