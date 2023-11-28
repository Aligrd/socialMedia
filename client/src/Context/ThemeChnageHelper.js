export const themeWithSecondaryText = (themeMode, number) => {
  return themeMode
    ? `bg-[var(--light-${number})] text-[var(--secondary-text-dark)]`
    : `bg-[var(--dark-${number})] text-[var(--secondary-text)]`;
};
export const themeWithPrimaryText = (themeMode, number) => {
  return themeMode
    ? `bg-[var(--light-${number})] text-[var(--primary-text-dark)]`
    : `bg-[var(--dark-${number})] text-[var(--primary-text)]`;
};
