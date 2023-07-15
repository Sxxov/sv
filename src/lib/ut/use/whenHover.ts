export const whenHover = (
	element: HTMLElement,
	callback: (hovered: boolean) => void,
) => {
	const onHover = () => {
		callback(true);
	};

	const onLeave = () => {
		callback(false);
	};

	element.addEventListener('mouseover', onHover);
	element.addEventListener('mouseleave', onLeave);
	element.addEventListener('touchstart', onHover);
	element.addEventListener('touchend', onLeave);

	return {
		destroy() {
			element.removeEventListener('mouseover', onHover);
			element.removeEventListener('mouseleave', onLeave);
			element.removeEventListener('touchstart', onHover);
			element.removeEventListener('touchend', onLeave);
		},
	};
};
