// import * as ml5 from 'ml5';
//
// // Options for the SpeechCommands18w model, the default probabilityThreshold is 0
// const options = { probabilityThreshold: 0.7 };
// const classifier = ml5.soundClassifier('SpeechCommands18w', options, modelReady);
//
// function modelReady() {
//   // classify sound
//   classifier.classify(gotResult);
// }
//
// function gotResult(error, result) {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   // log the result
//   console.log('************ >>', result);
// }

export class Experiments {
  tick = 0;

  setup = (p, props) => {
      if (!p || !props) return;

      p.createCanvas(props.dishConfig.width, props.dishConfig.height);
  };

  draw = (p, props) => {
    this.tick++;

    p.background(51);

    const pos = p.createVector(p.random(0,props.dishConfig.width), p.random(0,props.dishConfig.height));
    const colour = p.color(255,255,255);

    p.strokeWeight(20);
    p.stroke(colour);
    p.point(pos.x, pos.y);

  };
}

