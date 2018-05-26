/*
 * Generic utilities with no implicit assumptions about their environment
 */

export const testId = id => `[data-testid="${id}"]`;
export const role = role => `[role="${role}"]`;
export const labelledBy = id => `[aria-labelledby="${id}"]`;
export const describedBy = id => `[aria-describedby="${id}"]`;
