import { NextRequest, NextResponse } from 'next/server';

export const GET = async (_: NextRequest, context?: { params?: { id: string; } }): Promise<NextResponse<any>> => {
    const slug: string = process.env.SLUG as string;
    const myHeaders = new Headers();
    myHeaders.append("X-Api-Key", process.env.API_KEY as string);
    myHeaders.append("Cookie", "NEXT_LOCALE=en-us");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    const uri: string = `https://beta.certifie.me/api/reserved/v1/${slug}/service/${context?.params?.id as string}`;

    const data = await fetch(uri, requestOptions as RequestInit)
        .then((response) => response.json())
        .then((result) => result)
        .catch((error) => console.error(error));

    return NextResponse.json(data, { status: 200 });
}