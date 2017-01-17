import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Contato } from './contatos/model/contato.model';

export class InMemoryDataService implements InMemoryDbService{
	
	createDb(): {} {
		let contatos: [Contato] = [
			{id: 1, nome: 'Marcos Moraes', email: 'mm@gmail.com', telefone: '87878787'},
			{id: 2, nome: 'João Oliveira', email: 'João@gmail.com', telefone: '9999999'},
			{id: 3, nome: 'Patife Faria', email: 'Patife@gmail.com', telefone: '111111'},
			{id: 4, nome: 'Oliver Khan', email: 'Oliver@gmail.com', telefone: '888888888'},
			{id: 5, nome: 'Mongol Mongol', email: 'Mongol@gmail.com', telefone: '55555555555'},
			{id: 6, nome: 'Souza Souza', email: 'Souza@gmail.com', telefone: '0000000000'},
			{id: 7, nome: 'José José', email: 'José@gmail.com', telefone: '3333333333'}
		];

		return {contatos};
	}
}