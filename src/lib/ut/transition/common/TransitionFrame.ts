export interface TransitionFrame {
	delay: number;
	duration: number;
	easing: (t: number) => number;
	css: (time: number, invertedTime: number) => string;
	tick?: (time: number, invertedTime: number) => void;
}
