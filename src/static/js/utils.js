import {cookie} from "./lib/cookie.js";
import {dialog} from "./lib/dialog.js"
import {request} from "./lib/request.js"
import {log} from "./lib/log.js"
// import {url} from "./lib/url.js"
import config from "./lib/config.js"
import {url} from "./lib/url.js"
// const utils= {cookie,dialog,request,url}
import {simpleDate} from "./lib/simpleDate.js"


export default {
  install: function (vm) {
    vm.prototype.cookie = cookie;
    vm.prototype.dialog=dialog;
    vm.prototype.request=request;
    vm.prototype.url=url;
    vm.prototype.config=config;
    vm.prototype.simpleDate=simpleDate;
    vm.prototype.log=log;
  }
};


