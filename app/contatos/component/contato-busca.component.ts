import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Contato } from './../model/contato.model'
import { ContatoService } from './../service/contato.service';

@Component({
	moduleId: module.id,
	selector: 'contato-busca',
	templateUrl: './../view/contato-busca.comp.view.html'
})
export class ContatoBuscaComponent implements OnInit {
	
	contatos: Observable<Contato[]>;

	private termosBusca: Subject<string> = new Subject<string>();

	constructor(private contatoService: ContatoService) {}

	ngOnInit(): void {
		this.contatos = this.termosBusca
			.debounceTime(500) // aguarde por 300 milisegundos para emitir novos eventos
			.distinctUntilChanged() // ignora se o próximo termo de busca for igual ao do anterior
			.switchMap(termo => termo ? this.contatoService.buscar(termo) : Observable.of<Contato[]>([]))
			.catch(err => {
				console.log(err);
				return Observable.of<Contato[]>([]);
			});
	}

	buscar(parametro: string): void {
		this.termosBusca.next(parametro);
	}
}