import {ResponseMessage} from './ResponseMessage';

export class ResponseErrorMessage extends ResponseMessage {
  code: string;
  type: string;
}
