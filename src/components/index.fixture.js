import faker from "faker";
import App from ".";

faker.seed(1);

const lists = {};

for (let i = 0; i < 6; i++) {
  const key = faker.lorem.sentence();
  lists[key] = [];
  for (let j = 0; j < faker.random.number({ min: 2, max: 50 }); j++) {
    lists[key].push(faker.lorem.sentence());
  }
}

export default {
  component: App,
  props: {
    lists
  }
};
