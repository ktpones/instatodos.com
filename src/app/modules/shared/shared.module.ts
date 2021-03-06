import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QuilljsModule } from 'ngx-quilljs';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AppService } from '../../services';
import { FooterComponent } from '../shared/section/footer/footer.component';
import { FileUploadComponent } from '../shared/file-upload/file-upload.component';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { GoalDialogComponent } from '../goal/goal-dialog/goal-dialog.component';
import {TodoProjectListComponent} from '../todo/todo-project-list/todo-project-list.component';
import { MultilingualComponent } from '../../components/multilingual/multilingual.component';
import { MaterialModule  } from '../material/material.module';

@NgModule({
  declarations: [
    TodoProjectListComponent,
    InfiniteScrollComponent,
    GoalDialogComponent,
    FileUploadComponent,
    FooterComponent,
    MultilingualComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    QuilljsModule,
    LazyLoadImageModule,
    MaterialModule,
  ],
  exports: [
    TodoProjectListComponent,
    InfiniteScrollComponent,
    GoalDialogComponent,
    TranslateModule,
    FileUploadComponent,
    FooterComponent,
    LazyLoadImageModule,
    MultilingualComponent,
    MaterialModule,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [ AppService ]
    };
  }
}
