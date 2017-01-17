import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { ContatoBuscaComponent } from './component/contato-busca.component';
import { ContatoDetalheComponent } from './component/contato-detalhe.component';
import { ContatosListaComponent } from './component/contatos-lista.component';
import { ContatoRoutingModule } from './route/contato-routing.module';
import { ContatoService } from './service/contato.service';

@NgModule({
	imports: [
		CommonModule,
		ContatoRoutingModule,
		FormsModule
	],
	declarations:[
		ContatoBuscaComponent,
		ContatosListaComponent,
		ContatoDetalheComponent
	],
	exports: [
		ContatoBuscaComponent,
		ContatosListaComponent
	],
	providers:[
		ContatoService
	]
})
export class ContatosModule {}