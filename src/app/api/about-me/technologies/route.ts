import { NextResponse } from 'next/server';
import container from '@/lib/di/container';
import TYPES from '@/lib/di/types';
import getAboutMeApi from '@/lib/api/about-me/getAboutMeApi';
import TechnologyGetter from '@/lib/services/interfaces/TechnologyGetter';

export async function GET() {
    const technologyGetter = container.get<TechnologyGetter>(TYPES.TechnologyGetter);

    const aboutMe = await getAboutMeApi();
    const aboutMeTechnologies = await technologyGetter
        .getTechnologiesBySlugGroupedByCategory(aboutMe.technologiesCategories);

    return NextResponse.json(aboutMeTechnologies);
}