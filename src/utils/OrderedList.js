import * as _ from 'lodash';

const listItem = (rank, value) => ({rank, value});

export class OrderedList {
  list = [];

  addItem = (value, rank, maxSize = 8) => {
    this.list = _.sortBy(this.list.push(new listItem(rank, value)), (a, b) => a.rank - b.rank);

    while(maxSize > 0 && this.list.length > maxSize)
      this.list.pop();
  };
}
