import AboutMe from "@/lib/models/AboutMe";

const aboutMeFixture: AboutMe = {
    name: 'John Doe',
    fullDescription: 'Software Engineer',
    tagline: 'Passionate developer',
    technologiesCategories: {
        frontend: ['JavaScript', 'React'],
    },
    byTheNumbers: [
        {
            iconName: 'star',
            label: 'Projects',
            value: 42,
            valueSuffix: null
        }
    ],
    contactEmail: 'johndoe@example.com',
    resumeUrl: 'https://example.com/resume.pdf',
    socialLinks: [
        {
            platform: 'GitHub',
            url: 'https://github.com/johndoe',
        }
    ]
};

export default aboutMeFixture;