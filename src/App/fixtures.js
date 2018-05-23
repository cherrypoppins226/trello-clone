import React from "react";
import faker from "faker";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const normalizeCss = Component => {
  const ModifiedCSSBaseline = withStyles({
    "@global": { body: { margin: 10, background: "transparent" } }
  })(CssBaseline);
  const wrapped = props => (
    <React.Fragment>
      <ModifiedCSSBaseline />
      <Component {...props} />
    </React.Fragment>
  );
  wrapped.displayName = Component.displayName;
  return wrapped;
};

const fixtures = [];

// Fixtures are used for both testing and developing in the Cosmos dev tool.
// This prepares them for use in the Cosmos UI.
const useInCosmosUI = ({ component, name, props }) => {
  const updated = {
    name,
    props,
    component:
      process.env.NODE_ENV === "test" ? component : normalizeCss(component)
  };
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

export const app = {
  component: require(".").default,
  name: "Default",
  props: { lists }
};

export const board = useInCosmosUI({
  component: require("./Board").default,
  name: "Default",
  props: { lists }
});

const nop = () => {};

const listsArray = Object.entries(lists);

export const cardsList = useInCosmosUI({
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

export const cardsListCards = useInCosmosUI({
  component: require("./CardsList/Cards").default,
  name: "Default",
  props: {
    cards: listsArray[0][1].map((title, idx) => ({
      id: idx,
      description: title
    })),
    onEditCard: nop,
    onQuickEditCard: nop
  }
});

export const cardsListActionsMenu = useInCosmosUI({
  component: require("./CardsList/ActionsMenu").default,
  name: "Default",
  props: {
    onMenuItemClick: nop
  }
});

export const cardsListHeader = useInCosmosUI({
  component: require("./CardsList/Header").default,
  name: "Default",
  props: {
    text: listsArray[0][0],
    onEditList: nop
  }
});

export const cardsListCard = useInCosmosUI({
  component: require("./CardsList/Card").default,
  name: "Default",
  props: {
    title: listsArray[0][1][0],
    onEditCard: nop,
    onQuickEditCard: nop
  }
});

export const quickEditCard = useInCosmosUI({
  component: require("./QuickEditCard").default,
  name: "Default",
  props: {
    title: listsArray[0][1][0]
  }
});

export const editCard = useInCosmosUI({
  component: require("./EditCard").default,
  name: "Default",
  props: {
    title: listsArray[0][1][0]
  }
});

export const textArea = useInCosmosUI({
  component: require("./TextArea").default,
  name: "Default",
  props: {
    value: listsArray[0][1][0]
  }
});

export default fixtures;
