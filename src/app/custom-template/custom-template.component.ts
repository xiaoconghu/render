import {
  Component, OnInit, Input, NgModule, NgModuleFactory, Compiler
} from '@angular/core';

interface Bindings {
  [key: string]: any;
}

@Component({
  selector: 'app-custom-template',
  template: `
    <ng-container *ngComponentOutlet="dynamicComponent;
                            ngModuleFactory: dynamicModule;"></ng-container>`,
  styleUrls: ['./custom-template.component.css']
})
export class CustomTemplateComponent implements OnInit {
  dynamicComponent;
  dynamicModule: NgModuleFactory<any>;

  @Input()
  text: string;
  @Input()
  public bindings: Bindings = {};

  constructor(private compiler: Compiler) {
  }

  ngOnInit() {
    this.dynamicComponent = this.createNewComponent(this.text, this.bindings);
    this.dynamicModule = this.compiler.compileModuleSync(this.createComponentModule(this.dynamicComponent));
  }

  protected createComponentModule(componentType: any) {
    @NgModule({
      imports: [],
      declarations: [
        componentType
      ],
      entryComponents: [componentType]
    })
    class RuntimeComponentModule {
    }

    // a module for just this Type
    return RuntimeComponentModule;
  }

  protected createNewComponent(text: string, bindings: Bindings) {
    const template = `dynamically created template with text: ${text}`;

    @Component({
      selector: 'app-dynamic-component',
      template: text
    })
    class DynamicComponent implements OnInit {
      text: any;
      public bindings: Bindings;

      ngOnInit() {
        this.text = text;
        this.bindings = bindings;
      }
    }

    return DynamicComponent;
  }
}
