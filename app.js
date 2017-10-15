// 该类是对于命名空间数据的管理（借助LocalStorage），其实现方式主要有两种：
// 第一种：将一个命名空间数据放在一个Storage字段中，该字段含有数据和相关长度。
// 第二种：在Storage字段命名时区分，将命名空间包含在该字段名中。
// 下列为第一种实现方式。

class LsManager {

  constructor ( namespace, maxLength ) {

    this.namespace = namespace;
    this.maxLength = maxLength;

    let ls = window.localStorage;
    let ns = ls.ns;
    if ( ns ) {
      ls.setItem(ns, {});
    }
    // 若该命名空间已存在，则会被覆盖
    ns[namespace] = {
      list: [],
      maxLength
    };

  }

  setItem ( obj ) {
    let ns = window.localStorage.ns[this.namespace];
    let { list, maxLength } = ns;
    let len = list.length;
    if ( len === maxLength ) {

        let sortList = list.sort(( a, b ) => {
            return a - b;
        });
        sortList.shift();
        list = sortList;
    }
    list.push(Object.assign({
        _timestamp: Date.now()
    }, obj));
  }

  getItems () { 
  	return window.localStorage.ns[this.namespace];
  }

}

let lss = new LsManager('lss', 2);
console.log(lss.getItems());
lss.setItem({a: 1});
console.log(lss.getItems());