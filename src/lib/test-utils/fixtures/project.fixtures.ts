import Project from "@/lib/models/Project";

const projectFixtures: Project[] = [
    {
        id: '1',
        name: 'Project 1',
        slug: 'project-1',
        order: 1,
        shortDescription: 'Short description 1',
        fullDescription: 'Full description 1',
        type: "FullStack",
        heroImage: "https://example.com/image1.jpg",
        coreTechs: ['React', 'Node.js'],
        shouldShowOnHomepage: true,
        keyFeatures: ['Feature 1', 'Feature 2'],
        fullTechStack: {
            frontend: ['React', 'Redux'],
            backend: ['Node.js', 'Express'],
            database: ['MongoDB'],
            devops: ['Docker', 'Kubernetes']
        },
        challenges: [
            { title: 'Challenge 1', description: 'Description of challenge 1' },
            { title: 'Challenge 2', description: 'Description of challenge 2' }
        ],
        screenshots: ['https://example.com/screenshot1.jpg', 'https://example.com/screenshot2.jpg'],
        liveDemoUrl: 'https://example.com/demo1',
        sourceCodeUrl: null,
    },
    {
        id: '2',
        name: 'Project 2',
        slug: 'project-2',
        order: 2,
        shortDescription: 'Short description 2',
        fullDescription: 'Full description 2',
        type: "Frontend",
        heroImage: "https://example.com/image2.jpg",
        coreTechs: ['Vue.js', 'Tailwind CSS'],
        shouldShowOnHomepage: false,
        keyFeatures: ['Feature A', 'Feature B'],
        fullTechStack: {
            frontend: ['Vue.js', 'Vuex'],
            backend: [],
            database: [],
            devops: []
        },
        challenges: [
            { title: 'Challenge A', description: 'Description of challenge A' }
        ],
        screenshots: ['https://example.com/screenshot3.jpg'],
        liveDemoUrl: null,
        sourceCodeUrl: 'https://example.com/source2',
    }
];

export default projectFixtures;