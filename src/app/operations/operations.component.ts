import { Component, OnInit } from '@angular/core';
import { OperationService } from '../operation.service'
import { AlertService } from '../alert.service'
import { Operation } from '../operation'
import { Alert } from '../alert'

@Component({
  moduleId: module.id,
  selector: 'app-operations',
  templateUrl: 'operations.component.html',
  styleUrls: ['operations.component.css']
})
export class OperationsComponent implements OnInit {

  operations: Array<Operation>;

  constructor(
    private operationService: OperationService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.operationService.operationChanged$.subscribe(
      operations => this.refreshList()
    );
    this.refreshList();
  }

  private refreshList() {
    this.operationService.getAll().subscribe(
      operations => this.operations = operations,
      error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la récupération des opérations'))
    );
  }

  /*deleteAccount(account: Account) {
    if (confirm('Souhaitez-vous vraiment supprimer ce compte bancaire ?')) {
      this.accountService.delete(account).subscribe(
        response => this.alertService.emit(new Alert('success', 'Le compte bancaire a bien été supprimé')),
        error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la suppression du compte bancaire'))
      );
    }
  }*/
}
