const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
export const isLowEnd =
  /FBAN|FBAV|Instagram|Line|Twitter|MicroMessenger/i.test(ua) ||
  /^((?!chrome|android).)*safari/i.test(ua);
