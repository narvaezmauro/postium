import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Post } from "../../models/post";
import { User } from 'app/models/user';
import { Router } from '@angular/router';

@Component({
    selector: "post-preview",
    templateUrl: "post-preview.component.html",
    styleUrls: ["post-preview.component.css"]
})
export class PostPreviewComponent {

    @Input() user: User;
    @Input() post: Post;

    constructor(
        private _router: Router
    ) { }

    /*------------------------------------------------------------------------------------------------------------------|
     | ~~~ Red Path ~~~                                                                                                 |
     |------------------------------------------------------------------------------------------------------------------|
     | Expón un atributo de salida con el decorador correspondiente. El tipo de dicho atributo debe permitir la emisión |
     | de eventos; la idea es enviar al componente padre el usuario sobre el cuál se ha hecho clic. Y puesto que dicho  |
     | clic se realiza en el template de este componente, necesitas, además, un manejador para el mismo.                |
     |------------------------------------------------------------------------------------------------------------------*/
   
    @Output() verAutor: EventEmitter<User> = new EventEmitter();

    abrirAutor(post: Post):void{
        this.verAutor.emit(post.author);
    }
   
    /*------------------------------------------------------------------------------------------------------------------|
     | ~~~ Green Path ~~~                                                                                               |
     |------------------------------------------------------------------------------------------------------------------|
     | Expón un atributo de salida con el decorador correspondiente. El tipo de dicho atributo debe permitir la emisión |
     | de eventos; la idea es enviar al componente padre el post sobre el cuál se ha hecho clic. Y puesto que dicho     |
     | clic se realiza en el template de este componente, necesitas, además, un manejador para el mismo.                |
     |------------------------------------------------------------------------------------------------------------------*/


    @Output() verPost: EventEmitter<Post> = new EventEmitter();

    abrirPost(post: Post): void{
        this.verPost.emit(post);
    }
    


    plainTextToHtml(text: string): string {
        return `<p>${text.replace(/\n/gi, "</p><p>")}</p>`;
    }

    /*--------------------------------------------------------------------------------------------------------------------|
     | ~~~ Broken White Path ~~~                                                                                          |
     |--------------------------------------------------------------------------------------------------------------------|
     | Tratamos el click para abrir el formulario de edición del post recibido. La ruta a navegar es '/posts/editar',     |
     | pasando como parámetro el identificador del post. Solo deberíamos poder editar nuestros posts.                     |
     |                                                                                                                    |
     |--------------------------------------------------------------------------------------------------------------------*/

     editarPost(post: Post): void{
        // console.log(post.id);
        if(post.author.id === User.defaultUser().id){
            this._router.navigate(['edit-post', post.id]);
        }
     }


     
}
