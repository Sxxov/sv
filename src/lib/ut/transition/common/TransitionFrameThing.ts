import { Thing } from '@sxxov/ut/thing';

export interface ITransitionFrameThing
	extends Required<ITransitionFrameThingParameters> {}

interface ITransitionFrameThingParameters {
	delay: number;
	duration: number;
	easing: (t: number) => number;
	css: (time: number, invertedTime: number) => string;
	tick?: (time: number, invertedTime: number) => void;
}

export class TransitionFrameThing extends Thing<ITransitionFrameThingParameters>()(
	class {},
) {}
