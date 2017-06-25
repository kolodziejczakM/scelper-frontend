
export type PDFblob = Blob;

export interface ResponseObject {
    code: string;
    msg: string;
}

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

export interface ScelperSymbol {
    _id: string;
    id: number;
    codeName: string;
    path: string;
}

export interface ApiPathsObject {
    publicScenarios: any;
    simpleInterview: any;
}

export interface ScelperAuthor {
    name: string;
    imagePath: string;
    description: string;
    email: string;
}

export interface Breadcrumb {
    label: string;
    href: string;
}
