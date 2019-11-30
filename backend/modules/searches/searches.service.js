const SearchModel = require("../../database/models/SearchModel");
const ItunesService = require("../utils/itunes.service");

const getSearchResult = async (searchContent, limit) => {
  /*
    1. update the counter of exsits search OR insert to search collection new search with counter= 0
    2. get from itunes API the results
    3. return the results
    */

  try {
    const search = await SearchModel.findOne({ content: searchContent });
    //new searchContent -> create new Search
    if (!search) {
      await createSearch(searchContent, 1);
    }
    //increase the search counter update 
    else {
      search.counter++;
      const updated = await search.save();
      if(!updated){
        throw "Problem in updating search counter!"
      }
    }
    //return the search results
    const response = await ItunesService.getLimitedItunesResults(searchContent,limit);
      return response.data.results;
  }
  catch(err){
    console.log("error in Itunes API:", err);
  }
};

const createSearch = async (searchContent, counter)=>{
  const newSearch = new SearchModel({
    content: searchContent,
    counter: counter
  });
  await newSearch.save();
}

const getPopularSearches = async ()=>{
  const counter = {counter: -1}
  const results = await SearchModel.find().sort(counter).limit(10);
  return results;
}

module.exports = {
  getPopularSearches,
  getSearchResult,
  createSearch
};
