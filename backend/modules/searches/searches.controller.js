
const { httpResponse } = require("../../utils");
const searchService = require("./searches.service");


popularSearches = async (req,res) =>{
  const results = await searchService.getPopularSearches();
  if (!results) {
    return res.json(httpResponse(500, "Server Error", "popularSearches"));
  }
  return res.json(httpResponse(200, results));
}


const searchContent = async (req, res) => {
  const { content, limit } = req.params;

  if (!content) {
    return res.json(
      httpResponse(400, "content is required as param", "getSearchResult")
    );
  }
  const results = await searchService.getSearchResult(content, limit);
  if (!results) {
    return res.json(httpResponse(500, "Server Error", "getSearchResult"));
  }
  return res.json(httpResponse(200, results));
};

module.exports = {
  popularSearches,
  searchContent
};
