export const format = {
  date: () => new Date().toLocaleDateString(),
  time: () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};
