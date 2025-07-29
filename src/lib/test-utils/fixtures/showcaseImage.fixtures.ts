import ShowcaseImage from "@/lib/models/ShowcaseImage";

export const showcaseImageFixture: ShowcaseImage = {
    id: "showcase-image-1",
    src: "https://example.com/image1.jpg",
    alt: "Example Showcase Image 1",
    width: 800,
    height: 600,
    columnIndex: 0,
    orderIndex: 0,
};

export const showcaseImageMatrixFixture: ShowcaseImage[][] = [
    [
        showcaseImageFixture,
        {
            ...showcaseImageFixture,
            id: "showcase-image-2",
            src: "https://example.com/image2.jpg",
            alt: "Example Showcase Image 2",
            columnIndex: 0,
            orderIndex: 1,
        }
    ],
    [
        {
            ...showcaseImageFixture,
            id: "showcase-image-3",
            src: "https://example.com/image3.jpg",
            alt: "Example Showcase Image 3",
            columnIndex: 1,
            orderIndex: 0,
        },
        {
            ...showcaseImageFixture,
            id: "showcase-image-4",
            src: "https://example.com/image4.jpg",
            alt: "Example Showcase Image 4",
            columnIndex: 1,
            orderIndex: 1,
        }
    ]
];

export const showcaseImageFixtures: ShowcaseImage[] = [
    showcaseImageFixture,
    {
        ...showcaseImageFixture,
        id: "showcase-image-2",
        src: "https://example.com/image2.jpg",
        alt: "Example Showcase Image 2",
        columnIndex: 0,
        orderIndex: 1,
    },
    {
        ...showcaseImageFixture,
        id: "showcase-image-3",
        src: "https://example.com/image3.jpg",
        alt: "Example Showcase Image 3",
        columnIndex: 1,
        orderIndex: 0,
    },
    {
        ...showcaseImageFixture,
        id: "showcase-image-4",
        src: "https://example.com/image4.jpg",
        alt: "Example Showcase Image 4",
        columnIndex: 1,
        orderIndex: 1,
    }
];