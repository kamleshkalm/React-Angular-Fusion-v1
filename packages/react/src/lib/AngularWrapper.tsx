import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  Component,
  Input,
  Output,
  EventEmitter,
  NgModule,
  Injector,
  ApplicationRef,
  ComponentFactoryResolver,
  createComponent,
  EnvironmentInjector,
  Type,
  ɵcreateInjector as createInjector
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { globalEventBus, globalSharedContext } from '../../../core/src';

// Simple Angular component for demonstration
@Component({
  selector: 'angular-wrapper-internal',
  template: `
    <div style="border: 2px solid blue; padding: 16px; margin: 16px; border-radius: 8px;">
      <h3 style="color: #1976d2; margin-top: 0;">Angular Component in React (v19)</h3>
      <p><strong>Message:</strong> {{ message }}</p>
      <p><strong>Count:</strong> {{ count }}</p>
      <p><strong>Active:</strong> {{ active ? 'Yes' : 'No' }}</p>
      
      <div style="display: flex; gap: 8px; margin-top: 16px;">
        <button (click)="increment()" style="padding: 8px 16px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Increment
        </button>
        <button (click)="emitCustomEvent()" style="padding: 8px 16px; background: #388e3c; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Emit Event
        </button>
        <button (click)="toggleActive()" style="padding: 8px 16px; background: #d32f2f; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Toggle Active
        </button>
      </div>
      
      <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px;">
        <p><strong>Global Context Data:</strong></p>
        <pre style="font-size: 12px; overflow: auto;">{{ globalData | json }}</pre>
      </div>
    </div>
  `,
  standalone: true
})
export class AngularWrapperInternal {
  @Input() message: string = '';
  @Input() count: number = 0;
  @Input() active: boolean = false;
  @Output() countChange = new EventEmitter<number>();
  @Output() customEvent = new EventEmitter<any>();
  @Output() activeChange = new EventEmitter<boolean>();

  globalData: any = {};

  constructor() {
    // Subscribe to global context changes
    globalSharedContext.watch('angularData', (data: any) => {
      this.globalData = data;
    });
  }

  ngOnInit() {
    // Load initial global data
    this.globalData = globalSharedContext.get('angularData') || {};
  }

  increment() {
    this.count++;
    this.countChange.emit(this.count);
    globalEventBus.emit('countIncremented', { count: this.count, source: 'angular' });
  }

  emitCustomEvent() {
    const eventData = { 
      message: 'Hello from Angular 19!', 
      timestamp: Date.now(),
      count: this.count
    };
    this.customEvent.emit(eventData);
    globalEventBus.emit('customEventEmitted', eventData);
  }

  toggleActive() {
    this.active = !this.active;
    this.activeChange.emit(this.active);
    globalEventBus.emit('activeToggled', { active: this.active, source: 'angular' });
  }
}

/**
 * React component that wraps and renders Angular components
 * Compatible with React 18 and Angular 19
 */
export interface AngularWrapperProps {
  message?: string;
  count?: number;
  active?: boolean;
  onCountChange?: (count: number) => void;
  onCustomEvent?: (event: any) => void;
  onActiveChange?: (active: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const AngularWrapper: React.FC<AngularWrapperProps> = ({
  message = 'Default message from React 18',
  count = 0,
  active = false,
  onCountChange,
  onCustomEvent,
  onActiveChange,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [angularComponentRef, setAngularComponentRef] = useState<any>(null);
  const [platformRef, setPlatformRef] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Update Angular component when props change
  useEffect(() => {
    if (angularComponentRef && angularComponentRef.instance) {
      const instance = angularComponentRef.instance;
      instance.message = message;
      instance.count = count;
      instance.active = active;
      
      try {
        angularComponentRef.changeDetectorRef.detectChanges();
      } catch (err) {
        console.error('Error detecting changes in Angular component:', err);
      }
    }
  }, [message, count, active, angularComponentRef]);

  // Bootstrap Angular component
  useEffect(() => {
    if (!containerRef.current) return;

    const bootstrapAngular = async () => {
      try {
        setError(null);
        
        // Create platform if it doesn't exist
        let platform = platformRef;
        if (!platform) {
          platform = platformBrowserDynamic();
          setPlatformRef(platform);
        }

        // Bootstrap the platform and get the injector
        const moduleRef = await platform.bootstrapModule(BrowserModule);
        const injector = moduleRef.injector;
        
        // Create the Angular component
        const componentRef = createComponent(AngularWrapperInternal, {
          environmentInjector: injector,
          hostElement: containerRef.current!
        });

        // Set initial properties
        componentRef.instance.message = message;
        componentRef.instance.count = count;
        componentRef.instance.active = active;

        // Subscribe to output events
        if (onCountChange) {
          componentRef.instance.countChange.subscribe(onCountChange);
        }
        if (onCustomEvent) {
          componentRef.instance.customEvent.subscribe(onCustomEvent);
        }
        if (onActiveChange) {
          componentRef.instance.activeChange.subscribe(onActiveChange);
        }

        // Detect changes and store reference
        componentRef.changeDetectorRef.detectChanges();
        setAngularComponentRef(componentRef);

      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        setError(`Failed to bootstrap Angular component: ${errorMsg}`);
        console.error('Error bootstrapping Angular component:', err);
      }
    };

    bootstrapAngular();

    return () => {
      // Cleanup Angular component
      if (angularComponentRef) {
        try {
          angularComponentRef.destroy();
        } catch (err) {
          console.error('Error destroying Angular component:', err);
        }
      }
    };
  }, []);

  if (error) {
    return (
      <div style={{ border: '2px solid #f44336', padding: '16px', margin: '16px', borderRadius: '8px' }}>
        <h3 style={{ color: '#f44336', marginTop: 0 }}>Error Loading Angular Component</h3>
        <p>{error}</p>
        <button 
          onClick={() => setError(null)}
          style={{ padding: '8px 16px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return <div ref={containerRef} className={className} style={style} />;
};

// Default export for different import styles
export default AngularWrapper;