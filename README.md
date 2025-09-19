# React-Angular Fusion

**Seamless interoperability between React and Angular**

## Packages

- [`@react-angular-fusion/core`](./packages/core/) - Shared utilities
- [`@react-angular-fusion/angular`](./packages/angular/) - Angular integration  
- [`@react-angular-fusion/react`](./packages/react/) - React integration

## Quick Start

### **Bridge Two Worlds** 
React-Angular Fusion is a powerful interoperability layer that allows you to seamlessly use **React components in Angular applications** and **Angular components in React applications**. Break down framework barriers and build hybrid applications with the best of both worlds!

### **Key Capabilities**
- ** Embed React components in Angular apps**
- ** Use Angular components in React apps**  
- ** Pass data and props between frameworks**
- ** Handle events across framework boundaries**
- ** Share state and services seamlessly**
- ** Full TypeScript support with type safety**

# How It Works
# Architecture Overview
graph LR
    A[Angular App] --> B[ReactWrapper]
    B --> C[React Components]
    D[React App] --> E[AngularWrapper]
    E --> F[Angular Components]
    G[Core Library] --> B
    G --> E

# Core Components
# 1. ReactWrapper (for Angular)
    // Angular component hosting React component
    <react-wrapper 
        [component]="reactComponent" 
        [props]="reactProps"
        (event)="handleReactEvent($event)">
    </react-wrapper>    

# 2. AngularWrapper (for React)
    // React component hosting Angular component
    <AngularWrapper
    angularComponent={AngularButton}
    inputs={{ label: 'Click me' }}
    outputs={{ onClick: handleClick }}
    />

# 3. Shared Utilities
    // Global event bus for cross-framework communication
    globalEventBus.emit('data-updated', data);
    globalEventBus.on('data-updated', (data) => {});

    // Shared context for state management
    globalSharedContext.set('user', userData);
    globalSharedContext.get('user');

###  **How to Use**
### ** Installation **
# For Angular applications
- npm install
- npm install @react-angular-fusion/angular
- npm install react react-dom

# For React applications  
- npm install @react-angular-fusion/react
- npm install @angular/core @angular/common

# Core utilities (shared)
- npm install @react-angular-fusion/core

## Basic Usage**
## Angular → React Integration
// Angular component using React component
import { ReactWrapper } from '@react-angular-fusion/angular';
import { ReactCounter } from './react-components';

@Component({
  template: `
    <h2>Angular Hosting React</h2>
    <react-wrapper 
      [component]="reactCounter" 
      [props]="counterProps">
    </react-wrapper>
  `,
  imports: [ReactWrapper]
})
export class AngularHost {
  reactCounter = ReactCounter;
  counterProps = {
    count: 0,
    onIncrement: () => this.increment()
  };
}

## React → Angular Integration
    // React component using Angular component
    import { AngularWrapper } from '@react-angular-fusion/react';
    import { AngularButton } from './angular-components';

    function ReactHost() {
    return (
        <div>
        <h2>React Hosting Angular</h2>
        <AngularWrapper
            angularComponent={AngularButton}
            inputs={{ label: 'From React!', style: 'primary' }}
            outputs={{ onClick: () => console.log('Angular button clicked!') }}
        />
        </div>
    );
    }

## Benefits & Value Proposition**
## For Enterprises 
    - Incremental Migration: Modernize legacy Angular apps with React components gradually
    - Framework Flexibility: Teams can choose the right tool for each feature
    - Risk Reduction: No need for risky "big bang" rewrites
    - Cost Effective: Reuse existing components across frameworks
## For Developers
    - Productivity: Use familiar frameworks without context switching
    - Maintenance: Easier to maintain mixed codebases
    - UI Consistency: Share design systems across frameworks
    - Performance: Optimized rendering with minimal overhead
