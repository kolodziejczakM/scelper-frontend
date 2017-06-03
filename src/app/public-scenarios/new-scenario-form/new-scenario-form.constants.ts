import { PDF_MIMETYPE, KILO_BYTE, DEFAULT_SELECT_STATE } from '../../app.constants';

export const EMAIL_PATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;
export const SCENARIO_SIZE_LIMIT_KB = (200 * KILO_BYTE);
export const SCENARIO_ACCEPTABLE_MIMETYPE = PDF_MIMETYPE;

export const SCENARIO_TITLE_MIN_LENGTH = 1;
export const SCENARIO_DESCRIPTION_MIN_LENGTH = 10;
export const SCENARIO_DESCRIPTION_MAX_LENGTH = 150;

export const SCENARIO_STATES = [
    { id: 0, value: 0, label: DEFAULT_SELECT_STATE },
    { id: 1, value: 0, label: 'Niekompletny' },
    { id: 2, value: 1, label: 'Ukończony' }
];

export const SCENARIO_GENRES = [
    { id: 0, label: DEFAULT_SELECT_STATE },
    { id: 1, label: 'Akcji' },
    { id: 2, label: 'Przygodowy' },
    { id: 3, label: 'Komedia' },
    { id: 4, label: 'Dramat' },
    { id: 5, label: 'Kryminał' },
    { id: 6, label: 'Historyczny' },
    { id: 7, label: 'Horror' },
    { id: 8, label: 'Thriller' },
    { id: 9, label: 'Musical' },
    { id: 10, label: 'Science fiction' },
    { id: 11, label: 'Wojenny' },
    { id: 12, label: 'Western' }
];

export const PDF_FORM_TXT = new Map([
    ['cannotSubmitted',
        'Przycisk "Publikuj" uaktywni się gdy wszystkie pola zostaną wypełnione poprawnie.'],
    ['required',
        'To pole jest wymagane.'],
    ['title',
        `Minimalna długość tytułu to ${SCENARIO_TITLE_MIN_LENGTH} znak.`],
    ['titlePlaceholder',
        'Tytuł'],
    ['authorEmail',
        'Format emaila jest niepoprawny.'],
    ['authorEmailPlaceholder',
        'E-mail (autora)'],
    ['authorEmailConfirm',
        'Sprawdź wprowadzone maile, są między nimi różnice.'],
    ['authorEmailConfirmPlaceholder',
        'Powtórz email'],
    ['state',
        ''],
    ['description',
        `Opis powinien mieć od ${SCENARIO_DESCRIPTION_MIN_LENGTH} do ${SCENARIO_DESCRIPTION_MAX_LENGTH} znaków.`],
    ['descriptionPlaceholder',
        'Krótki opis.'],
    ['file',
        'Nie wybrano pliku'],
    ['fileFormat',
        'Format pliku jest nieodpowiedni.'],
    ['fileSize',
        'Plik jest zbyt duży.'],
    ['emailSent',
        'Na podany adres email wysłaliśmy ważne informacje. Dziękujemy za pomoc w rozwoju serwisu.'],
    ['b_add',
        'Dodaj własny scenariusz'],
    ['b_add_hide',
        'Schowaj formularz'],
    ['b_upload',
        'Upload PDF'],
    ['b_submit',
        'Publikuj'],
    ['b_reset',
        'Wyczyść dane']
]);
