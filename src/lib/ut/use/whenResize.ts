export const whenResize = (
	node: Element,
	callback: (rect: { width: number; height: number }) => void,
) => {
	const observer = new ResizeObserver((entries) => {
		for (const { contentBoxSize } of entries)
			if (contentBoxSize.length > 0)
				callback({
					width: contentBoxSize[0]!.inlineSize,
					height: contentBoxSize[0]!.blockSize,
				});
	});

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		},
	};
};
