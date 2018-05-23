/*
 * Generic utilities with no implicit assumptions about their environment
 */

export const getByRole = (node, role) => {
  return node.querySelector(`[role="${role}"]`);
};

export const getByAriaLabelled = (node, id) => {
  return node.querySelector(`[aria-labelledby="${id}"]`);
};

export const getByAriaDescribed = (node, id) => {
  return node.querySelector(`[aria-describedby="${id}"]`);
};
