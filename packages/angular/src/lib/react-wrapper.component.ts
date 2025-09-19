import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  AfterViewInit,
  NgZone,
  ApplicationRef,
  ChangeDetectorRef,
  inject
} from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { globalEventBus, globalSharedContext } from '../../../core/src';

/**
 * Angular component that wraps and renders React components
 * Compatible with Angular 19 and React 18
 * 
 * @example
 * // Angular TypeScript usage
 * @Component({
 *   template: `
 *     <react-wrapper 
 *       [component]="reactComponent" 
 *       [props]="reactProps"
 *       (event)="handleReactEvent($event)">
 *     </react-wrapper>
 *   `
 * })
 * class MyComponent {
 *   reactComponent = MyReactComponent;
 *   reactProps = { message: 'Hello from Angular' };
 * 
 *   handleReactEvent(event: any) {
 *     console.log('React event:', event);
 *   }
 * }
 * 
 * @example
 * // Angular JavaScript usage
 * angular.module('app').component('myComponent', {
 *   template: `
 *     <react-wrapper 
 *       [component]="$ctrl.reactComponent" 
 *       [props]="$ctrl.reactProps"
 *       (event)="$ctrl.handleReactEvent($event)">
 *     </react-wrapper>
 *   `,
 *   controller: function() {
 *     this.reactComponent = MyReactComponent;
 *     this.reactProps = { message: 'Hello from Angular' };
 *     
 *     this.handleReactEvent = function(event) {
 *       console.log('React event:', event);
 *     };
 *   }
 * });
 */
@Component({
  selector: 'react-wrapper',
  template: '<div #container></div>',
  standalone: true
})
export class ReactWrapperComponent implements OnChanges, AfterViewInit, OnDestroy {
  /** The React component class to render */
  @Input() component!: React.ComponentType<any>;
  
  /** Props to pass to the React component */
  @Input() props: Record<string, any> = {};
  
  /** Event emitter for React component events */
  @Output() event = new EventEmitter<any>();
  
  private root: ReactDOM.Root | null = null;
  private isDestroyed = false;
  private containerRef = inject(ElementRef);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    this.renderReactComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.root && (changes['component'] || changes['props'])) {
      this.renderReactComponent();
    }
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    this.unmountReactComponent();
  }

  private renderReactComponent(): void {
    if (!this.component || this.isDestroyed) return;

    // Run outside Angular zone to prevent unnecessary change detection
    this.ngZone.runOutsideAngular(() => {
      const container = this.containerRef.nativeElement.querySelector('div');
      
      if (!container) {
        console.warn('React wrapper container not found');
        return;
      }

      if (!this.root) {
        try {
          this.root = ReactDOM.createRoot(container);
        } catch (error) {
          console.error('Error creating React root:', error);
          return;
        }
      }

      // Prepare props with event emitter and global utilities
      const propsWithEvents = { 
        ...this.props,
        emit: (eventName: string, data: any) => {
          // Run back inside Angular zone to trigger change detection
          this.ngZone.run(() => {
            this.event.emit({ name: eventName, data });
            this.cdr.markForCheck();
          });
        },
        globalEventBus,
        globalSharedContext
      };

      try {
        // Create React element and render
        const reactElement = React.createElement(this.component, propsWithEvents);
        this.root.render(reactElement);
      } catch (error) {
        console.error('Error rendering React component:', error);
      }
    });
  }

  private unmountReactComponent(): void {
    if (this.root) {
      this.ngZone.runOutsideAngular(() => {
        try {
          setTimeout(() => {
            if (this.root && !this.isDestroyed) {
              this.root.unmount();
              this.root = null;
            }
          }, 0);
        } catch (error) {
          console.error('Error unmounting React root:', error);
        }
      });
    }
  }
}

import { NgModule } from '@angular/core';

@NgModule({
  imports: [ReactWrapperComponent],
  exports: [ReactWrapperComponent]
})
export class ReactWrapperModule { }

export { ReactWrapperComponent as ReactWrapper };
export default ReactWrapperComponent;