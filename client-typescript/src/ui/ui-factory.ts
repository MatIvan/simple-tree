const STYLE_VERTICAL_PANEL = "ui-vertical-panel";
const STYLE_LABEL = "ui-label";


class UIFactoryImpl {

    getDiv(style: string): HTMLElement {
        let element = document.createElement("div");
        element.className = style;
        return element;
    }

    getVerticalPanel(): HTMLElement {
        return this.getDiv(STYLE_VERTICAL_PANEL);
    }

    getLabel(text: string): HTMLElement {
        let element = this.getDiv(STYLE_LABEL);
        element.innerText = text;
        return element;
    }
}

export const UIFactory = new UIFactoryImpl();