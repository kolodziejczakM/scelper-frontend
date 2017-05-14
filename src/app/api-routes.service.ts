import { Injectable } from '@angular/core';
import { ApiPathsObject } from './interfaces';

@Injectable()
export class ApiRoutesService {

    private serverBase = `http://localhost:3000`;
    private apiSegment = `api/v1`;
    private apiBaseRoute = `${this.serverBase}/${this.apiSegment}`;

    private publicScenarios = {
        getAll: () => `${this.apiBaseRoute}/public-scenarios`,
        post: () => `${this.apiBaseRoute}/public-scenarios`,
        patch: (deleteCode: string) => `${this.serverBase}/activation/${deleteCode}`,
        delete: (deleteCode: string) => `${this.apiBaseRoute}/public-scenarios/${deleteCode}`
    };

    private paths = {
        publicScenarios: this.publicScenarios
    };

    public getPaths(): ApiPathsObject {
        return this.paths;
    }
}
