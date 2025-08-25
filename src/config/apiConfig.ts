const BASE_URL = `${process.env.URL}/api`;

const apiConfig = {
    baseUrl: BASE_URL,
    endpoints: {
        contactMe: {
            route: `${BASE_URL}/contact-me`,
            methods: ['POST']
        },
        aboutMe: {
            route: `${BASE_URL}/about-me`,
            methods: ['GET']
        },
        projects: {
            route: `${BASE_URL}/projects`,
            methods: ['GET'],
            homepage: {
                route: `${BASE_URL}/projects/homepage`,
                methods: ['GET']
            }
        },
        technologies: {
            route: `${BASE_URL}/technologies`,
            bySlug: {
                route: (slug: string) => `${BASE_URL}/technologies/${slug}`,
                methods: ['GET']
            }
        }
    }
}

export default apiConfig;