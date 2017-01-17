import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

import { Contato } from './../model/contato.model'
import { ContatoService } from './../service/contato.service';

@Component({
	moduleId: module.id,
	selector: 'contato-busca',
	templateUrl: './../view/contato-busca.comp.view.html'
})
export class ContatoBuscaComponent implements OnInit, OnChanges {
	
	@Input()
	busca: string;

	@Output()
	buscaChange: EventEmitter<string> = new EventEmitter<string>();

	contatos: Observable<Contato[]>;

	private termosBusca: Subject<string> = new Subject<string>();

	constructor(private contatoService: ContatoService, 
				private router :Router) {}

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

	ngOnChanges(changes: SimpleChanges): void{
		let busca: SimpleChange = changes['busca'];
		this.buscar(busca.currentValue);
	}

	buscar(parametro: string): void {
		this.termosBusca.next(parametro);
		this.buscaChange.emit(parametro);
	}


	verDetalhe(contato: Contato): void{
		let link = ['contato/save', contato.id];
		this.router.navigate(link);
		this.buscaChange.emit('');
	}
}