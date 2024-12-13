import {ValidatorFn} from '@angular/forms';

export interface TextField {
  label: string;
  type: string;
  placeholder: string;
  validators?: ValidatorFn[];
}
