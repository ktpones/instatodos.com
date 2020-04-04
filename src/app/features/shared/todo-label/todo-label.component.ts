import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MDCDialog } from '@material/dialog';
import { TodoService } from '../../../service/todo/todo.service';
import { TodoType, TodoLabelType, TodoConditions, OperationEnumType } from '../../../models/todo.model';


@Component({
  selector: 'app-todo-label',
  templateUrl: './todo-label.component.html',
  styleUrls: ['./todo-label.component.scss']
})
export class TodoLabelComponent implements OnInit, AfterViewInit {

  @Input()
  todo: TodoType;
  @Input()
  conditions: TodoConditions = null;

  @Output()
  isOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  formObj: FormGroup;
  labels: TodoLabelType[];
  dialog: MDCDialog;
  operationType: OperationEnumType = 'ADD';

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.formObj = this.fb.group(
      {
        name: ['', [Validators.required] ],
        _id: [''],
        operationType: [this.operationType]
      }
    );
    this.getLabels();
  }

  ngAfterViewInit() {
    this.dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
    this.dialog.open();
    this.dialog.listen('MDCDialog:closing', () => {
      this.isOpen.emit(false);
    });
  }

  getLabels() {
    this.todoService
      .listTodoLabels()
      .subscribe(response => {
        this.labels = response;
      });
  }

  editLabel(label: TodoLabelType ) {
    this.operationType = 'UPDATE';
    this.formObj.patchValue({
      _id: label._id,
      name: label.name,
      operationType: 'UPDATE'
    });
  }

  deleteLabel(label: TodoLabelType) {
    this.operationType = 'DELETE';
    this.todoOperationExec({
      _id: label._id,
      operationType: 'DELETE'
    });
  }

  submit() {
    if (this.formObj.valid) {
      const postBody = this.formObj.value;
      this.todoOperationExec(postBody);
    }
  }

  todoOperationExec(postBody) {
    this.todoService
      .todoLabelOperation(postBody)
      .subscribe(() => {
        this.formObj.reset();
        this.operationType = 'ADD';
      });
  }

}