export const whenIntersect = (
	node: Element,
	callback: (entry: IntersectionObserverEntry) => void,
	options: IntersectionObserverInit = {},
) => {
	const observer = new IntersectionObserver((entries) => {
		for (const entry of entries) callback(entry);
	}, options);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		},
	};
};
