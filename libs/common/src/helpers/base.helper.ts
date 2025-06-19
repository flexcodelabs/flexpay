export const phoneNumber = (phone: string) => {
  if (!phone || phone.length < 9) return { valid: false, value: phone };

  phone = phone.replace(/[^\w\s]/gi, '');

  let withCode = phone;
  let withoutCode = phone;
  let withOutPlus = phone;

  if (phone.startsWith('+255')) {
    withoutCode = phone.replace('+255', '0');
    withOutPlus = phone.replace('+', '');
    withCode = phone;
  } else if (phone.startsWith('255')) {
    withoutCode = phone.replace(/^255/, '0');
    withCode = `+${phone}`;
  } else if (!phone.startsWith('0') && phone.length === 9) {
    withoutCode = `0${phone}`;
    withCode = `+255${phone}`;
    withOutPlus = `255${phone}`;
  } else if (phone.startsWith('0')) {
    withoutCode = phone;
    withCode = `+255${phone.substring(1)}`;
    withOutPlus = `255${phone.substring(1)}`;
  }

  return {
    valid: true,
    value: withoutCode,
    withCode,
    withOutPlus,
  };
};
