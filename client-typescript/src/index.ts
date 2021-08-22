import './style/ui.css';
import { UILabel } from './ui/ui-label';
import { UIVerticalPanel } from './ui/ui-vertical-panel';
import { MainWidget } from './widget/main-widget';

let mainWidget = new MainWidget();
mainWidget.go(document.getElementById("root"));
