
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
    pages?: number;
    state?: string;
    stateId?: number;
}


