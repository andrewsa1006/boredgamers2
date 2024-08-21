import axios from "axios";
import XMLParser from "react-xml-parser";

export const unescapeHTML = (escapedHTML) => {
  return escapedHTML
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&rsquo;/g, "'")
    .replace(/&mdash;/, "--")
    .replace(/&ndash;/, "-");
};

export const clearHTMLTags = (strToSanitize) => {
  return strToSanitize.replace(/(<([^>]+)>)/gi, " ");
};

export const getGameIds = async (url) => {
  let res = await axios.get(url);
  let bulkData = new XMLParser().parseFromString(res.data);
  let idString = "";
  for (let i = 0; i < bulkData.children.length; i++) {
    idString.length < 1
      ? (idString = +bulkData.children[i].attributes.objectid)
      : (idString = idString + "," + bulkData.children[i].attributes.objectid);
  }
  return idString;
};

export const getSingleGame = async (url) => {
  let res = await axios.get(url);
  let game = new XMLParser().parseFromString(res.data);
  let gameObject = {
    mechanics: [],
    categories: [],
  };

  gameObject.objectId = games.children[i].attributes.objectid;
  return gameObject;
};

export const getGameList = async (url) => {
  let res = await axios.get(url);
  let games = new XMLParser().parseFromString(res.data);
  let tempGameArray = [];
  for (let i = 0; i < games.children.length; i++) {
    let gameObject = {
      mechanics: [],
      categories: [],
    };

    gameObject.objectId = games.children[i].attributes.objectid;

    let names = games.children[i].getElementsByTagName("name");
    names.forEach((name) => {
      name.attributes.primary
        ? (gameObject.name = clearHTMLTags(unescapeHTML(name?.value)))
        : null;
    });

    gameObject.minPlayers =
      games.children[i].getElementsByTagName("minplayers")[0]?.value;

    gameObject.maxPlayers =
      games.children[i].getElementsByTagName("maxPlayers")[0]?.value;

    gameObject.imageURI =
      games.children[i].getElementsByTagName("thumbnail")[0]?.value ||
      games.children[i].getElementsByTagName("image")[0]?.value;

    gameObject.minPlayTime =
      games.children[i].getElementsByTagName("minplaytime")[0]?.value;

    gameObject.maxPlayTime =
      games.children[i].getElementsByTagName("maxplaytime")[0]?.value;

    gameObject.description = clearHTMLTags(
      unescapeHTML(
        games.children[i].getElementsByTagName("description")[0]?.value
      )
    );

    gameObject.age = games.children[i].getElementsByTagName("age")[0]?.value;

    let mechanics = games.children[i].getElementsByTagName("boardgamemechanic");
    mechanics.forEach((mechanic) => {
      gameObject.mechanics.push(mechanic?.value);
    });

    let categories =
      games.children[i].getElementsByTagName("boardgamecategory");
    categories.forEach((category) => {
      gameObject.categories.push(category?.value);
    });

    tempGameArray.push(gameObject);
  }

  return tempGameArray;
};
