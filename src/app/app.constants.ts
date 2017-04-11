
export const SCENARIO_STATES = ['Ukończony', 'Niekompletny'];

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
        'Nie wybrano pliku lub format pliku jest nieodpowiedni.']
]);