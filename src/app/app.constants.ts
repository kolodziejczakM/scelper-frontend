
export const APP_NAME = 'Scelper';

export const EMAIL_PATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;

export const KILO_BYTE = 1024;
export const SCENARIO_SIZE_LIMIT_KB = (200 * KILO_BYTE);

export const SCENARIO_ACCEPTABLE_MIMETYPE = 'application/pdf';

export const DEFAULT_SCENARIO_STATE = 'Wybierz';
export const SCENARIO_STATE_INCOMPLETE = 'Niekompletny';
export const SCENARIO_STATE_COMPLETE = 'Ukończony';

export const SCENARIO_STATES = [DEFAULT_SCENARIO_STATE, SCENARIO_STATE_INCOMPLETE, SCENARIO_STATE_COMPLETE]; // TO DO change it to Object[]

export const COMMON_MSG = new Map([
    ['confirm',
        'Czy jesteś pewien?'],
    ['deleteScenarioPrompt',
        'Wprowadź kod usunięcia: ']
]);

export const GENERIC_ERROR_HEADER = 'Wystąpił błąd';
export const BACK_BUTTON_TEXT = 'Wróć';

export const ERROR_MSG = new Map([
    ['scenariosDownload',
        'Wystąpił problem podczas pobierania listy scenariuszy. Sprawdź połączenie internetowe lub skontaktuj się z administracją'],
    ['scenarioAdd',
        'Wystąpił problem podczas dodawania scenariusza. Spróbuj ponownie lub skontaktuj się z administracją'],
    ['scenarioDelete',
        'Wystąpił problem podczas usuwania scenariusza. Sprawdź swój kod usunięcia i spróbuj ponownie.']
]);

export const SERVER_SUCCESS_RESPONSES = {
    MAIL_SENT: {
        msg: 'Sprawdź skrzynkę mailową. Wysłaliśmy Ci ważne informacje nt. kolejnych kroków.',
        code: 'MAIL_SENT'
    },
    SCENARIO_UPDATED: {
        msg: 'Aktywacja scenariusza przebiegła poprawnie.',
        code: 'SCENARIO_UPDATED'
    },
    SCENARIO_REMOVED: {
        msg: 'Scenariusz został usunięty. W razie pytań prosimy o kontakt z administracją.',
        code: 'SCENARIO_REMOVED'
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
