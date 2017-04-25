
export const EMAIL_PATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;

export const KILO_BYTE = 1024;
export const SCENARIO_SIZE_LIMIT_KB = (200 * KILO_BYTE);

export const SCENARIO_ACCEPTABLE_EXTENSION = 'application/pdf';

export const DEFAULT_SCENARIO_STATE = 'Wybierz';
export const SCENARIO_STATES = [DEFAULT_SCENARIO_STATE, 'Niekompletny', 'Ukończony'];

export const COMMON_MSG = new Map([
    ['confirm',
        'Czy jesteś pewien?']
]);

export const PDF_FORM_TXT = new Map([
    ['cannotSubmitted',
        'Przycisk dodaj uaktywni się gdy wszystkie pola zostaną wypełnione poprawnie.'],
    ['required',
        'To pole jest wymagane.'],
    ['title',
        'Minimalna długość tytułu to 1 znak.'],
    ['authorEmail',
        'Format emaila jest niepoprawny.'],
    ['state',
        ''],
    ['description',
        'Opis powinien mieć od 10 do 100 znaków.'],
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
    ['b_upload',
        'Upload PDF'],
    ['b_submit',
        'Dodaj'],
    ['b_reset',
        'Wyczyść dane']
]);
