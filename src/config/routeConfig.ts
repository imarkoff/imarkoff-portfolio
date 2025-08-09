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

export type RouteConfig = typeof routeConfig;

export default routeConfig;