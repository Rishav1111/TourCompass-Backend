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
      "X-RapidAPI-Key": "ac32ecde13mshf879c91aebb3615p16b249jsnbbd5daf1b7ca",
      "X-RapidAPI-Host": "place-autocomplete1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const predictions = response.data.predictions;
    const placeIds = predictions.map((prediction) => prediction.place_id);
    res.json({ placeIds, responseData: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { autocomplete };
