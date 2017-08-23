import { DEFAULT_SELECT_STATE } from '../../app.constants';
import { SCENARIO_DESCRIPTION_MIN_LENGTH,
         SCENARIO_DESCRIPTION_MAX_LENGTH } from '../new-scenario-form/new-scenario-form.constants';

export const SCENARIO_TYPES = [
    { id: 0, label: DEFAULT_SELECT_STATE },
    { id: 1, label: 'Krótkometrażowy' },
    { id: 2, label: 'Pełnometrażowy' }
];

export const SCENARIO_REQUEST_FORM_TXT = new Map([
    ['cannotSubmitted',
        'Przycisk "Publikuj" uaktywni się gdy wszystkie pola zostaną wypełnione poprawnie.'],
    ['required',
        'To pole jest wymagane.'],
    ['actorNumber',
        'Liczba aktorów powinna mieścić się pomiędzy 0 a 50'],
    ['actorNumberPlaceholder',
        'Wprowadź liczbę aktorów'],
    ['actressNumber',
        'Liczba aktorek powinna mieścić się pomiędzy 0 a 50'],
    ['actressNumberPlaceholder',
        'Wprowadź liczbę aktorek'],
    ['vehicleNumber',
        'Liczba pojazdów powinna mieścić się pomiędzy 0 a 50'],
    ['vehicleNumberPlaceholder',
        'Wprowadź liczbę pojazdów'],
    ['budget',
        'Budżet powinien być liczbą całkowitą z zakresu od 0 do 50 000.000 (PLN)'],
    ['budgetPlaceholder',
        'Wprowadź budżet (PLN)'],
    ['requestAuthorEmail',
        'Format emaila jest niepoprawny.'],
    ['requestAuthorEmailPlaceholder',
        'Twój e-mail'],
    ['requestAuthorEmailConfirm',
        'Sprawdź wprowadzone maile, są między nimi różnice.'],
    ['requestAuthorEmailConfirmPlaceholder',
        'Powtórz email'],
    ['description',
        `Opis powinien mieć od ${SCENARIO_DESCRIPTION_MIN_LENGTH} do ${SCENARIO_DESCRIPTION_MAX_LENGTH} znaków.`],
    ['descriptionPlaceholder',
        'Krótki opis.'],
    ['b_add',
        'Dodaj zlecenie'],
    ['b_add_hide',
        'Schowaj formularz'],
    ['b_submit',
        'Publikuj'],
    ['b_reset',
        'Wyczyść dane']
]);
