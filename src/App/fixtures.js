import React from "react";
import faker from "faker";
import { create } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

const jss = create({ plugins: [...jssPreset().plugins] });

const generateClassName = createGenerateClassName();

const wrap = Component => props => (
  <React.Fragment>
    <CssBaseline />
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <Component {...props} />
    </JssProvider>
  </React.Fragment>
);

const fixtures = [];

const addToDefaultExport = (namedFixtures, displayName) => {
  Object.values(namedFixtures).forEach(fixture => {
    fixture.component.displayName = displayName;
    fixtures.push(fixture);
  });
};

const makeFixtures = (component, namedFixtures) => {
  Object.keys(namedFixtures).forEach(name => {
    namedFixtures[name] = { component, name, ...namedFixtures[name] };
  });
  return namedFixtures;
};

faker.seed(1);

const lists = [];
let nextCardId = 1;

for (let i = 0; i < 6; i++) {
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

const nop = () => {};

const mockReduxState = {
  cardBeingEdited: null,
  cardBeingQuickEdited: null
};

export const App = makeFixtures(wrap(require("./App").default), {
  default: {
    props: { lists },
    reduxState: mockReduxState
  }
});
addToDefaultExport(App, "App");

export const Board = makeFixtures(wrap(require("./Board").default), {
  default: {
    props: {
      lists,
      onEditList: nop
    }
  }
});

export const QuickEditCard = makeFixtures(
  wrap(require("./QuickEditCard").default),
  {
    default: {
      props: {
        card: lists[0].cards[0]
      }
    }
  }
);
addToDefaultExport(QuickEditCard, "QuickEditCard");

export const CardsList = {};

CardsList.CardsList = makeFixtures(wrap(require("./CardsList").default), {
  default: {
    props: {
      list: lists[0],
      onEditList: nop
    },
    reduxState: mockReduxState
  }
});
addToDefaultExport(CardsList.CardsList, "CardsList/CardsList");

CardsList.Cards = makeFixtures(wrap(require("./CardsList/Cards").default), {
  default: {
    props: {
      cards: lists[0].cards
    },
    reduxState: mockReduxState
  }
});
addToDefaultExport(CardsList.Cards, "CardsList/Cards");

CardsList.ActionsMenu = makeFixtures(
  wrap(require("./CardsList/ActionsMenu").default),
  {
    default: {
      props: {
        onMenuItemClick: nop
      }
    }
  }
);
addToDefaultExport(CardsList.ActionsMenu, "CardsList/ActionsMenu");

CardsList.Header = makeFixtures(wrap(require("./CardsList/Header").default), {
  default: {
    props: {
      text: lists[0].title,
      onEditList: nop
    }
  }
});
addToDefaultExport(CardsList.Header, "CardsList/Header");

CardsList.Card = makeFixtures(wrap(require("./CardsList/Card").default), {
  default: {
    props: {
      card: lists[0].cards[0]
    },
    reduxState: mockReduxState
  }
});
addToDefaultExport(CardsList.Card, "CardsList/Card");

export const EditCard = {};

EditCard.EditCard = makeFixtures(wrap(require("./EditCard/EditCard").default), {
  default: {
    props: {
      card: lists[0].cards[0]
    }
  }
});
addToDefaultExport(EditCard.EditCard, "EditCard/EditCard");

export default fixtures;
