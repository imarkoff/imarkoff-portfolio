const BASE_URL = '/api';

const apiConfig = {
    baseUrl: BASE_URL,
    endpoints: {
        contactMe: {
            route: `${BASE_URL}/contact-me`,
            methods: ['POST']
        }
    }
}

export default apiConfig;