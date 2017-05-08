import { Injectable } from '@angular/core';

@Injectable()
export class ApiRoutesService {

    serverBase = `http://localhost:3000`;
    apiSegment = `api/v1`;

    apiBaseRoute = `${this.serverBase}/${this.apiSegment}`;

    publicScenarios = {
        getAll: () => `${this.apiBaseRoute}/public-scenarios`,
        post: () => `${this.apiBaseRoute}/public-scenarios`,
        delete: (deleteCode: string) => `${this.apiBaseRoute}/public-scenarios/${deleteCode}`
    };

    paths = {
        publicScenarios: this.publicScenarios
    };

    public getPaths() {
        return this.paths;
    }
}
