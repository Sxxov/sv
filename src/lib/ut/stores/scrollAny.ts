import { Store } from '@sxxov/ut/store';

/**
 * A lazily listening store for any scroll events that can be captured from the
 * window
 */
export const scrollAny = new (class extends Store<{
	x: number;
	y: number;
}> {
	public override subscribe(
		run: (value: { x: number; y: number }) => void,
		invalidate?: () => void,
	) {
		const unsubscribe = super.subscribe(run, invalidate);
		const onScroll = (e: Event) => {
			if (e.target instanceof HTMLElement)
				this.set({
					x: e.target.scrollLeft,
					y: e.target.scrollTop,
				});
		};

		if (typeof window !== 'undefined')
			window.addEventListener('scroll', onScroll, {
				passive: true,
				capture: true,
			});

		return () => {
			unsubscribe();
			if (typeof window !== 'undefined')
				window.removeEventListener('scroll', onScroll);
		};
	}

	public override subscribeLazy(
		run: (value: { x: number; y: number }) => void,
		invalidate?: () => void,
	) {
		const unsubscribe = super.subscribeLazy(run, invalidate);
		const onScroll = (e: Event) => {
			if (e.target instanceof HTMLElement)
				this.set({
					x: e.target.scrollLeft,
					y: e.target.scrollTop,
				});
		};

		if (typeof window !== 'undefined')
			window.addEventListener('scroll', onScroll, {
				passive: true,
				capture: true,
			});

		return () => {
			unsubscribe();
			if (typeof window !== 'undefined')
				window.removeEventListener('scroll', onScroll);
		};
	}
})({
	x: 0,
	y: 0,
});
