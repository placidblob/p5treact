export default {
  p5triParams: {
    isRunning: true,
    behaviour: {
      "deflectX": false,
      "deflectY": false,
      "pacmanX": true,
      "pacmanY": true,

      "gravity": false,
      "friction": true,

      "attraction": true,
      "repulsion": true,

      "limitVelocity": true,
      "velocity": 2,
      "colourBleed": true,
      "colourBleedIntensity": 0.5
    }
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
