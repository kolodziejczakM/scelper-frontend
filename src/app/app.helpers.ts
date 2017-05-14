import { SERVER_SUCCESS_RESPONSES } from './app.constants';

export function translateServerResponse(respCode: string): string {
    for (const res in SERVER_SUCCESS_RESPONSES) {
        if (res === respCode) {
            return SERVER_SUCCESS_RESPONSES[res]['msg'];
        }
    }
}
