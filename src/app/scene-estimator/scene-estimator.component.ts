import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStoreActions } from '../app-store/app-store.actions';
import { CreativeRoomAsyncs } from '../creative-room/creative-room.asyncs';

import * as helpers from '../app.helpers';
import { ERROR_MSG } from '../app.constants';

@Component({
    selector: 'sce-scene-estimator',
    templateUrl: './scene-estimator.component.html'
})
export class SceneEstimatorComponent implements OnInit {

    @ViewChild('audioNode')
    private audioNode: ElementRef;

    public estimationForm: FormGroup;
    public sceneDuration: number = null;
    public sceneDurationUnitName = 'minut';

    public loadingText = 'Długość przetwarzania zależy od długości trwania sceny. Prosimy o cierpliwość.';
    public commonTexts = new Map ([
        ['unlockSubmit', 'Przycisk "Estymuj" uaktywni się gdy pola zostaną poprawnie wypełnione.'],
        ['startEstimation', 'Estymuj'],
        ['playRecord', 'Odtwórz nagranie'],
        ['pauseRecord', 'Zatrzymaj']
    ]);

    public sceneDurationTexts = new Map ([
        ['head', 'Twoja scena potrwa ok.'],
        ['tail', 'Długość sceny nie powinna przekraczać 5 minut, ale nie jest to żalazna zasada.'],
        ['conflict', 'Pamiętaj, że każda scena powinna posiadać konflikt lub przynajmniej jego wprowadzenie.'],
        ['goodLuck', 'Powodzenia!']
    ]);

    private waitingForResponse = false;
    public estimationDone = false;
    public estimationCanBePlayed = false;

    constructor(
        private appStoreActions: AppStoreActions,
        private creativeRoomAsyncs: CreativeRoomAsyncs,
        private formBuilder: FormBuilder
    ) {
        this.estimationForm = formBuilder.group({
            sceneText: [
                '',
                Validators.compose([Validators.required, Validators.minLength(1)]) // Validators.maxLength(5000)
                // maxLength needs to be verified!
            ]
        });
    }

    ngOnInit() {
    }

    public isFormValid(): boolean {
        return this.estimationForm.valid;
    }

    public isPlayerPlaying(): boolean {
        return this.audioNode.nativeElement.duration > 0 && !this.audioNode.nativeElement.paused;
    }

    public playRecord(): void {
        this.audioNode.nativeElement.play();
    }

    public pauseRecord(): void {
        this.audioNode.nativeElement.pause();
    }

    public resetEstimator(): void {
        this.waitingForResponse = false;
        this.estimationDone = false;
        this.estimationCanBePlayed = false;
        this.estimationForm.reset();

        if (this.isPlayerPlaying()) {
            this.pauseRecord();
        }
    }

    public submitEstimation(submitted): void {
        this.waitingForResponse = true;

        this.creativeRoomAsyncs.postTextToSpeech({ text: submitted.sceneText })
        .finally(() => this.waitingForResponse = false)
        .subscribe(
            (response) => {
                const snd = this.audioNode.nativeElement;

                snd.src = response;
                this.estimationDone = true;
                snd.addEventListener('loadeddata', () => {

                    if (snd.duration) {
                        this.sceneDuration = helpers.roundSecondsToMinutes(snd.duration);
                        this.estimationCanBePlayed = true;
                    }
                });
            },
            (err: Error) => {
                console.warn(err);
                this.appStoreActions.setErrorMessage(ERROR_MSG.get('tts'));
                this.appStoreActions.setShowError(true);
            }
        );
    }
}
