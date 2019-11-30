const searches = require("express").Router();
const searchesController = require("./searches.controller");

searches.get("/popular", searchesController.popularSearches);
searches.get("/:content&limit=:limit", searchesController.searchContent);

module.exports = searches;
