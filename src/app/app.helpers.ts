import { SERVER_SUCCESS_RESPONSES } from './app.constants';
import { SCENARIO_STATE_INCOMPLETE,
         SCENARIO_STATE_COMPLETE } from './public-scenarios/new-scenario-form/new-scenario-form.constants';

export function translateServerResponse(respCode: string): string {
    for (const res in SERVER_SUCCESS_RESPONSES) {
        if (res === respCode) {
            return SERVER_SUCCESS_RESPONSES[res]['msg'];
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
