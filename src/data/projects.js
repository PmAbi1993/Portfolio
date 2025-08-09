export const projects = [
    {
        slug: 'ocbc-uob-banking',
        name: 'OCBC/UOB Banking App (Consultant)',
        summary: 'Principal consultant delivering regulatory features and critical defect fixes for Singapore banking apps with strong architecture and performance focus.',
        year: '2023–2025',
        tech: ['Swift', 'SwiftUI', 'VIP', 'Async/Await', 'Combine', 'Secure Coding'],
        highlights: [
            'Resolved 5 critical defects in the first release cycle, achieving compliance and earning commendations.',
            'Delivered 2 government‑mandated features ahead of deadline, avoiding projected fines.',
            'Championed async/await and VIP, cutting feature lead‑time by ~20% and improving onboarding.',
            'Collaborated across product and platform teams to unblock interdependent work items.'
        ],
    },
    {
        slug: 'usbank-mobile',
        name: 'USBank Mobile App',
        summary: 'Large‑scale mobile banking app modernization with clean architecture, testing, and performance improvements.',
        year: '2021–2023',
        tech: [
            'Swift',
            'UIKit',
            'MVVM‑C',
            'GraphQL (Apollo)',
            'TDD',
            'DiffableDataSource',
            'Compositional Layout',
            'Accessibility'
        ],
        highlights: [
            'Re‑architected core modules under TDD; increased code coverage to ~95% and reduced escaped defects by ~40%.',
            'Introduced DiffableDataSource & Compositional Layouts; trimmed view code by ~30% and improved UI performance on legacy devices.',
            'Migrated legacy REST calls to GraphQL (Apollo) via Repository pattern; improved decoupling and testability.',
            'Upgraded accessibility (WCAG 2.2) enabling comprehensive UI test coverage.',
            'Supported A/B test campaigns that raised sign‑up conversion by ~8%.'
        ],
    },
    {
        slug: 'reachout-platform',
        name: 'ReachOut – Field Service Platform',
        summary: 'Company product revamp with strong architecture, reusable modules, and server‑driven UI.',
        year: '2018–2021',
        tech: ['Swift', 'UIKit', 'MVVM‑C', 'CoreData', 'Networking', 'Design Systems'],
        highlights: [
            'Designed architecture, patterns, and abstractions for an on‑time product revamp under tight schedules.',
            'Built server‑driven polymorphic list/grid cells; reduced subsequent feature code by ~35% and enabled remote configuration of UI.',
            'Created reusable networking, persistence, and navigation components used across projects.',
            'Implemented an efficient image pipeline (prefetching, caching, dynamic resizing) cutting bandwidth by ~50% and raising scroll FPS from ~48 to 60.',
        ],
    },
    {
        slug: 'srv-canada-vrs',
        name: 'SRV Canada VRS – Video Relay Service',
        summary: 'Accessibility‑focused communication app work with performance and reliability improvements.',
        year: '2019–2021',
        tech: ['Swift', 'UIKit', 'Push Notifications', 'CoreData', 'OAuth2.0', 'Accessibility'],
        highlights: [
            'Implemented reusable modules and abstractions shared across multiple company projects.',
            'Optimized image loading and caching paths; delivered smoother UI and lower data usage.',
            'Strengthened accessibility and reliability for communication flows.'
        ],
    },
    {
        slug: 'connected-car-iot',
        name: 'Connected‑Car IoT Telemetry',
        summary: 'Real‑time chart visualization module enabling live telemetry and analytics for connected vehicles.',
        year: '2020',
        tech: ['Swift', 'UIKit', 'Charts', 'Combine', 'Networking'],
        highlights: [
            'Designed and delivered chart‑visualization for live telemetry; enabled real‑time insights for ~5k vehicles.',
            'Improved scrolling performance and responsiveness for data‑heavy screens.'
        ],
    },
    {
        slug: 'cryptocom-client',
        name: 'CryptoCom – Client App',
        summary: 'Improved performance, battery usage, and end‑to‑end security in a crypto client app.',
        year: '2017–2018',
        tech: ['Swift', 'CoreData', 'OpenPGP', 'Security', 'SSL Pinning', 'Caching'],
        highlights: [
            'Optimized data prefetching and caching; reduced battery drain by ~18% on older devices.',
            'Hardened security with SSL pinning, data obfuscation, and E2E encryption using OpenPGP; passed GDPR reviews.',
            'Built an offline CoreData message layer guaranteeing 100% delivery once connectivity resumed.',
            'Standardized API error codes with Android/backend; reduced cross‑platform defects by ~30%.'
        ],
    },
    {
        slug: 'bugme',
        name: 'BugMe – UI Debug Tool',
        summary: 'Internal tool to inspect iOS/macOS UIs via Swift Mirror and runtime introspection.',
        year: '2020',
        tech: ['Swift', 'SwiftUI', 'macOS', 'iOS'],
        highlights: [
            'Rapidly inspect view hierarchies and properties during testing.',
            'Reduced manual QA time by surfacing layout and state issues early.'
        ],
    },
    {
        slug: 'exnetworklayer',
        name: 'EXNetworkLayer – Modular Networking SPM',
        summary: 'Reusable Swift Package for REST API calls with clean layering and testability.',
        year: '2019–2021',
        tech: ['Swift', 'SPM', 'REST', 'URLSession', 'Testing'],
        highlights: [
            'Abstracted networking concerns into a package shared across apps.',
            'Improved test coverage and enabled safer refactoring of API integrations.'
        ],
    },
];
