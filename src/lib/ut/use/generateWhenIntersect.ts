export const generateWhenIntersect =
	(options: IntersectionObserverInit) =>
	(node: Element, callback: (entry: IntersectionObserverEntry) => void) => {
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
