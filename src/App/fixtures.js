import React from "react";
import faker from "faker";
import { create } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

const jss = create({ plugins: [...jssPreset().plugins] });

const generateClassName = createGenerateClassName();

const wrap = Component => props => (
  <React.StrictMode>
    <React.Fragment>
      <CssBaseline />
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <Component {...props} />
      </JssProvider>
    </React.Fragment>
  </React.StrictMode>
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

const lists = {};
let nextCardId = 0;

for (let i = 0; i < 6; i++) {
  const key = faker.lorem.sentence();
  lists[key] = [];
  for (let j = 0; j < faker.random.number({ min: 2, max: 50 }); j++) {
    lists[key].push({ id: nextCardId++, title: faker.lorem.sentence() });
  }
}

const nop = () => {};

const listsArray = Object.entries(lists);

export const App = makeFixtures(wrap(require("./App").default), {
  default: {
    props: { lists }
  }
});
addToDefaultExport(App, "App");

export const Board = makeFixtures(wrap(require("./Board").default), {
  default: {
    props: {
      lists,
      onEditList: nop,
      onQuickEditCard: nop,
      onEditCard: nop
    }
  }
});

export const QuickEditCard = makeFixtures(
  wrap(require("./QuickEditCard").default),
  {
    default: {
      props: {
        title: listsArray[0][1][0]
      }
    }
  }
);
addToDefaultExport(QuickEditCard, "QuickEditCard");

export const CardsList = {};

CardsList.CardsList = makeFixtures(wrap(require("./CardsList").default), {
  default: {
    props: {
      title: listsArray[0][0],
      cards: listsArray[0][1],
      onEditList: nop,
      onQuickEditCard: nop,
      onEditCard: nop
    }
  }
});
addToDefaultExport(CardsList.CardsList, "CardsList/CardsList");

CardsList.Cards = makeFixtures(wrap(require("./CardsList/Cards").default), {
  default: {
    props: {
      cards: listsArray[0][1],
      onEditCard: nop,
      onQuickEditCard: nop
    }
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
      text: listsArray[0][0],
      onEditList: nop
    }
  }
});
addToDefaultExport(CardsList.Header, "CardsList/Header");

CardsList.Card = makeFixtures(wrap(require("./CardsList/Card").default), {
  default: {
    props: {
      card: listsArray[0][1][0],
      onEditCard: nop,
      onQuickEditCard: nop
    }
  }
});
addToDefaultExport(CardsList.Card, "CardsList/Card");

export const EditCard = {};

EditCard.EditCard = makeFixtures(wrap(require("./EditCard/EditCard").default), {
  default: {
    props: {
      card: listsArray[0][1][0]
    }
  }
});
addToDefaultExport(EditCard.EditCard, "EditCard/EditCard");

export default fixtures;
