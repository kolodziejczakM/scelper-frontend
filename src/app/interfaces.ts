
export interface ResponseObject {
    code: string;
    msg: string;
}

export type PDFblob = Blob;

export interface PdfForm {
    title: string;
    authorEmail: string;
    genre: ScenarioGenre;
    state: ScenarioState;
    description: string;
    file: Blob;
}

export interface PublicScenario {
    title: string;
    description: string;
    authorEmail: string;
    pages: number | string;
    genre: any;
    state: any;
}

export interface ScenarioState {
    id: number;
    value: number;
    label: string;
}

export interface ScenarioGenre {
    id: number;
    label: string;
}

export interface ScenarioSelectFilterOption {
    id: number;
    category: string;
    label: string;
}

export interface SimpleInterviewQuestion {
    _id: string;
    id: number;
    category: string;
    questionText: string;
    answer?: string;
    timeOfAnswering?: number;
}

export interface ApiPathsObject {
    publicScenarios: any;
    simpleInterview: any;
}
