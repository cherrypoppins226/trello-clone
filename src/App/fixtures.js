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

const fixtures = [];

// Fixtures are used for both testing and developing in the Cosmos dev tool.
// This prepares them for use in the Cosmos UI.
const useInCosmosUI = ({ name, props, component, displayName }) => {
  const wrapped =
    process.env.NODE_ENV === "test" ? component : normalize(component);
  wrapped.displayName = displayName;
  const updated = { name, props, component: wrapped };
  fixtures.push(updated);
  return updated;
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

export const App = {
  component: require(".").default,
  name: "Default",
  props: { lists }
};

export const Board = useInCosmosUI({
  component: require("./Board").default,
  displayName: "Board",
  name: "Default",
  props: { lists }
});

export const QuickEditCard = useInCosmosUI({
  component: require("./QuickEditCard").default,
  displayName: "QuickEditCard",
  name: "Default",
  props: {
    title: listsArray[0][1][0]
  }
});

export const CardsList = {
  CardsList: useInCosmosUI({
    component: require("./CardsList").default,
    displayName: "CardsList/CardsList",
    name: "Default",
    props: {
      title: listsArray[0][0],
      cards: listsArray[0][1],
      onEditList: nop,
      onQuickEditCard: nop,
      onEditCard: nop
    }
  }),

  Cards: useInCosmosUI({
    component: require("./CardsList/Cards").default,
    displayName: "CardsList/Cards",
    name: "Default",
    props: {
      cards: listsArray[0][1].map((title, idx) => ({
        id: idx,
        description: title
      })),
      onEditCard: nop,
      onQuickEditCard: nop
    }
  }),

  ActionsMenu: useInCosmosUI({
    component: require("./CardsList/ActionsMenu").default,
    displayName: "CardsList/ActionsMenu",
    name: "Default",
    props: {
      onMenuItemClick: nop
    }
  }),

  Header: useInCosmosUI({
    component: require("./CardsList/Header").default,
    displayName: "CardsList/Header",
    name: "Default",
    props: {
      text: listsArray[0][0],
      onEditList: nop
    }
  }),

  Card: useInCosmosUI({
    component: require("./CardsList/Card").default,
    displayName: "CardsList/Card",
    name: "Default",
    props: {
      title: listsArray[0][1][0],
      onEditCard: nop,
      onQuickEditCard: nop
    }
  })
};

export const EditCard = {
  EditCard: useInCosmosUI({
    component: require("./EditCard").default,
    displayName: "EditCard/EditCard",
    name: "Default",
    props: {
      title: listsArray[0][1][0]
    }
  })
};

export default fixtures;
