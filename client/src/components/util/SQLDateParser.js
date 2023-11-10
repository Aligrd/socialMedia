const SQLDateParser = (sqlDateString) => {
  return {
    date: String(sqlDateString).slice(0, 10),
    time: String(sqlDateString).slice(11, 19),
  };
};

export default SQLDateParser;
