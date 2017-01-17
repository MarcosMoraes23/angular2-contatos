import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';


import { CONTATOS } from './../mock/contatos-mock';
import { Contato } from './../model/contato.model';
import { ServiceInterface } from './../../interfaces/service.interface';

@Injectable()
export class ContatoService implements ServiceInterface<Contato>{

    private contatosUrl: string = 'app/contatos';
    private headers: Headers = new Headers({'Content-Type': 'application/json'})

    constructor(private http: Http){}


    create(contato: Contato): Promise<Contato>{
        return this.http
                .post(this.contatosUrl, JSON.stringify(contato), { headers: this.headers })
                .toPromise()
                .then((response : Response) => response.json().data as Contato)
                .catch(this.handleError);
    }


    update(contato: Contato): Promise<Contato>{
        const url = `${this.contatosUrl}/${contato.id}`; // app/contatos/:id
        return this.http
                .put(url, JSON.stringify(contato), { headers: this.headers })
                .toPromise()
                .then(() => contato as Contato)
                .catch(this.handleError);
    }

    delete(contato: Contato): Promise<Contato>{
        const url = `${this.contatosUrl}/${contato.id}`; // app/contatos/:id
        return this.http
                .delete(url, { headers: this.headers })
                .toPromise()
                .then(() => contato as Contato)
                .catch(this.handleError);
    }


    findAll(): Promise<[Contato]>{
        return this.http.get(this.contatosUrl)
               .toPromise()
               .then(response => response.json().data as [Contato])
               .catch(this.handleError);
        //return Promise.resolve(CONTATOS);
    }


    find(id: number): Promise<Contato>{
        return this.findAll()
              .then((contatos: [Contato]) => contatos.find(contato => contato.id === id));
    }

    buscar(parametro: string): Observable<[Contato]>{
        return this.http
                .get(`${this.contatosUrl}/?nome=${parametro}`)
                .map((response: Response) => response.json().data as [Contato]);
    }

    private handleError(err: any): Promise<any>{
        return Promise.reject(err.message || err)
    }


    getContatosSlowly(): Promise<Contato[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 2000);
        })
        .then(() => {
            console.log('primeiro then');
            return 'Curso Angular 2 Plínio Naves';
        })
        .then((param: string) => {
            console.log('segundo then');
            console.log(param);

            return new Promise((resolve2, reject2) => {
                setTimeout(() => {
                    console.log('continuando depois de 4 segundos...');
                    resolve2();
                }, 4000);
            });
        })
        .then(() => {
            console.log('terceiro then');
            return this.findAll();
        });
}
}