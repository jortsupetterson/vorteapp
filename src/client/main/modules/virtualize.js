//src/client/main/modules/virtualize.js
/**
|====================|
| @module virtualize |
|
| Creates a reactive virtual DOM proxy for a given root element.
| All DOM operations on the proxy are forwarded to the real DOM, 
| for eg. rootVariable.wrapperElement.childElement.text = "desired text"
| All new elements and attributes get updated to the proxy in realtime
|
| @param {Element} [root = document.body] - The root element to virtualize. (could be any node).
| @returns {Proxy} - A proxy representing the reactive virtual DOM.
|
*/

// Precompute the set of DOM-mutation methods once
const DOM_MUTATORS = new Set([
	'appendChild',
	'insertBefore',
	'replaceChild',
	'removeChild',
	'remove',
	'prepend',
	'append',
	'after',
	'before',
	'replaceWith',
]);

// Cache proxies per node to avoid re-wrapping
const proxyCache = new WeakMap();

export default function virtualize(root = document.body) {
	/**
  |====================|
  | @function traverse |
  |
  | Recursively traverses a DOM node and converts it into a structured representation.
  | Used for building virtual DOM trees or serializing DOM structure.
  |
  | @param {Node} element - The DOM element to traverse
  | @returns {Object|null} A structured representation of the node, or null if irrelevant
  |
  */
	function traverse(element) {
		// Handle plain text nodes
		if (element.nodeType === Node.TEXT_NODE) {
			return {
				type: 'text',
				tag: '#text',
				props: { text: element.textContent },
				children: [],
				el: element,
			};
		}

		// Skip non-element nodes
		if (element.nodeType !== Node.ELEMENT_NODE) {
			return null;
		}

		// Extract attributes into a props object
		const props = {};
		element.attributes.forEach(({ name, value }) => {
			props[name] = value;
		});

		// Single text child optimization
		if (element.childNodes.length === 1 && element.firstChild.nodeType === Node.TEXT_NODE) {
			props.text = element.textContent;
		}

		// Recursively traverse children
		const children = [];
		element.childNodes.forEach((child) => {
			const node = traverse(child);
			if (node !== null) children.push(node);
		});

		return {
			type: 'tag',
			tag: element.tagName.toLowerCase(),
			props,
			children,
			el: element,
		};
	}

	/**
  |===================|
  | @function proxify |
  |
  | Wraps a serialized node object in a Proxy to intercept get/set operations.
  | 
  | @param {Object} node - The serialized node object from traverse().
  | @returns {Proxy} - A Proxy forwarding operations to the real DOM node.
  |
  */
	function proxify(node) {
		// Return cached proxy if exists
		if (proxyCache.has(node)) return proxyCache.get(node);

		// Ensure children are proxified
		node.children = node.children.map(proxify);

		const handler = {
			get(target, prop) {
				// innerHTML read
				if (prop === 'innerHTML') {
					return target.el.innerHTML;
				}
				// textContent/text read
				if (prop === 'textContent' || prop === 'text') {
					return target.el.textContent;
				}
				// Dynamic attribute read
				if (target.el.nodeType === Node.ELEMENT_NODE && target.el.hasAttribute(prop)) {
					const attrVal = target.el.getAttribute(prop);
					target.props[prop] = attrVal;
					return attrVal;
				}
				// Cached props
				if (prop in target.props) {
					return target.props[prop];
				}
				// Native DOM property or method
				if (prop in target.el) {
					const member = target.el[prop];
					if (typeof member === 'function') {
						return (...args) => {
							const realArgs = args.map((a) => (a && a.el) || a);
							const result = member.apply(target.el, realArgs);
							// On structural mutation, rebuild children proxies
							if (prop === 'innerHTML' || DOM_MUTATORS.has(prop)) {
								const rebuilt = [];
								target.el.childNodes.forEach((c) => {
									const n = traverse(c);
									if (n) rebuilt.push(n);
								});
								target.children = rebuilt.map(proxify);
							}
							return result;
						};
					}
					return member;
				}
				// Child lookup by tag or index
				if (Array.isArray(target.children)) {
					// exact tag match
					let matches = target.children.filter((c) => c.tag === prop);
					// camel -> kebab
					if (matches.length === 0 && typeof prop === 'string') {
						const kebab = prop.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
						matches = target.children.filter((c) => c.tag === kebab);
					}
					if (matches.length === 1) return matches[0];
					if (matches.length > 1) return matches;
					// numeric index
					if (!isNaN(prop) && target.children[prop]) {
						return target.children[prop];
					}
					// direct children array
					if (prop === 'children') {
						return target.children;
					}
				}
				// fallback
				return Reflect.get(target, prop);
			},

			set(target, prop, value) {
				// innerHTML write
				if (prop === 'innerHTML') {
					target.el.innerHTML = value;
					// refresh props
					target.props = {};
					target.el.attributes.forEach(({ name, value }) => {
						target.props[name] = value;
					});
					// refresh children
					const newChildren = [];
					target.el.childNodes.forEach((c) => {
						const n = traverse(c);
						if (n) newChildren.push(n);
					});
					target.children = newChildren.map(proxify);
					return true;
				}
				// textContent/text write
				if (prop === 'textContent' || prop === 'text') {
					target.el.textContent = value;
					target.props.text = value;
					return true;
				}
				// dynamic attribute set
				if (target.el.nodeType === Node.ELEMENT_NODE && typeof prop === 'string') {
					target.el.setAttribute(prop, value);
					target.props[prop] = String(value);
					return true;
				}
				// fallback DOM property
				if (prop in target.el) {
					target.el[prop] = value;
					return true;
				}
				return Reflect.set(target, prop, value);
			},
		};

		const proxy = new Proxy(node, handler);
		proxyCache.set(node, proxy);
		return proxy;
	}

	const vdom = traverse(root);
	return proxify(vdom);
}
