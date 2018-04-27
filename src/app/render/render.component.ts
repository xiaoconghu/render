import {
  AfterViewChecked,
  AfterViewInit, ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AlertComponent} from '../alert/alert.component';
import {CustomTemplateComponent} from '../custom-template/custom-template.component';

@Component({
  selector: 'app-exe-app',
  template: `
    <p>afjlajflajfljs</p>
    <ng-template #alertContainer></ng-template>
    <button (click)="createComponent('success')">Create success alert</button>
    <button (click)="createComponent('danger')">Create danger alert</button>
  `
})
export class RenderComponent implements OnDestroy, AfterViewInit, AfterViewChecked{
  @ViewChild('alertContainer', {read: ViewContainerRef}) container: ViewContainerRef;
  componentRef: ComponentRef<CustomTemplateComponent>;

  constructor(private resolver: ComponentFactoryResolver,
              private cdr: ChangeDetectorRef
  ) {}

  createComponent(template: string) {
    this.container.clear();
    this.cdr.detach(); // 停止检测
    const factory: ComponentFactory<CustomTemplateComponent> = this.resolver.resolveComponentFactory(CustomTemplateComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.text = template;
    // this.componentRef.instance.output.subscribe((msg: string) => console.log(msg));
    setTimeout(() => this.cdr.reattach()); // 待组件动态加载完之后重新 attach

  }

  ngOnDestroy(): void {
    this.componentRef.destroy();
  }

  ngAfterViewInit(): void {
    // jit 模式
    // 点击的为aot 模式
    this.createComponent(
      `
  <p>nihaoafh</p>
  <div style="background: red">jafljalfj</div>

`
    );
  }

  ngAfterViewChecked(): void {
  }
}
