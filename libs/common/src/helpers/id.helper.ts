const randomSample = (uidArraySample: string[] = [], fn = Math.random) => {
  if (uidArraySample.length === 0) return;
  return uidArraySample[Math.round(fn() * (uidArraySample.length - 1))];
};

export const id = (limit = 16, fn = Math.random) => {
  const allowedLetters: any = [
    'abcdefghijklmnopqrstuvwxyz-',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ!',
  ].join('');
  const allowedChars: any = ['0123456789$', allowedLetters].join('');

  const generatedId = [randomSample(allowedLetters, fn)];

  for (let i = 0; i < limit - 1; i++) {
    generatedId.push(randomSample(allowedChars, fn));
  }

  return generatedId.join('');
};
