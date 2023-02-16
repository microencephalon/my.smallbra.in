import React from 'react';

const Error = ({ responseCode }) => {
  // https://developers.google.com/maps-booking/verticals/beauty/reference/rest-api-v3/status_codes

  let message = {
    issue: '',
    desc: '',
  };

  switch (responseCode) {
    case '400':
      // Bad Request/Invalid Arguments (merchant, service, slot not found, trying to book an invalid slot, cancelling a booking that never existed).
      message.issue = 'Bad Request';
      message.desc = '';
      break;
    case '401':
      // Unauthenticated (invalid credentials, retry login). The request does not have valid authentication credentials for the operation.
      message.issue = 'Unauthorized';
      message.desc = '';
      break;
    case '403':
      // Permission denied/forbidden (caller is known and rejected). This response must not be used for rejections caused by exhausting some resource (use Too Many Requests instead for those errors). Forbidden must not be used if the caller can not be identified (use Unauthorized instead for those errors).
      message.issue = 'Forbidden';
      message.desc = '';
      break;
    case '404':
      // Not found (Resource not found, invalid url, including invalid RPCs)
      message.issue = 'Not Found';
      message.desc = 'The requested path /boner was not found on this server.';
      break;
    case '409':
      // The operation was aborted, typically due to a concurrency issue such as a sequencer check failure or transaction abort.
      message.issue = 'Conflict';
      message.desc = '';
      break;
    case '429':
      // Some resource has been exhausted, perhaps a per-user quota, or perhaps the entire file system is out of space.
      message.issue = 'Too Many Requests';
      message.desc = '';
      break;
    case '499':
      // The operation was cancelled, typically by the caller.
      message.issue = 'Client Closed Request';
      message.desc = '';
      break;
    case '500':
      // Internal errors. This means that some invariants expected by the underlying system have been broken. This error code is reserved for serious errors.
      message.issue = 'Internal Server Error';
      message.desc = '';
      break;
    case '501':
      // The operation is not implemented or is not supported/enabled in this service.
      message.issue = 'Not Implemented';
      message.desc = '';
      break;
    case '503':
      // The service is currently unavailable. This is most likely a transient condition, which can be corrected by retrying with a backoff.
      message.issue = 'Service Unavailable';
      message.desc = '';
      break;
    case '504':
      // The deadline expired before the operation could complete. For operations that change the state of the system, this error may be returned even if the operation has completed successfully. For example, a successful response from a server could have been delayed long enough for the deadline to expire.
      message.issue = 'Gateway Timeout';
      message.desc = '';
      break;
    default:
      break;
  }
  return (
    <>
      {/* Response Code + Message */}
      <div style={{ marginLeft: '20px', fontFamily: 'BPdotsSquares' }}>
        <h1>
          <span style={{ color: 'red' }}>{responseCode} </span> {message.issue}
        </h1>
        <p>{message.desc}</p>
      </div>
    </>
  );
};

export default Error;
