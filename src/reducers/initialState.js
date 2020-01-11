import behaviours from '../constants/behaviours';
import dishConfigs from '../constants/dishConfigs';
import * as _ from 'lodash';

export default {
  p5triParams: {
    isRunning: true,
    behaviour: _.first(behaviours).behaviour,
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
