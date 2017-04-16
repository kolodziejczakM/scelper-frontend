

export const DEFAULT_SCENARIO_STATE = 'Wybierz';
export const SCENARIO_STATES = [DEFAULT_SCENARIO_STATE, 'Niekompletny', 'Ukończony'];

export const PDF_FORM_MSG = new Map([
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
        'Format pliku jest nieodpowiedni.']
]);
