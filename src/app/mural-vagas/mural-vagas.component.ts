import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vaga } from '../models/Vagas.model';
import { VagasService } from '../vagas.service';

@Component({
  selector: 'app-mural-vagas',
  templateUrl: './mural-vagas.component.html',
  styleUrls: ['./mural-vagas.component.scss'],
})
export class MuralVagasComponent implements OnInit {
  public vagas: Vaga[] = [];
  public vaga: Vaga = new Vaga(0, '', '', '', 0);

  constructor(private _vagasService: VagasService, private router: Router) {}

  ngOnInit(): void {
    this.listarVagas();
  }

  listarVagas() {
    this._vagasService.getVagas().subscribe((retornaVaga) => {
      this.vagas = retornaVaga.map((item) => {
        return new Vaga(
          item.id,
          item.nome,
          item.foto,
          item.descricao,
          item.salario
        );
      });
    });
  }

  excluir(id: number) {
    this._vagasService.removerVaga(id).subscribe(
      (vaga) => {
        this.vaga = new Vaga(0, '', '', '', 0);
      },
      (err) => {
        alert('erro ao atualizar :(');
      }
    );
    alert('Vaga excluída!');
    window.location.href = '/mural';
  }

  editar() {
    this.router.navigateByUrl('/painel');
  }
}
