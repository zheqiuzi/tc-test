import {ENV} from "../config.js"
const domain={
  DEV:"http://api.tuanche.com/",
  PRE:"",
  PROD:""
};
const baseUrl=domain[ENV];
const api={
  MM:"adConfig/tcj/bj/c60/tuan"
}

const url={
  baseUrl,
  api
}

export {url};
