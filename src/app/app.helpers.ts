import { SERVER_RESPONSES,
         SCENARIO_STATE_INCOMPLETE,
         SCENARIO_STATE_COMPLETE } from './app.constants';

export function translateServerResponse(respCode: string): string {
    for (const res in SERVER_RESPONSES) {
        if (res === respCode) {
            return SERVER_RESPONSES[res]['msg'];
        }
    }
}

export function getStateStringFromId(stateId = 0) {
    if (!stateId) {
        return SCENARIO_STATE_INCOMPLETE;
    } else {
        return SCENARIO_STATE_COMPLETE;
    }
}