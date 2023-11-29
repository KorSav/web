import * as module from './module.js'
//asdas
let LIST = []
//#region test filling list
    let el = new module.MasonryListElement();
    el.Position = 1;
    el.Width = 3;
    el.Height = 1;
    el.Content = "elem1";
    LIST.push(el);
    el = new module.MasonryListElement();
    el.Position = 2;
    el.Width = 1;
    el.Height = 2;
    el.Content = "elem2";
    LIST.push(el);
    el = new module.MasonryListElement();
    el.Position = 3;
    el.Width = 2;
    el.Height = 1;
    el.Content = "elem3";
    LIST.push(el);
    el = new module.MasonryListElement();
    el.Position = 4;
    el.Width = 1;
    el.Height = 1;
    el.Content = "elem4";
    LIST.push(el);
    el = new module.MasonryListElement();
    el.Position = 5;
    el.Width = 1;
    el.Height = 1;
    el.Content = "elem5";
    LIST.push(el);
    el = new module.MasonryListElement();
    el.Position = 6;
    el.Width = 3;
    el.Height = 1;
    el.Content = "elem6";
    LIST.push(el);
    //#endregion
let ms = new module.MasonryShower(LIST);
ms.showInitialList(LIST);
ms.pushDataToServer();

