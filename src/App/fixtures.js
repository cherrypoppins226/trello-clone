import faker from "faker";

const push = (arr, item) => {
  arr.push(item);
  return item;
};

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

export const app = push(fixtures, {
  component: require(".").default,
  name: "Default",
  props: { lists }
});

export const board = push(fixtures, {
  component: require("./Board").default,
  name: "Default",
  props: { lists }
});

const nop = () => {};

const listsArray = Object.entries(lists);

export const cardsList = push(fixtures, {
  component: require("./CardsList").default,
  name: "Default",
  props: {
    title: listsArray[0][0],
    cards: listsArray[0][1],
    onEditList: nop,
    onQuickEditCard: nop,
    onEditCard: nop
  }
});

export default fixtures;
