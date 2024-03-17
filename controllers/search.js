const axios = require("axios");
const autocomplete = async (req, res) => {
  const { input, radius } = req.query;

  const options = {
    method: "GET",
    url: "https://place-autocomplete1.p.rapidapi.com/autocomplete/json",
    params: {
      input,
      radius,
    },
    headers: {
      "X-RapidAPI-Key": "9ca9f46dc5msh278ffc74a5d57fbp1b02eajsn8c41589d1474",
      "X-RapidAPI-Host": "place-autocomplete1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { autocomplete };
