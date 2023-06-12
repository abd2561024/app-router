import { cookies } from 'next/headers';
import { axios } from '@/utils/axios';
import compact from 'lodash/compact';
import set from 'lodash/set';
import isString from 'lodash/isString';
import { CommonPage } from '@/types/page';
import { headers } from 'next/headers';
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const cookieStore = cookies();

    console.log('INSIDE ROUTER'); // >>>
    const { pathname, searchParams, search, href  } = new URL(request.url);

    const type = searchParams.get('type');
    const code = searchParams.get('code');
    const headersList = headers();

    let path = compact(pathname.replace('api/', '').split('/')).join('/') ?? ''; // очищаем от лишних `/`
    let isOwnPage = false;
    let url = `${pathname}${search}`;

    const responseParams = {
        status: 200,
        headers: {},
    };

    if (path.endsWith('search/hotels')) {
        isOwnPage = true;

        if (
            !isString(code) ||
            !isString(type) ||
            !['city', 'region', 'district', 'country', 'location', 'place', 'hotel'].includes(type)
        ) {
            responseParams.status = 404;
            return new Response('ERROR! Incorrect CODE/TYPE', responseParams);
        }

        const locale = path.replace('search/hotels', '').replace('/', '');
        url = url.replace(`/${locale}/`, '/');
        path = !locale ? 'search' : `${locale}/search`;
    }

    try {
        const { data, status, headers: axiosHeaders } = await axios.get<CommonPage>(`rest/${path}`, {
            params: { code, type },
            headers: { 'Accept-Encoding': 'gzip', Cookie: cookieStore.toString() },
        });

        if (typeof data === 'object') {
            const { locale, statusCode, uri, project } = data;

            if (status >= 300 && status < 400) return { redirect: { permanent: false, destination: uri } };

            const cookies = axiosHeaders['set-cookie'] ?? [];
            const nextCookies =
                process.env.NODE_ENV === 'development'
                    ? cookies.map((cookie) =>
                        cookie
                            .split('; ')
                            .filter((param) => !param.startsWith('domain'))
                            .join('; ')
                    )
                    : cookies;

            set(responseParams, ['headers', 'set-cookie'], nextCookies);
            set(responseParams, ['headers', 'Cache-Control'], 'public, s-maxage=10, stale-while-revalidate=59');
            set(responseParams, 'status', statusCode);

            const sessionId =
                (axiosHeaders['set-cookie'] ?? [])
                    .find((c) => c.startsWith('laravel_session'))
                    ?.split(';')[0]
                    .split('=')[1] ?? null;

            const xsrfToken =
                (axiosHeaders['set-cookie'] ?? [])
                    .find((c) => c.startsWith('XSRF-TOKEN'))
                    ?.split(';')[0]
                    .split('=')[1] ?? null;

            return NextResponse.json(data, responseParams);
        }


        return new Response('Not Found', responseParams);
    } catch (err) {
        responseParams.status = 404;
        return new Response('Not Found', responseParams);
    }
}
