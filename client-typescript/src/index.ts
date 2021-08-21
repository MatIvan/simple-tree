import './style/ui.css';
import { UILabel } from './ui/ui-label';
import { UIVerticalPanel } from './ui/ui-vertical-panel';

const STYLE_CAPTION = "ui-caption";

let vp = new UIVerticalPanel();
vp.add(new UILabel("text 1"));
vp.add(new UILabel("text 2", STYLE_CAPTION));
vp.add(new UILabel("text 3"));

vp.go(document.getElementById("root"));
