const sanitizeNullError = (message: string) => {
  const column = message.split('"');
  return `${column[1]} can not be null`;
};

const sanitizeFinalMessage = (message: string): string => {
  return message.includes('Could not find any entity of type "User" matching')
    ? 'User not found'
    : message.includes('Could not find any entity of type')
    ? 'Entity could not be found'
    : message.includes('channel with name, userid')
    ? 'A channel with a similar name exists.'
    : message.includes('channelvalue with metadata')
    ? 'You have already added the property to the channel'
    : message.includes('channelkey with metadata')
    ? 'A similar key already exists on this channel'
    : message.includes('null value in column')
    ? sanitizeNullError(message)
    : message;
};

const messageToUpper = (message: string): string => {
  const firstCharacter =
    typeof message?.split(' ')[0] === 'string'
      ? message?.split(' ')[0][0].toUpperCase() +
        message?.split(' ')[0].substring(1)
      : null;
  const finalMessage = message.split(' ');
  finalMessage[0] = firstCharacter ? firstCharacter : '';
  return finalMessage.join(' ');
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
    message = sanitizeFinalMessage(message);
  }
  message = messageToUpper(message);
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

const sanitizeObject = (responseObject: any) => {
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

  if (newResponseObject.secret) {
    newResponseObject.value = null;
  }

  return newResponseObject;
};

export const sanitizeResponse: any = (responseObject: any) => {
  if (Array.isArray(responseObject)) {
    return responseObject.map((response) => sanitizeObject(response));
  }
  if (responseObject.secret) {
    responseObject.value = null;
  }
  return sanitizeObject(responseObject);
};
