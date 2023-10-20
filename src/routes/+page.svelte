<script lang="ts">
	import Input from '$lib/input/Input.svelte';
	import { ic_check } from 'maic/two_tone';
	import Button from '../lib/button/Button.svelte';
	import Toggle from '../lib/input/Toggle.svelte';
	import Svg from '../lib/svg/Svg.svelte';
	import { ButtonVariants } from '../lib/button';
	import { Dropdown } from '../lib/input';
	import { InputVariants } from '../lib/input/InputVariants';
	import Toaster, { toasts } from '../lib/toast/Toaster.svelte';
	import { Levels } from '../lib/common/enums';
	import BottomSheet, {
		BottomSheetStates,
	} from '../lib/layout/BottomSheet.svelte';

	toasts.push({
		text: 'hello',
		duration: Infinity,
		level: Levels.OK,
	});
	toasts.push({
		text: 'hello Auasd hUIAHD uhaS UIDHUIAS HDUIh UIHD UISAHD UISAHDui hUI HDOUISAHD iuHASUI DH',
		duration: Infinity,
		level: Levels.OK,
	});
	setTimeout(() => {
		toasts.push({
			text: 'helloAAAA',
			duration: Infinity,
			level: Levels.OK,
		});
	}, 1000);
</script>

<div class="home">
	<Toaster />
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
		label="textarea auto"
		multiline
		height="auto"
	/>
	<Input
		name="e"
		label="textarea limited"
		multiline
		height="200px"
	/>
	<Input
		{...InputVariants.Transparent}
		name="d"
		label="textarea limited transparent"
		multiline
		height="200px"
	/>
	<div style="min-height: 200px; max-height: 300px">
		<Input
			name="e"
			label="textarea auto limited"
			multiline
			height="100%"
		/>
	</div>
	<Button {...ButtonVariants.Fab.Md}><Svg svg={ic_check} /></Button>
	<Button
		{...ButtonVariants.Fab.Md}
		{...ButtonVariants.Transparent}><Svg svg={ic_check} /></Button
	>
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
	<BottomSheet
		state={BottomSheetStates.PEEK}
		width="50%"
	>
		<h1>AAAAA</h1>
		<h1>AAAAA</h1>
		<h1>AAAAA</h1>
		<h1>AAAAA</h1>
		<h1>AAAAA</h1>
		<h1>AAAAA</h1>
		<h1>AAAAA</h1>
		<h1>AAAAA</h1>
		<h1>AAAAA</h1>
		<h1>AAAAA</h1>
		<h1>AAAAA</h1>
		<h1>AAAAA</h1>
		<h1>AAAAA</h1>
	</BottomSheet>
</div>

<style lang="postcss">
</style>
