export const generateWhenOutersect =
	(options: IntersectionObserverInit) =>
	(node: Element, callback: (entry: IntersectionObserverEntry) => void) => {
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries)
				if (!entry.isIntersecting) callback(entry);
		}, options);

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			},
		};
	};
