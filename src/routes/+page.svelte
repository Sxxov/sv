<script lang="ts">
	import Input from '$lib/input/Input.svelte';
	import { ic_check } from 'maic/two_tone';
	import Button from '../lib/button/Button.svelte';
	import Toggle from '../lib/input/Toggle.svelte';
	import Svg from '../lib/svg/Svg.svelte';
	import { ButtonVariants } from '../lib/button';
</script>

<div class="component">
	<Input
		name="a"
		label="a"
	/>
	<Button {...ButtonVariants.FabRegularPrimary}><Svg svg={ic_check} /></Button
	>
	<Toggle
		name="bbb"
		label="aaaaaaaaaaaaaa"
	/>
</div>

<style lang="postcss">
</style>
