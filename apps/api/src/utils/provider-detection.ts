export function providerDetection(mobile: string): 'momo' | 'om' | undefined {
  if (mobile.includes(' ')) mobile = mobile.split(' ').join('');
  if (mobile.startsWith('+')) mobile = mobile.split('+').join('');
  const seg = mobile.slice(3, 6);
  if (
    [
      '650',
      '651',
      '652',
      '653',
      '654',
      '670',
      '671',
      '672',
      '673',
      '674',
      '675',
      '676',
      '677',
      '678',
      '679',
      '680',
      '681',
      '682',
      '683',
      '684',
    ].includes(seg)
  )
    return 'momo';
  if (
    [
      '640',
      '655',
      '656',
      '657',
      '658',
      '659',
      '685',
      '686',
      '687',
      '688',
      '689',
      '690',
      '691',
      '692',
      '693',
      '694',
      '695',
      '696',
      '697',
      '698',
      '699',
    ].includes(seg)
  )
    return 'om';
  return undefined;
}
