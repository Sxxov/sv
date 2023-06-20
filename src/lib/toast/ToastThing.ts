import { Thing } from '@sxxov/ut/thing';
import { Levels } from '../common/enums/Levels';
import { v4 as uuid } from 'uuid';

export interface IToastThing extends Required<IToastThingParameters> {}

interface IToastThingParameters {
	uid?: string;
	text: string;
	level?: Levels;
	duration?: number;
}

export class ToastThing extends Thing<IToastThingParameters>()(
	class {
		uid = uuid();
		level = Levels.INFO;
		duration = 2000;
	},
) {}
