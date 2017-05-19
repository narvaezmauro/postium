import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from "../../models/post";
import { Category } from '../../models/category';
import { User } from 'app/models/user';

@Component({
    templateUrl: "post-details.component.html",
    styleUrls: ["post-details.component.css"]
})
export class PostDetailsComponent implements OnInit {

    post: Post;
    category: Category;

    constructor(
            private _activatedRoute: ActivatedRoute,
            private _router: Router
        ) { }

    ngOnInit(): void {
        this._activatedRoute.data.forEach((data: { post: Post}) => this.post = data.post);
        window.scrollTo(0, 0);
    }

    plainTextToHtml(text: string): string {
        return `<p>${text.replace(/\n/gi, "</p><p>")}</p>`;
    }

    /*---------------------------------------------------------------------------------------------------------------|
     | ~~~ Red Path ~~~                                                                                              |
     |---------------------------------------------------------------------------------------------------------------|
     | Añade un manejador que navegue a la dirección correspondiente a los posts del autor indicado. Recuerda que    |
     | para hacer esto necesitas inyectar como dependencia el Router de la app. La ruta a navegar es '/posts/users', |
     | pasando como parámetro el identificador del autor.                                                            |
     |---------------------------------------------------------------------------------------------------------------*/

     abrirColeccion(post: Post): void{
        //  console.log("coleccion",post.author.id);
         this._router.navigate(['posts/users', post.author.id]);
     }

    /*--------------------------------------------------------------------------------------------------------------------|
     | ~~~ Yellow Path ~~~                                                                                                |
     |--------------------------------------------------------------------------------------------------------------------|
     | Añade un manejador que navegue a la dirección correspondiente a los posts de la categoría indicada. Recuerda que   |
     | para hacer esto necesitas inyectar como dependencia el Router de la app. La ruta a navegar es '/posts/categories', |
     | pasando como parámetro el identificador de la categoría.                                                           |
     |--------------------------------------------------------------------------------------------------------------------*/


     desplegarCategoria(categories: Category): void{
         this._router.navigate(['posts/categories', categories.id])
     }

    /*--------------------------------------------------------------------------------------------------------------------|
     | ~~~ Broken White Path ~~~                                                                                          |
     |--------------------------------------------------------------------------------------------------------------------|
     | Tratamos el click para abrir el formulario de edición del post recibido. La ruta a navegar es '/posts/editar',     |
     | pasando como parámetro el identificador del post. Solo deberíamos poder editar nuestros posts.                     |
     |                                                                                                                    |
     |--------------------------------------------------------------------------------------------------------------------*/

     editarPost(post: Post): void{
        //  console.log(post.id);
        if(post.author.id === User.defaultUser().id){
            this._router.navigate(['edit-post', post.id]);
        }
     }
}
