import { VerticalPanel } from './ui/vertical-panel'
import { Label } from './ui/label'

let vp = new VerticalPanel();

document.getElementById("root").appendChild(vp.asWidget());

vp.add(new Label("line 1"));
vp.add(new Label("line 2"));