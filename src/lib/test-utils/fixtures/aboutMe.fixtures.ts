import AboutMe from "@/lib/models/AboutMe";
import TechnologyCategory from "@/lib/models/types/TechnologyCategory";

const aboutMeFixture: AboutMe = {
    name: 'John',
    surname: 'Doe',
    fullDescription: 'Software Engineer',
    tagline: 'Passionate developer',
    technologiesCategories: [
        {
            categoryName: TechnologyCategory.Frontend,
            techs: ['react', 'vue', 'angular']
        },
        {
            categoryName: TechnologyCategory.Backend,
            techs: ['nodejs', 'python', 'java']
        },
        {
            categoryName: TechnologyCategory.Devops,
            techs: ['docker', 'kubernetes', 'aws']
        }
    ],
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
            username: 'https://github.com/johndoe',
        }
    ]
};

export default aboutMeFixture;