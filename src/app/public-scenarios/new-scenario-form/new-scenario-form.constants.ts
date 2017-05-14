import { KILO_BYTE } from '../../app.constants';

export const EMAIL_PATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;
export const SCENARIO_SIZE_LIMIT_KB = (200 * KILO_BYTE);
export const SCENARIO_ACCEPTABLE_MIMETYPE = 'application/pdf';

export const DEFAULT_SCENARIO_STATE = 'Wybierz';

export const SCENARIO_STATES = [
    { id: 0, value: 0, label: 'Wybierz' },
    { id: 1, value: 0, label: 'Niekompletny' },
    { id: 2, value: 1, label: 'Ukończony' }
];

export const PDF_FORM_TXT = new Map([
    ['cannotSubmitted',
        'Przycisk "Publikuj" uaktywni się gdy wszystkie pola zostaną wypełnione poprawnie.'],
    ['required',
        'To pole jest wymagane.'],
    ['title',
        'Minimalna długość tytułu to 1 znak.'],
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
        'Opis powinien mieć od 10 do 100 znaków.'],
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
