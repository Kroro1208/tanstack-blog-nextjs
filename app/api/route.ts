import { NextResponse } from "next/server";

export async function GET() {
    try {
        const tags = await db.tag.findMany();
        return NextResponse.json(tags, {status: 200})
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({message: "データが取得できませんでした"})
    }
}