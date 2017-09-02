import { Component } from '@angular/core';
import { STATIC_TEXTS } from './creative-room.constants';

@Component({
    selector: 'sce-creative-room',
    templateUrl: './creative-room.component.html'
})
export class CreativeRoomComponent {

    public staticTexts: Map<string, string> = STATIC_TEXTS;
    public sceneEstimatorVisible = false;

    public toggleSceneEstimator(): void {
        this.sceneEstimatorVisible = !this.sceneEstimatorVisible;
    }
}
