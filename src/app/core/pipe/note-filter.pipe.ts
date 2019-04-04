import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../model/note';

@Pipe({
  name: 'noteFilter'
})
export class NoteFilterPipe implements PipeTransform {

  transform(notes: Note[], valid = ''): Note[] {
    if (!valid) {
      return notes.filter((item) => {
        if (!item.archive && !item.inTrash && !item.pinned) {
          return item;
        }
      });
    }
    if (valid === 'archive') {
      return notes.filter((item) => {
        if (item.archive && !item.inTrash && !item.pinned) {
          return item;
        }
      });
    }
    if (valid === 'pinned') {
      return notes.filter((item) => {
        if (!item.inTrash && item.pinned) {
          return item;
        }
      });
    }
    if (valid === 'inTrash') {
      return notes.filter((item) => {
        if (item.inTrash) {
          return item;
        }
      });
    }
    if (valid === 'reminder') {
      return notes.filter((item) => {
        if (!item.inTrash && item.reminder) {
          return item;
        }
      });
    }else if (valid === 'label') {
      return notes.filter((item) => {
        if (!item.inTrash) {
          return item;
        }
      });
}
    return null;



  }

}
