import { Store, type Supply } from '@sxxov/ut/store';
import { onMount, getAllContexts } from 'svelte';

class MountedStore extends Store<boolean> {
	constructor() {
		super(undefined as never);
	}

	public override destroy() {}

	public override trigger() {}

	public override get() {
		try {
			// the only svelte function that internally accesses
			// `get_current_component()` without side effects.
			// will throw if not called during component init,
			// & thus we're mounted if it does throw.
			getAllContexts();

			return false;
		} catch {
			return true;
		}
	}

	public override subscribe(
		onChanged: (v: boolean) => void,
		onInvalidate?: (() => void) | undefined,
	) {
		let subscribed = true;

		try {
			onMount(() => {
				if (subscribed) {
					onInvalidate?.();
					onChanged(true);
				}
			});

			onChanged(false);
		} catch {
			onChanged(true);
		}

		return () => {
			subscribed = false;
		};
	}

	public override subscribeLazy(
		onChanged: (v: boolean) => void,
		onInvalidate?: (() => void) | undefined,
	) {
		let subscribed = true;

		try {
			onMount(() => {
				if (subscribed) {
					onInvalidate?.();
					onChanged(true);
				}
			});
		} catch {}

		return () => {
			subscribed = false;
		};
	}
}

/**
 * A lazily listening supply that returns `true` if the current component is
 * mounted.
 */
export const mounted: Supply<boolean> = new MountedStore().supply;
