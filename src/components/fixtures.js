import faker from "faker";

faker.seed(1);

const lists = {};

for (let i = 0; i < 6; i++) {
  const key = faker.lorem.sentence();
  lists[key] = [];
  for (let j = 0; j < faker.random.number({ min: 2, max: 50 }); j++) {
    lists[key].push(faker.lorem.sentence());
  }
}

const fixtures = [];

export const app = {
  component: require(".").default,
  name: "Default",
  props: { lists }
};

fixtures.push(app);

export const board = {
  component: require("./Board").default,
  name: "Default",
  props: { lists }
};

fixtures.push(board);

const nop = () => {};

const listsArray = Object.entries(lists);

export const cardsList = {
  component: require("./CardsList").default,
  name: "Default",
  props: {
    title: listsArray[0][0],
    cards: listsArray[0][1],
    onEditList: nop,
    onQuickEditCard: nop,
    onEditCard: nop
  }
};

fixtures.push(cardsList);

export default fixtures;
