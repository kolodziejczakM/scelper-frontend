
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

export interface PublicScenarioRequest {
    genre: any;
    type: any;
    actorNumber: number | string;
    actressNumber: number | string;
    vehicleNumber: number | string;
    budget: number | string;
    description: string;
    requestAuthorEmail: string;
    updatedAt: any;
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

export interface ScenarioType {
    id: number;
    label: string;
}

export interface ScenarioSelectFilterOption {
    id: number;
    category: string;
    label: string;
}

export interface ScenarioRequestSelectFilterOption {
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
    creativeRoom: any;
}

export interface ScelperAuthor {
    name: string;
    imagePath: string;
    description: string;
    email: string;
}

export interface Breadcrumb {
    iconName: string;
    label: string;
    href: string;
}
