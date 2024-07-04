export const getCurrentYear = () => {
  return new Date().getFullYear();
};

export const getPreviousYears = (count) => {
  const currentYear = getCurrentYear();
  const years = [];

  for (let i = 0; i < count; i++) {
    years.push(currentYear - i - 1);
  }

  return years;
};

// Usage
export const yearsArray = [
  ...getPreviousYears(2), // Get two previous years
  getCurrentYear(), // Get the current year
].sort((a, b) => a - b);
