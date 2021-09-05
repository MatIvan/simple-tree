import { MainWidget } from './widget/MainWidget';

let mainWidget = new MainWidget();
document.getElementById("root").appendChild(mainWidget.getElement());
mainWidget.update();