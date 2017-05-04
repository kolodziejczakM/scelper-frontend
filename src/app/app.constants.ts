
export const EMAIL_PATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;

export const KILO_BYTE = 1024;
export const SCENARIO_SIZE_LIMIT_KB = (200 * KILO_BYTE);

export const SCENARIO_ACCEPTABLE_MIMETYPE = 'application/pdf';

export const DEFAULT_SCENARIO_STATE = 'Wybierz';
export const SCENARIO_STATES = [DEFAULT_SCENARIO_STATE, 'Niekompletny', 'Ukończony'];

export const COMMON_MSG = new Map([
    ['confirm',
        'Czy jesteś pewien?']
]);

export const SERVER_RESPONSES: Object = {
    COMMON_UPLOAD: {
        msg: 'Wystąpił błąd w trakcie uploadu pliku. Spróbuj ponownie.',
        code: 'COMMON_UPLOAD'
    },
    COMMON_DOWNLOAD: {
        msg: 'Wystąpił błąd w trakcie pobierania pliku. Spróbuj ponownie.',
        code: 'COMMON_DOWNLOAD'
    },
    COMMON_DB: {
        msg: 'Wystąpił błąd w trakcie połączenia z bazą danych. Spróbuj ponownie.',
        code: 'COMMON_DB'
    },
    EXTENSION: {
        msg: 'Format pliku jest nieodpowiedni.',
        code: 'EXTENSION'
    },
    SCENARIO_DB_SAVE: {
        msg: 'Wystąpił błąd w trakcie zapisu scenariusza. Spróbuj ponownie.',
        code: 'SCENARIO_DB_SAVE'
    },
    SCENARIO_DB_UPDATE: {
        msg: 'Wystąpił błąd w trakcie aktywacji scenariusza. Spróbuj ponownie.',
        code: 'SCENARIO_DB_UPDATE'
    },
    SCENARIO_DB_REMOVE: {
        msg: 'Wystąpił błąd w trakcie usuwania scenariusza. Skontaktuj się z administracją.',
        code: 'SCENARIO_DB_REMOVE'
    },
    SCENARIO_FILE_UPDATE: {
        msg: 'Wystąpił błąd w trakcie aktywacji scenariusza. Skontaktuj się z administracją.',
        code: 'SCENARIO_FILE_UPDATE'
    },
    SCENARIO_FILE_REMOVE: {
        msg: 'Wystąpił błąd podczas usuwania scenariusza. Skontaktuj się z administracją.',
        code: 'SCENARIO_FILE_REMOVE'
    },
    ALREADY_EXISTS: {
        msg: 'Twój scenariusz jest już w naszej bazie danych. W razie pytań skontaktuj się z administracją.',
        code: 'ALREADY_EXISTS'
    },
    NOT_EXISTS: {
        msg: 'Wystąpił błąd. Scenariusz został już usunięty. W razie pytań skontaktuj się z administracją.',
        code: 'NOT_EXISTS'
    },
    MAIL_SENDING: {
        msg: 'Wystąpił błąd podczas wysyłki maila aktywacyjnego. Prosimy o kontakt z administracją.',
        code: 'MAIL_SENDING'
    },
    DELETE_CODE_NOT_EXISTS: {
        msg: 'Kod usunięcia jest niepoprawny.',
        code: 'DELETE_CODE_NOT_EXISTS'
    },
    SCENARIO_SAVED: {
        msg: 'Scenariusz zapisany poprawnie.',
        code: 'SCENARIO_SAVED'
    },
    SCENARIO_UPDATED: {
        msg: 'Scenariusz został aktywowany.',
        code: 'SCENARIO_UPDATED'
    },
    SCENARIO_REMOVED: {
        msg: 'Scenariusz usunięty poprawnie.',
        code: 'SCENARIO_REMOVED'
    },
    MAIL_SENT: {
        msg: 'Scenariusz zapisany poprawnie. Wysłaliśmy do Ciebie maila aktywacyjnego.',
        code: 'MAIL_SENT'
    }
};

export const PDF_FORM_TXT = new Map([
    ['cannotSubmitted',
        'Przycisk "Publikuj" uaktywni się gdy wszystkie pola zostaną wypełnione poprawnie.'],
    ['required',
        'To pole jest wymagane.'],
    ['title',
        'Minimalna długość tytułu to 1 znak.'],
    ['authorEmail',
        'Format emaila jest niepoprawny.'],
    ['authorEmailConfirm',
        'Sprawdź wprowadzone maile, są między nimi różnice.'],
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
    ['b_add_hide',
        'Schowaj formularz'],
    ['b_upload',
        'Upload PDF'],
    ['b_submit',
        'Publikuj'],
    ['b_reset',
        'Wyczyść dane']
]);
