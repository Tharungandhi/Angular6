import { Pipe, PipeTransform } from '@angular/core';
import { label } from '../model/label';

@Pipe({
  name: 'labelFilter'
})
export class LabelFilterPipe implements PipeTransform {

  transform(labels: label[], searchValue: any): any {
    console.log(labels, searchValue);
    if (!searchValue) {
      return labels;
    }
    else {
      return labels.filter(({ labelName }) => {
        return labelName.includes(searchValue);
      });
    }
}

}
