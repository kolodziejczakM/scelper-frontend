import { SERVER_RESPONSES } from './app.constants';

export function translateServerResponse(respCode: string): string {
    for (const response in SERVER_RESPONSES) {
        if (respCode === response['code']) {
            return response['msg'];
        }
    }
}
