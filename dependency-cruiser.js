module.exports = {
  forbidden: [
    // 1. DOMAIN: Must remain pure and independent of all outer layers
    {
      name: 'domain-isolation',
      comment:
        'Domain layer must not import app, features, presenters, services, repos, screens, or platform code.',
      severity: 'error',
      from: { path: '(^|/)domain/' },
      to: {
        path: '(^|/)(app|features|presenters|service|repo|screen|hooks|navigators|modules|platform|shared|ui-kit|composition)/',
      },
    },

    // 2. FLOW VIOLATION: Screen must only talk to Presenter (cannot bypass to Service or Repo)
    {
      name: 'screen-to-lower-layers',
      comment:
        'Screens must only depend on Presenters, UI-Kit, Hooks, or Shared components. No direct Service or Repo calls.',
      severity: 'error',
      from: { path: '(^|/)screen/' },
      to: {
        path: '(^|/)(service|repo|platform|modules)/',
      },
    },

    // 3. FLOW VIOLATION: Presenter must only talk to Service (cannot bypass to Repo or Platform)
    {
      name: 'presenter-to-repo',
      comment:
        'Presenters must only depend on Services or Domain logic. No direct Repo or Platform calls.',
      severity: 'error',
      from: { path: '(^|/)presenters?/' },
      to: {
        path: '(^|/)(repo|platform|modules)/',
      },
    },

    // 4. FLOW VIOLATION: Service must only talk to Repo or Platform (cannot talk to UI/Screens/Presenters)
    {
      name: 'service-to-presentation',
      comment:
        'Services contain business/orchestration logic and must not depend on Screens, Presenters, or UI-Kit.',
      severity: 'error',
      from: { path: '(^|/)service/' },
      to: {
        path: '(^|/)(screen|presenters?|ui-kit)/',
      },
    },

    // 5. FLOW VIOLATION: Repo must only talk to Modules (or internal DB wrappers)
    {
      name: 'repo-to-unauthorized',
      comment: 'Repo layer must only interact with modules or database wrappers.',
      severity: 'error',
      from: { path: '(^|/)repo/' },
      to: {
        path: '(^|/)(screen|presenters?|service|ui-kit)/',
      },
    },

    // 6. MODULES ISOLATION: Modules are low-level building blocks and should not depend on app workflows
    {
      name: 'modules-independence',
      comment: 'Modules must be self-contained and not depend on screens, presenters, or services.',
      severity: 'error',
      from: { path: '(^|/)modules/' },
      to: {
        path: '(^|/)(screen|presenters?|service|repo|app)/',
      },
    },
  ],
  options: {
    doNotFollow: {
      path: ['node_modules', 'expo', 'react', 'react-native'],
    },
    tsPreCompilationDeps: true,
    parser: 'tsc',
    tsConfig: {
      fileName: 'tsconfig.json',
    },
  },
};
