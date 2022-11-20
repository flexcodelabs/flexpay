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
