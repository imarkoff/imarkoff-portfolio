const routeConfig = {
    projects: {
        path: '/projects',
        children: {
            projectBySlug: {
                path: (slug: string) => `/projects/${slug}`,
            }
        }
    }
}

export default routeConfig;