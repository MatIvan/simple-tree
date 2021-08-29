import './style/ui.css';
import { MainWidget } from './widget/MainWidget';

let mainWidget = new MainWidget();
document.getElementById("root").appendChild(mainWidget.asNode());
mainWidget.update();