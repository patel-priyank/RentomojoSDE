import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'StringFilter'
})
export class StringFilterPipe implements PipeTransform {
  transform(text: string, searchText: string): string {
    if (!text || !searchText || text.toLowerCase().includes(searchText.toLowerCase())) {
      return text;
    } else {
      return null;
    }
  }
}
