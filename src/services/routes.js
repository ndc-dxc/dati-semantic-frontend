import { ORDER_PARAMS } from "../components/search/OrderFilter/constants";
import {
  DEFAULT_OFFSET,
  PAGE_SIZE
} from "../components/search/Pagination/Pagination";

export const ASSETS_BASE_URL_TOKEN = "semantic-assets";
export const ASSETS_URL_TOKEN = "details";
export const LEGALNOTICES = "note-legali";
export const ASSETS_FULL_URL = `/${ASSETS_BASE_URL_TOKEN}/${ASSETS_URL_TOKEN}`;
export const GITHUB_SCHEMA =
  "https://github.com/teamdigitale/dati-semantic-frontend";
export const SEARCH_BASE_URL = "search";
export const FAQ_URL = "faq";
export const PROJECT_URL = "iniziativa";
export const OLD_VALIDATORE = "validatore";
export const VALIDATORE = "validatore_metadati";
export const SCHEMA_EDITOR = "schema-editor";
export const DIGITALE_DOCS_URL =
  "https://teamdigitale.github.io/dati-semantic-guida-ndc-docs/";
export const API_DOCS_URL = "api-docs";
export const PRIVACY_POLICY = "privacy-policy";
export const CONTACT = "contatti";
export const ERROR_PAGE = "errore";
export const NEWERROR_PAGE = "error-page";
export const SearchParameterNames = {
  type: "type",
  theme: "theme",
  pattern: "pattern",
  rightsHolder: "rightsHolder",
  sortBy: "sortBy",
  direction: "direction"
};

class Routes {
  search(filters = {}) {
    const defaultFilters = {
      types: [],
      themes: [],
      pattern: "",
      rightsHolders: [],
      rightsHolder: "rightsHolder",
      sortBy: ORDER_PARAMS.TITLE,
      direction: ORDER_PARAMS.ASC,
      limit: PAGE_SIZE,
      offset: DEFAULT_OFFSET
    };
    const { types, themes, pattern, offset, rightsHolders, sortBy, direction } =
      {
        ...defaultFilters,
        ...filters
      };

    const params = [];
    if (types) {
      types
        .map((t) => [SearchParameterNames.type, t])
        .forEach((p) => params.push(p));
    }

    if (rightsHolders) {
      rightsHolders
        .map((t) => [SearchParameterNames.rightsHolder, t])
        .forEach((p) => params.push(p));
    }

    if (themes) {
      themes
        .map((t) => [SearchParameterNames.theme, t])
        .forEach((p) => params.push(p));
    }

    if (pattern) {
      params.push([SearchParameterNames.pattern, pattern]);
    }

    if (sortBy) {
      params.push([SearchParameterNames.sortBy, sortBy]);
    }
    if (direction) {
      params.push([SearchParameterNames.direction, direction]);
    }

    if (offset && offset > DEFAULT_OFFSET) {
      params.push(["offset", offset]);
    }

    if (params.length > 0) {
      let paramString = new URLSearchParams(params).toString();
      return `/${SEARCH_BASE_URL}?${paramString}`;
    } else {
      return "/" + SEARCH_BASE_URL;
    }
  }

  searchUrlToFilter(search) {
    let result = {};
    const params = new URLSearchParams(search);
    if (params.has("type")) {
      result = { ...result, ["types"]: params.getAll("type") };
    }
    if (params.has("theme")) {
      result = { ...result, ["themes"]: params.getAll("theme") };
    }
    if (params.has("pattern")) {
      result = { ...result, pattern: params.get("pattern") };
    }
    if (params.has("offset")) {
      result = { ...result, offset: params.get("offset") };
    }
    if (params.has("rightsHolder")) {
      result = { ...result, ["rightsHolders"]: params.getAll("rightsHolder") };
    }
    if (params.has("sortBy")) {
      result = { ...result, sortBy: params.get("sortBy") };
    }
    if (params.has("direction")) {
      result = { ...result, direction: params.get("direction") };
    }
    return result;
  }

  faq() {
    return "/" + FAQ_URL;
  }

  project() {
    return "/" + PROJECT_URL;
  }

  validatore() {
    return "/" + VALIDATORE;
  }

  explore() {
    return "/";
  }

  apiDocs(vocabIri = null) {
    if (!vocabIri) {
      return "/" + API_DOCS_URL;
    }
    const paramString = new URLSearchParams([
      ["vocabIri", vocabIri]
    ]).toString();
    return `/${API_DOCS_URL}?${paramString}`;
  }

  privacyPolicy() {
    return "/" + PRIVACY_POLICY;
  }

  contact() {
    return "/" + CONTACT;
  }

  legalNotice() {
    return "/" + LEGALNOTICES;
  }
}

export const routes = new Routes();
