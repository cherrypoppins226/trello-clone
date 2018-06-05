import { AppState } from "./App";
// Temporary, just to appease visual snapshot tests
import { store as lists } from "./mockGraphqlSchema";

// TODO: Log mocked mobx callback functions arguments to console

let fixtures = [];

const addToDefaultExport = namedFixtures => {
  fixtures = fixtures.concat(Object.values(namedFixtures));
  return namedFixtures;
};

const makeFixtures = (component, namedFixtures) => {
  Object.keys(namedFixtures).forEach(name => {
    namedFixtures[name] = {
      name,
      component,
      ...namedFixtures[name]
    };
  });
  return namedFixtures;
};

const makeFixturesAndExport = (...args) =>
  addToDefaultExport(makeFixtures(...args));

export const App = makeFixturesAndExport(require("./App").default, {
  default: {}
});

export const QuickEditCard = makeFixturesAndExport(
  require("./app/QuickEditCard").default,
  {
    default: {
      props: {
        appState: {
          cardBeingQuickEdited: {
            ...lists[0].cards[0],
            anchorElementBox: { top: 0, left: 0, bottom: 20, right: 200 }
          },
          finishQuickCardEdit: () => {}
        }
      }
    }
  }
);

export const CardsList = {};

CardsList.CardsList = makeFixturesAndExport(
  require("./app/CardsList").default,
  {
    default: {
      props: {
        id: 1
      },
      stores: {
        appState: new AppState()
      }
    }
  }
);

CardsList.Cards = makeFixturesAndExport(
  require("./app/cardsList/Cards").default,
  {
    default: {
      props: {
        cards: lists[0].cards
      },
      stores: {
        appState: new AppState()
      }
    }
  }
);

CardsList.ActionsMenu = makeFixturesAndExport(
  require("./app/cardsList/ActionsMenu").default,
  {
    default: {
      props: {
        appState: {
          listBeingEdited: {
            id: 1,
            anchorElementBox: { top: 0, left: 0, bottom: 0, right: 0 }
          },
          finishListEdit: () => {}
        }
      }
    }
  }
);

CardsList.Header = makeFixturesAndExport(
  require("./app/cardsList/Header").default,
  {
    default: {
      props: {
        listId: lists[0].id,
        listTitle: lists[0].title
      },
      stores: {
        appState: new AppState()
      }
    }
  }
);

CardsList.Card = makeFixturesAndExport(
  require("./app/cardsList/Card").default,
  {
    default: {
      props: {
        card: lists[0].cards[0]
      },
      stores: {
        appState: new AppState()
      }
    }
  }
);

export const EditCard = {};

EditCard.EditCard = makeFixturesAndExport(require("./app/EditCard").default, {
  default: {
    props: {
      appState: {
        cardBeingEdited: { ...lists[0].cards[0] },
        finishCardEdit: () => {}
      }
    }
  }
});

export default fixtures;