## For Projects 
    - Future Proofing: Not locked into a single framework
    - Micro-Frontend Ready: Perfect for micro-frontend architecture
    - Ecosystem Access: Use React and Angular libraries together
    - Learning Curve: Gentle onboarding for developers knowing either framework

## Real-World Use Cases
# 1. Legacy Modernization
// Gradually replace Angular components with React
<react-wrapper 
  [component]="NewReactFeature" 
  [props]="{legacyData: angularData}">
</react-wrapper>

# 2. Team Collaboration
// React team and Angular team work together
<react-wrapper 
  [component]="ReactTeamComponent" 
  [props]="{data: angularTeamData}">
</react-wrapper>

# 3. UI Component Libraries
// Build universal component library
<react-wrapper 
  [component]="SharedDesignSystemComponent" 
  [props]="designProps">
</react-wrapper>

# 4. Technology Evaluation
// Try React features in Angular app before committing
<react-wrapper 
  [component]="ExperimentalReactFeature" 
  [props]="testProps">
</react-wrapper>

#### Performance & Optimization ####

    # Efficient Rendering 
    - Smart Change Detection: Minimal re-renders with optimized change detection
    - Memory Efficient: Proper cleanup and garbage collection
    - Bundle Optimization: Tree-shakable and minimal footprint
#### Production Ready ####
    // Development double-rendering disappears in production
    - ng build --configuration production
    // → Single render, optimized performance

#### Type Safety & Reliability ####
- Full TypeScript Support
  // Complete type safety across frameworks
interface UserData {
  id: number;
  name: string;
  email: string;
}

// Type-safe event emission
globalEventBus.emit('user-updated', userData); // Compile-time validation

// Type-safe props passing
<react-wrapper [props]="userProps"> // Type checking   

#### Browser Support ####
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers

## Comparison with Alternatives

### Bi-directional Integration
- **React-Angular Fusion**: Full bidirectional support (React in Angular + Angular in React)
- **Other Solutions**: Usually limited to one direction only

### Type Safety  
- **React-Angular Fusion**: Complete TypeScript support with generics
- **Other Solutions**: Partial type safety with limitations

### Performance
- **React-Angular Fusion**: Optimized rendering with minimal overhead
- **Other Solutions**: Significant performance impact

### Ease of Use
- **React-Angular Fusion**: Simple API, easy to integrate
- **Other Solutions**: Complex configuration required

### Production Ready
- **React-Angular Fusion**: Battle-tested and production ready
- **Other Solutions**: Often experimental or unstable

###### Getting Started  ######
# 1. Create New Project
    // Angular app with React integration
    ng new my-app --standalone
    cd my-app
    npm install @react-angular-fusion/angular react react-dom

# 2. Add React Component
    // Create React component
    export const ReactHello = ({ name }) => {
    return React.createElement('h1', null, `Hello ${name}!`);
    };    

# 3. Use in Angular
    // Use in Angular component
    @Component({
    template: `
        <react-wrapper 
        [component]="reactComponent" 
        [props]="{name: 'World'}">
        </react-wrapper>
    `,
    imports: [ReactWrapper]
    })
    export class AppComponent {
    reactComponent = ReactHello;
    }    

# 4. Run and Enjoy!
ng serve
# → React component rendering in Angular!

## Why Choose React-Angular Fusion?
    The Ultimate Solution For:
    Enterprises with large Angular codebases wanting to adopt React
    Teams with mixed React/Angular expertise
    Projects needing gradual technology migration
    Developers who want framework flexibility

## You Should Use This If:
    You have an Angular app but want to use React components
    You have a React app but need to reuse Angular components
    You're planning a gradual framework migration
    You want to leverage both ecosystems simultaneously

## Support & Community
    Full Documentation
    Discussions & Questions
    Report Issues
    Contribution Guide    

## License
    MIT Licensed - Feel free to use in commercial projects!   

## Break the Framework Barriers - Build Without Limits!
    Designed by Kamlesh Kumar - Breaking Boundaries Since Day One    
