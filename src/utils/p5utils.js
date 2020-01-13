

export const getNoisyColour = (p, x, y, depth = 1, factor = 300) => p.color(
  p.noise(x / factor, y / factor, depth) * 255,
  p.noise(x / factor, y / factor, depth * 2) * 255,
  p.noise(x / factor, y / factor, depth * 3) * 255,
);

export const getNoise = (p, x, y, factor = 150) =>
  p.noise(x / factor, y / factor);

export const create2dMapWith = (width, height, fillWith) => {
  const rtrn = [];

  for (let x = 0; x < width; x++) {
    rtrn.push([]);
    for (let y = 0; y < height; y++)
      rtrn[x].push(fillWith(x, y));
  }

  return rtrn;
};

export const create2dNoiseMap = (p, width, height, transform = val => val) =>
  create2dMapWith(width, height, (x, y) => transform(getNoise(p, x, y)));

export const createTransparencyMap = (p, width, height) =>
  create2dNoiseMap(p, width, height, val => 255 * val);

export const createDirectionMap = (p, width, height) =>
  create2dNoiseMap(p, width, height, val => p.createVector(val * p.TWO_PI, Math.tan(val * p.TWO_PI)));

export const createColourMap = (p, width, height) =>
  create2dMapWith(width, height, (x, y) => getNoisyColour(p, x, y));

export const promise2dMapWith = (p, width, height, fillWith) => new Promise(resolve => resolve(fillWith(p, width, height)) );

export const promise2dNoiseMap = (p, width, height) => promise2dMapWith(p, width, height, create2dNoiseMap);
export const promiseColourMap = (p, width, height) => promise2dMapWith(p, width, height, createColourMap);
export const promiseDirectionMap = (p, width, height) => promise2dMapWith(p, width, height, createDirectionMap);

export const promiseVectorMap = (p, width, height) => promise2dMapWith(p, width, height, createDirectionMap);

export const oppositeColour = (p, c) => p.color(255 - p.red(c), 255 - p.green(c), 255 - p.blue(c));
