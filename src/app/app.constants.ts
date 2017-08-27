

export const APP_NAME = 'Scelper';
export const PDF_MIMETYPE = 'application/pdf';
export const KILO_BYTE = 1024;

export const DEFAULT_SELECT_STATE = 'Wybierz';
export const BACK_BUTTON_TEXT = 'Wróć';

export const GENERIC_ERROR_HEADER = 'Wystąpił błąd';

export const SCENARIO_FILTER_DROPDOWN_OPTIONS = [
    { id: 0, category: 'title', label: 'Tytuł' },
    { id: 1, category: 'description', label: 'Opis' },
    { id: 2, category: 'authorEmail', label: 'Autor' },
    { id: 3, category: 'genre', label: 'Gatunek' },
    { id: 4, category: 'pages', label: 'Strony' },
    { id: 5, category: 'state', label: 'Stan' }
];

export const COMMON_MSG = new Map([
    ['confirm',
        'Czy jesteś pewien?'],
    ['emailSent',
        'Sprawdź skrzynkę mailową. Wysłaliśmy Ci ważne informacje nt. kolejnych kroków.'],
    ['deleteScenarioPrompt',
        'Wprowadź kod usunięcia: ']
]);

export const ERROR_MSG = new Map([
    ['scenariosDownload',
        'Wystąpił problem podczas pobierania listy scenariuszy. Sprawdź połączenie internetowe lub skontaktuj się z administracją'],
    ['scenarioAdd',
        'Wystąpił problem podczas dodawania scenariusza. Spróbuj ponownie lub skontaktuj się z administracją'],
    ['scenarioRequestAdd',
        'Wystąpił problem podczas dodawania zlecenia. Spróbuj ponownie lub skontaktuj się z administracją'],
    ['scenarioDelete',
        'Wystąpił problem podczas usuwania scenariusza. Sprawdź swój kod usunięcia i spróbuj ponownie.'],
    ['questionsDownload',
        'Wystąpił problem podczas pobierania listy pytań. Sprawdź połączenie internetowe lub skontaktuj się z administracją'],
    ['interviewSummaryGeneration',
        'Wystąpił problem podczas generowania podsumowania. Spróbuj ponownie lub skontaktuj się z administracją']
]);

export const SERVER_SUCCESS_RESPONSES = {
    MAIL_SENT: {
        msg: COMMON_MSG.get('emailSent'),
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

