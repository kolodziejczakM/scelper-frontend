
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
    pages?: number | string; // is mapped to string for filtering purposes (indexOf method)
    state?: string; // it must be changed to object
    stateId?: number; //  it will in object
}

