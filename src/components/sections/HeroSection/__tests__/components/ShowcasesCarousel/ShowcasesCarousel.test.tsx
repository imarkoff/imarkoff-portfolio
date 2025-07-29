import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi , beforeEach} from 'vitest';
import '@testing-library/jest-dom/vitest';
import ShowcaseImage from "@/lib/models/ShowcaseImage";
import Image from "next/image";
import {showcaseImageFixture} from "@/lib/test-utils/fixtures/showcaseImage.fixtures";
import ShowcaseCarousel from "@/components/sections/HeroSection/components/ShowcaseCarousel/ShowcaseCarousel";
import useCarouselAppear
    from "@/components/sections/HeroSection/components/ShowcaseCarousel/hooks/useCarouselAppear";

vi.mock('@/components/ui/VerticalTicker/VerticalTicker', () => ({
    default: vi.fn(({ children, ...props }) => (
        <div data-testid="vertical-ticker" data-props={JSON.stringify(props)}>
            {children}
        </div>
    )),
}));

vi.mock('next/image', () => ({
    default: vi.fn((props) => <div {...props} data-testid="showcase-image" />),
}));

vi.mock('@/components/sections/HeroSection/components/ShowcaseCarousel/hooks/useCarouselAppear', () => ({
    default: vi.fn(() => ({ current: null })),
}));

const showcasesFixture: Array<ShowcaseImage[]> = [
    [
        showcaseImageFixture,
        {
            ...showcaseImageFixture,
            id: 'img2',
            columnIndex: 0,
            orderIndex: 1,
        },
    ],
    [
        {
            ...showcaseImageFixture,
            id: undefined,
            columnIndex: 1,
            orderIndex: 0,
        },
        {
            ...showcaseImageFixture,
            id: 'img4',
            columnIndex: 1,
            orderIndex: 1,
        },
    ],
];

describe('ShowcaseCarousel', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the correct number of columns and images', () => {
        render(<ShowcaseCarousel showcases={showcasesFixture} />);
        expect(screen.getAllByTestId('vertical-ticker')).toHaveLength(2);
        expect(screen.getAllByTestId('showcase-image')).toHaveLength(4);
    });

    it('passes the correct props to VerticalTicker components', () => {
        render(<ShowcaseCarousel showcases={showcasesFixture} />);
        const tickers = screen.getAllByTestId('vertical-ticker');

        const firstTickerProps = JSON.parse(tickers[0].getAttribute('data-props')!);
        expect(firstTickerProps.direction).toBe('down');
        expect(firstTickerProps.speed).toBe(0.5);
        expect(firstTickerProps.startDelay).toBe(4.5);

        const secondTickerProps = JSON.parse(tickers[1].getAttribute('data-props')!);
        expect(secondTickerProps.direction).toBe('up');
    });

    it('passes the correct props to Image components', () => {
        render(<ShowcaseCarousel showcases={showcasesFixture} />);
        const firstImage = showcasesFixture[0][0];
        const thirdImage = showcasesFixture[1][0];

        expect(Image).toHaveBeenCalledWith(expect.objectContaining({
            src: firstImage.src,
            alt: firstImage.alt,
            width: firstImage.width,
            height: firstImage.height,
        }), undefined);

        expect(Image).toHaveBeenCalledWith(expect.objectContaining({
            src: thirdImage.src,
            alt: thirdImage.alt,
            width: thirdImage.width,
            height: thirdImage.height,
        }), undefined);
    });

    it('renders nothing when showcases prop is an empty array', () => {
        render(<ShowcaseCarousel showcases={[]} />);
        expect(screen.queryByTestId('vertical-ticker')).not.toBeInTheDocument();
        expect(screen.queryByTestId('showcase-image')).not.toBeInTheDocument();
    });

    it('renders tickers but no images when columns are empty', () => {
        render(<ShowcaseCarousel showcases={[[], []]} />);
        expect(screen.getAllByTestId('vertical-ticker')).toHaveLength(2);
        expect(screen.queryByTestId('showcase-image')).not.toBeInTheDocument();
    });

    it('calls the useCarouselAppear hook', () => {
        render(<ShowcaseCarousel showcases={showcasesFixture} />);
        expect(useCarouselAppear).toHaveBeenCalledTimes(1);
    });
});