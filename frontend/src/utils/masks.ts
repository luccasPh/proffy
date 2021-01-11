import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export function getPhoneMask(): any {
  return [
    '(',
    /[1-9]/,
    /\d/,
    ')',
    ' ',
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
}

export function getCurrencyMask(): any {
  const currencyMaskOptions = {
    decimalLimit: 2,
    thousandsSeparatorSymbol: '.',
    decimalSymbol: ',',
    allowDecimal: true,
    integerLimit: 15,
    prefix: 'R$ ',
    suffix: '',
    allowNegative: true,
  };

  return createNumberMask(currencyMaskOptions);
}

export function getTimeMask(): any {
  return [/[0-2]/, /\d/, ':', /[0-5]/, /\d/];
}
