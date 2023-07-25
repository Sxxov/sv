<script lang="ts">
	import Input from '$lib/input/Input.svelte';
	import { ic_check } from 'maic/two_tone';
	import Button from '../lib/button/Button.svelte';
	import Toggle from '../lib/input/Toggle.svelte';
	import Svg from '../lib/svg/Svg.svelte';
	import { ButtonVariants } from '../lib/button';
	import { Dropdown } from '../lib/input';
</script>

<div class="home">
	<Input
		name="a"
		label="a"
	/>
	<Input
		name="b"
		label=""
	/>
	<Input
		name="c"
		label="textarea"
		multiline
	/>
	<Input
		name="d"
		label="textarea2"
		multiline
		height="auto"
	/>
	<Button {...ButtonVariants.Fab.Md}><Svg svg={ic_check} /></Button>
	<Dropdown
		name="thing"
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
	<Dropdown
		label="labelled"
		name="labelled-thing"
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
