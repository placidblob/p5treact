import dish from '../constants/dish';
import * as _ from 'lodash';

export default {
  p5triParams: {
    isRunning: true,
    behaviour: _.first(dish).behaviour
  },
  ui: {
    showMainSlider: true
  },
  fuelSavings: {
    newMpg: '',
    tradeMpg: '',
    newPpg: '',
    tradePpg: '',
    milesDriven: '',
    milesDrivenTimeframe: 'week',
    displayResults: false,
    dateModified: null,
    necessaryDataIsProvidedToCalculateSavings: false,
    savings: {
      monthly: 0,
      annual: 0,
      threeYear: 0
    }
  }
};
