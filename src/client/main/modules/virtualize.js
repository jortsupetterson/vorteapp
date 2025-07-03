/**
| Creates a reactive virtual DOM proxy for a given root element.
| All DOM operations on the proxy are forwarded to the real DOM, 
| for eg. rootVariable.wrapperElement.childElement.text = "desired text"
| All new elements and attributes get updated to the prox
|
| @module virtualize
| @param {Element} [root = document.body] - The root element to virtualize.
| @returns {Proxy} - A proxy representing the reactive virtual DOM.
*/
export default function virtualize(root = document.body) {

    function walk(el) {

        //Handles text elements
        if (el.nodeType == Node.TEXT_NODE) {
            return {
                type: "text",
                tag: "#text",
                props: { text: el.textContent },
                children: [],
                el,
            };
        }

        // Handles irrelevant nodeTypes
        if (el.nodeType !== Node.ELEMENT_NODE) {
            return null;
        }

        // Gathers attributes in to a object
        const props = Array.from(el.attributes).reduce((accumulator,attribute) => {
            accumulator[attribute.name] = attribute.value;
            return accumulator;
        },{});

        // single text child -> text prop
        if (
            el.childNodes.length === 1 &&
            el.firstChild.nodeType === Node.TEXT_NODE
        ) {
            props.text = el.textContent;
        }

    }
}
