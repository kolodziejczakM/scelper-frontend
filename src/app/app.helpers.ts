import { SERVER_RESPONSES } from './app.constants';

export function translateServerResponse(respCode: string): string {
    for (const res in SERVER_RESPONSES) {
        if (res === respCode) {
            return SERVER_RESPONSES[res]['msg'];
        }
    }
}
