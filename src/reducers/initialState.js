import behaviours from '../constants/behaviours';
import dishConfigs from '../constants/dishConfigs';
import * as dishType from '../constants/dishTypes';

import * as _ from 'lodash';

export default {
  p5triParams: {
    dishType: dishType.BALLS,
    isRunning: true,
    behaviour: _.first(behaviours),
    dishConfig: _.first(dishConfigs),
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
