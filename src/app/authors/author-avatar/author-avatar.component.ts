import { Component, Input } from '@angular/core';

@Component({
    selector: 'sce-author-avatar',
    templateUrl: './author-avatar.component.html'
})
export class AuthorAvatarComponent {

    @Input('name') public name = '';
    @Input('imagePath') public imagePath = '';
    @Input('description') public description = '';

}
