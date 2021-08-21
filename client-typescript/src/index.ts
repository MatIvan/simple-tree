import './style/ui.css';

import { UIFactory } from './ui/ui-factory'

let vp = UIFactory.getVerticalPanel();
vp.appendChild(UIFactory.getLabel("Label 1"));
vp.appendChild(UIFactory.getLabel("Label 2"));

document.getElementById("root").appendChild(vp);
