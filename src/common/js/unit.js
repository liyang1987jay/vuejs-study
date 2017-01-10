module.exports = {
  /**
   * [urlParse 解析url参数]
   * @return {[obj]} [{id:123}]
   */
  urlParse: () => {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    if (arr) {
      arr.forEach((item) => {
        let tempArr = item.substring(1).split('=');
        let key = decodeURIComponent(tempArr[0]);
        let val = decodeURIComponent(tempArr[1]);
        obj[key] = val;
      });
    }
    return obj;
  },
  saveToLoacal: (id, key, value) => {
    let seller = window.localStorage.__seller__;
    if (!seller) {
      seller = {};
      seller[id] = {};
    } else {
      seller = JSON.parse(seller);
      if (!seller[id]) {
        seller[id] = {};
      }
    }
    seller[id][key] = value;
    window.localStorage.__seller__ = JSON.stringify(seller);
  },
  loadFromLocal: (id, key, def) => {
    let seller = window.localStorage.__seller__;
    if (!seller) {
      return def;
    }
    seller = JSON.parse(seller)[id];
    if (!seller) {
      return def;
    }
    return (seller[key] || def);
  }
};
