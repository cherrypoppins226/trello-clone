import faker from "faker";

faker.seed(1);

export const testData = {
  [faker.lorem.sentence()]: [faker.lorem.sentence(), faker.lorem.sentence()],
  [faker.lorem.sentence()]: [faker.lorem.sentence(), faker.lorem.sentence()]
};

export const appData = {};
for (let i = 0; i < 6; i++) {
  const key = faker.lorem.sentence();
  appData[key] = [];
  for (let j = 0; j < faker.random.number({ min: 2, max: 50 }); j++) {
    appData[key].push(faker.lorem.sentence());
  }
}
