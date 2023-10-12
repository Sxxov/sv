export const createTransitionStagger = (offset: number) => {
	let i = 0;
	// https://github.com/typescript-eslint/typescript-eslint/issues/7745

	let rafHandle: ReturnType<typeof requestAnimationFrame> | undefined;

	return {
		get delay() {
			rafHandle ??= requestAnimationFrame(() => {
				i = 0;
				rafHandle = undefined;
			});

			return offset * i++;
		},
	};
};
