
export interface ResponseObject {
    code: string;
    msg: string;
}

export interface PdfForm {
    title: string;
    authorEmail: string;
    state: string;
    description: string;
    file: Blob;
}

export interface PublicScenario {
    title: string;
    description: string;
    authorEmail: string;
    pages: number | string;
    state: ScenarioState;
}

export interface ScenarioState {
    id: number;
    value: number;
    label: string;
}

export interface ScenarioSelectFilterOption {
    id: number;
    category: string;
    label: string;
}

export interface ApiPathsObject {
    publicScenarios: any;
}
