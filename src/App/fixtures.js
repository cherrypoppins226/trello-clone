import React from "react";
import faker from "faker";
import { create } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

// TODO: Log mocked callback functions arguments to console

const jss = create({ plugins: [...jssPreset().plugins] });

const generateClassName = createGenerateClassName();

let fixtures = [];

const addToDefaultExport = namedFixtures => {
  fixtures = fixtures.concat(Object.values(namedFixtures));
  return namedFixtures;
};

const makeFixtures = (Component, namedFixtures) => {
  Object.keys(namedFixtures).forEach(name => {
    const wrapped = props => (
      <CssBaseline>
        <JssProvider jss={jss} generateClassName={generateClassName}>
          <Component {...props} />
        </JssProvider>
      </CssBaseline>
    );
    wrapped.displayName = Component.displayName;
    namedFixtures[name] = {
      name,
      component: wrapped,
      ...namedFixtures[name]
    };
  });
  return namedFixtures;
};

const makeFixturesAndExport = (...args) =>
  addToDefaultExport(makeFixtures(...args));

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

const mockReduxState = {
  lists,
  listBeingEdited: null,
  cardBeingEdited: null,
  cardBeingQuickEdited: null
};

export const App = makeFixturesAndExport(require("./App").default, {
  default: {
    props: { lists },
    reduxState: mockReduxState
  }
});

export const QuickEditCard = makeFixturesAndExport(
  require("./QuickEditCard").default,
  {
    default: {
      props: {
        cardBeingQuickEdited: {
          id: 1,
          title: lists[0].cards[0].title,
          anchorElementBox: { top: 0, left: 0, bottom: 20, right: 200 }
        },
        actions: {
          finishQuickEditCard: () => {}
        }
      }
    }
  }
);

export const CardsList = {};

CardsList.CardsList = makeFixturesAndExport(require("./CardsList").default, {
  default: {
    props: {
      list: lists[0]
    },
    reduxState: mockReduxState
  }
});

CardsList.Cards = makeFixturesAndExport(require("./CardsList/Cards").default, {
  default: {
    props: {
      cards: lists[0].cards
    },
    reduxState: mockReduxState
  }
});

CardsList.ActionsMenu = makeFixturesAndExport(
  require("./CardsList/ActionsMenu").default,
  {
    default: {
      props: {
        listBeingEdited: {
          id: 1,
          anchorElementBox: { top: 0, left: 0, bottom: 0, right: 0 }
        },
        actions: {
          finishEditList: () => {}
        }
      }
    }
  }
);

CardsList.Header = makeFixturesAndExport(
  require("./CardsList/Header").default,
  {
    default: {
      props: {
        listId: lists[0].id,
        listTitle: lists[0].title
      },
      reduxState: mockReduxState
    }
  }
);

CardsList.Card = makeFixturesAndExport(require("./CardsList/Card").default, {
  default: {
    props: {
      card: lists[0].cards[0]
    },
    reduxState: mockReduxState
  }
});

export const EditCard = {};

EditCard.EditCard = makeFixturesAndExport(
  require("./EditCard/EditCard").default,
  {
    default: {
      props: {
        cardBeingEdited: { ...lists[0].cards[0] }
      },
      actions: {
        finishEditCard: () => {}
      }
    }
  }
);

export default fixtures;
