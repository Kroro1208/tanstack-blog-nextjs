import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface contextProps {
    params: {
        postId: string;
    }
}

export async function GET(req: Request, context: contextProps) {
    try {
        const { params } = context;
        const post = await db.post.findFirst({
            where: {
                id: params.postId
            },
            include: {
                tag: true
            }
        });
        return NextResponse.json(post, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "データが取得できませんでした"})
    }
}

export async function PATCH(req: Request, context: contextProps) {
    try {
        const { params } = context;
        const body = await req.json();

        await db.post.update({
            where: {
                id: params.postId
            },
            data: {
                title:  body.title,
                content: body.content,
                tagId: body.tagId
            }
        });
        return NextResponse.json({message: "記事の更新に成功しました"}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "記事の更新に失敗しました"}, {status: 500});
    }
}

export async function DELETE(req: Request, context: contextProps) {
    try {
        const { params } = context;
        await db.post.delete({
            where: {
                id: params.postId
            }
        });
        return new Response(null, {status: 204});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "記事の削除に失敗しました"}, {status: 500});
    }
}