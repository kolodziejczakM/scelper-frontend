import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiPathsObject } from './interfaces';

@Injectable()
export class ApiRoutesService {

    private serverRoot = environment.serverRoot;
    private apiSegment = `api/v1`;
    private apiBaseRoute = `${this.serverRoot}/${this.apiSegment}`;

    private publicScenarios = {
        getAll: () => `${this.apiBaseRoute}/public-scenarios`,
        getAllRequests: () => `${this.apiBaseRoute}/public-scenarios/requests`,
        post: () => `${this.apiBaseRoute}/public-scenarios`,
        postRequest: () => `${this.apiBaseRoute}/public-scenarios/requests`,
        patch: (deleteCode: string) => `${this.serverRoot}/public-scenarios/activation/${deleteCode}`,
        patchRequest: (deleteCode: string) => `${this.serverRoot}/public-scenarios/requests/activation/${deleteCode}`,
        delete: (deleteCode: string) => `${this.apiBaseRoute}/public-scenarios/${deleteCode}`,
        deleteRequest: (deleteCode: string) => `${this.apiBaseRoute}/public-scenarios/requests/${deleteCode}`
    };

    private simpleInterview = {
        getQuestions: () => `${this.apiBaseRoute}/interview-questions`,
        getRandomSymbols: (amount = 3) => `${this.apiBaseRoute}/random-symbols?amount=${amount}`,
        postAnswers: () => `${this.apiBaseRoute}/interview-summary`
    };

    private creativeRoom = {
        postTextToSpeech: () => `${this.apiBaseRoute}/tts`
    };

    private paths = {
        publicScenarios: this.publicScenarios,
        simpleInterview: this.simpleInterview,
        creativeRoom: this.creativeRoom
    };

    public getPaths(): ApiPathsObject {
        return this.paths;
    }
}
