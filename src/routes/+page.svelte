<script lang="ts">
	import Input from '$lib/input/Input.svelte';
	import { ic_check } from 'maic/two_tone';
	import Button from '../lib/button/Button.svelte';
	import Toggle from '../lib/input/Toggle.svelte';
	import Svg from '../lib/svg/Svg.svelte';
	import { ButtonVariants } from '../lib/button';
	import { Dropdown } from '../lib/input';
</script>

<div class="component">
	<Input
		name="a"
		label="a"
	/>
	<Button {...ButtonVariants.FabRegularPrimary}><Svg svg={ic_check} /></Button
	>
	<Dropdown
		name="thing"
		label="thing"
		items={[
			{
				icon: ic_check,
				id: 'thing',
				terms: ['thing', 'thing', 'thing'],
				title: 'thing',
			},
			{
				icon: ic_check,
				id: 'thing2',
				terms: ['thang', 'thing', 'thing', '2'],
				title: 'thang',
			},
		]}
	/>
	<Toggle
		name="bbb"
		label="aaaaaaaaaaaaaa"
	/>
</div>

<style lang="postcss">
</style>
