import { Component, OnInit } from '@angular/core';
import { DialogService } from './../../dialog.service';

import { Contato } from './../model/contato.model';
import { ContatoService } from './../service/contato.service';

@Component({
	moduleId: module.id,
	selector: 'contatos-lista',
	templateUrl: './../view/contatos-lista.comp.view.html'
})
export class ContatosListaComponent implements OnInit {

	contatos: Contato[] = [];
	mensagem: {};
	classesCss: {};
	private currentTimeout: any;


	constructor(private contatoService: ContatoService,
				private dialogService: DialogService) {}

	onDelete(contato: Contato): void{
		this.dialogService.confirm("Deseja realmente excluir o contato: "+ contato.nome + " ?")
		
		.then((canDelete: boolean) => {
			
			if(canDelete){
				this.contatoService
				.delete(contato)
				.then(() => {

					this.contatos = this.contatos.filter((c: Contato) => c.id != contato.id);
					this.mostrarMensagem({
						tipo:'success',
						texto: 'Contato Excluido'
					})

				})
				.catch((err => {
					this.mostrarMensagem({
						tipo:'danger',
						texto: 'Ocorreu um erro ao excluir'
					})
				}));
			}
		});
	}

	ngOnInit(): void {
		this.contatoService.getContatos()
			.then((contatos: [Contato]) => {
				this.contatos = contatos;
			})
			.catch(err => {
				this.mostrarMensagem({
						tipo:'danger',
						texto: 'Erro ao carregar a lista de contatos'
					})
			});
	}

	private mostrarMensagem(mensagem: {tipo: string, texto: string}): void{
		
		this.mensagem = mensagem;
		this.montarClasses(mensagem.tipo);
		
		if(mensagem.tipo != 'danger'){


			if(this.currentTimeout){
				clearTimeout(this.currentTimeout);
			}

			this.currentTimeout = setTimeout(() => {
				mensagem = undefined;
			}, 3000);
		}
	}

	private montarClasses(tipo: string): void {
		
		this.classesCss = {
			'alert' : true
		}

		this.classesCss['alert-'+tipo] = true;


	}
}