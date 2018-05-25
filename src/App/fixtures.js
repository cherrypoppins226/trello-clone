import React from "react";
import faker from "faker";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const CSSNormalize = withStyles({
  "@global": { body: { margin: 10, background: "transparent" } }
})(CssBaseline);

const normalize = Component => props => (
  <React.Fragment>
    <CSSNormalize />
    <Component {...props} />
  </React.Fragment>
);

let fixtures = [];

const addToDefaultExport = namedFixtures => {
  fixtures = fixtures.concat(Object.values(namedFixtures));
  return namedFixtures;
};

// Stylize component for use in the Cosmos UI.
const stylize = (component, displayName) => {
  const wrapped =
    process.env.NODE_ENV === "test" ? component : normalize(component);
  wrapped.displayName = displayName;
  return wrapped;
};

const makeFixtures = (component, namedFixtures) => {
  Object.keys(namedFixtures).forEach(name => {
    namedFixtures[name] = { component, name, ...namedFixtures[name] };
  });
  return namedFixtures;
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

const nop = () => {};

const listsArray = Object.entries(lists);

export const App = makeFixtures(require("./App").default, {
  default: {
    props: { lists }
  }
});

export const Board = addToDefaultExport(
  makeFixtures(stylize(require("./Board").default, "Board"), {
    default: {
      props: { lists }
    }
  })
);

export const QuickEditCard = addToDefaultExport(
  makeFixtures(stylize(require("./QuickEditCard").default, "QuickEditCard"), {
    default: {
      props: {
        title: listsArray[0][1][0]
      }
    }
  })
);

export const CardsList = {};

CardsList.CardsList = addToDefaultExport(
  makeFixtures(stylize(require("./CardsList").default, "CardsList/CardsList"), {
    default: {
      props: {
        title: listsArray[0][0],
        cards: listsArray[0][1],
        onEditList: nop,
        onQuickEditCard: nop,
        onEditCard: nop
      }
    }
  })
);

CardsList.Cards = addToDefaultExport(
  makeFixtures(
    stylize(require("./CardsList/Cards").default, "CardsList/Cards"),
    {
      default: {
        props: {
          cards: listsArray[0][1].map((title, idx) => ({
            id: idx,
            description: title
          })),
          onEditCard: nop,
          onQuickEditCard: nop
        }
      }
    }
  )
);

CardsList.ActionsMenu = addToDefaultExport(
  makeFixtures(
    stylize(
      require("./CardsList/ActionsMenu").default,
      "CardsList/ActionsMenu"
    ),
    {
      default: {
        props: {
          onMenuItemClick: nop
        }
      }
    }
  )
);

CardsList.Header = addToDefaultExport(
  makeFixtures(
    stylize(require("./CardsList/Header").default, "CardsList/Header"),
    {
      default: {
        props: {
          text: listsArray[0][0],
          onEditList: nop
        }
      }
    }
  )
);

CardsList.Card = addToDefaultExport(
  makeFixtures(stylize(require("./CardsList/Card").default, "CardsList/Card"), {
    default: {
      props: {
        title: listsArray[0][1][0],
        onEditCard: nop,
        onQuickEditCard: nop
      }
    }
  })
);

export const EditCard = {};

EditCard.EditCard = addToDefaultExport(
  makeFixtures(
    stylize(require("./EditCard/EditCard").default, "EditCard/EditCard"),
    {
      default: {
        props: {
          title: listsArray[0][1][0]
        }
      }
    }
  )
);

export default fixtures;
