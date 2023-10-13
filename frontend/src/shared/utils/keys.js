export const keyDownAction = (event, { key, condition, actions }) => {
  if (condition && event.key === key) {
    actions.forEach((action) => action());
  }
};
