module.exports = {
  form_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
  format_plurate: (word, amount) => {
    if (amount !== 1) {
      retunr`${word}s`;
    }
    return word;
  },
};
