interface ProjectTypeMetadata {
    color?: 'blue' | 'green' | 'yellow' | 'red';
    label: string;
    description: string;
}

const projectTypeMetadata: Record<string, ProjectTypeMetadata> = {
    fullstack: {
        color: "blue",
        label: "Full-Stack",
        description: "Projects that involve both front-end and back-end development, showcasing a complete web application.",
    },
    opensource: {
        color: "green",
        label: "Open Source",
        description: "Projects that are open source, allowing others to contribute and learn from the codebase.",
    },
    frontend: {
        color: "green",
        label: "Front-End",
        description: "Projects focused on the client-side, involving user interface and user experience design.",
    },
    backend: {
        color: "yellow",
        label: "Back-End",
        description: "Projects that focus on server-side logic, database management, and API development.",
    },
    mobile: {
        color: "blue",
        label: "Mobile",
        description: "Projects designed for mobile platforms, including iOS and Android applications.",
    },
    desktop: {
        color: "blue",
        label: "Desktop",
        description: "Projects that run on desktop environments, providing a rich user experience.",
    },
    game: {
        color: "red",
        label: "Game",
        description: "Projects that involve game development, showcasing interactive and engaging experiences.",
    },
    other: {
        label: "Other",
        description: "Projects that do not fit into the other categories, showcasing unique or experimental work.",
    }
}

export default projectTypeMetadata;