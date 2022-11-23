const sanitizeNullError = (message: string) => {
  const column = message.split('"');
  return `${column[1]} can not be null`;
};

const sanitizeMessage = (message: string) => {
  if (
    message.includes('Cannot POST') ||
    message.includes('Cannot GET') ||
    message.includes('Cannot PATCH') ||
    message.includes('Cannot DELETE') ||
    message.includes('Cannot PUT')
  ) {
    message = 'Oops 😢! Route not available.';
  } else {
    message = message.includes(
      'Could not find any entity of type "User" matching',
    )
      ? 'User not found'
      : message.includes('null value in column')
      ? sanitizeNullError(message)
      : message;
  }
  return message;
};
export const errorSanitizer = (error: {
  detail: string;
  table: string;
  message: string | string[];
  response: { message: any[] };
  error: any;
}) => {
  let message: string;
  const detail = error?.detail;
  if (
    detail &&
    typeof detail === 'string' &&
    detail?.includes('already exists')
  ) {
    message = error.table.split('_').join(' ') + ' with';
    message = error.detail.replace('Key', message);
  } else {
    message = error?.message?.includes('Bad Request error')
      ? error?.response?.message?.join(',')
      : error?.message || error?.error;
  }
  message = message.split('(').join('');
  message = message.split(')').join('');
  message = message.split('=').join(' ');

  message = sanitizeMessage(message);

  return message;
};

export const sanitizeResponse: any = (responseObject: any) => {
  const omit = (
    responseObject: { [x: string]: any },
    responseObjectProps: any[],
  ) => {
    responseObject = { ...responseObject };
    responseObjectProps.forEach((prop) => delete responseObject[prop]);
    return responseObject;
  };

  const newResponseObject: Record<string, unknown> = {};
  const attributeKeys = Object.keys(omit(responseObject, ['password', 'salt']));
  attributeKeys.forEach((attributeKey) => {
    let attributeValue: string | boolean | number | any;
    if (responseObject[attributeKey] === false) {
      attributeValue = false;
    } else {
      attributeValue = responseObject[attributeKey];
    }
    if (attributeValue || attributeValue === false) {
      if (typeof attributeValue === 'object') {
        if (Array.isArray(attributeValue)) {
          newResponseObject[attributeKey] = responseObject[attributeKey].map(
            (value: any) => sanitizeResponse(value),
          );
        } else {
          if (isNaN(Date.parse(attributeValue))) {
            newResponseObject[attributeKey] = sanitizeResponse(attributeValue);
          } else {
            newResponseObject[attributeKey] = attributeValue;
          }
        }
      } else {
        newResponseObject[attributeKey] = attributeValue;
      }
    }
  });

  return newResponseObject;
};