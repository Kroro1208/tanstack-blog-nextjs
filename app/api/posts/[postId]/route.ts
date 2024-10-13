import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import path from "node:path";
import { writeFile, unlink } from "node:fs/promises";

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
        const formData = await req.formData();

        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const tagId = formData.get('tagId') as string;
        const imageFile = formData.get('imageUrl') as File | null;

        let image: string | undefined;

        if (imageFile && imageFile instanceof File) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const filename = `${Date.now()}_${imageFile.name.replace(/\s/g, '_')}`;
            const filepath = path.join(process.cwd(), 'public', 'uploads', filename);

            await writeFile(filepath, new Uint8Array(buffer));
            image = `/uploads/${filename}`;
        }

        const updatePost = await db.post.update({
            where: {
                id: params.postId
            },
            data: {
                title,
                content,
                tagId,
                ...(image && { image })
            }
        });
        return NextResponse.json(updatePost, {status: 200});
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({message: "記事の更新に失敗しました", error: String(error)}, {status: 500});
    }
}

export async function DELETE(req: Request, context: contextProps) {
    try {
        const { params } = context;
        
        // 投稿を取得
        const post = await db.post.findUnique({
            where: {
                id: params.postId
            }
        });

        if (!post) {
            return NextResponse.json({ message: "投稿が見つかりません" }, { status: 404 });
        }

        // 画像ファイルが存在する場合、削除
        if (post.image) {
            const imagePath = path.join(process.cwd(), 'public', post.image);
            try {
                await unlink(imagePath);
            } catch (error) {
                console.error('画像ファイルの削除に失敗しました:', error);
                // 画像の削除に失敗しても、投稿の削除は続行
            }
        }

        // データベースから投稿を削除
        await db.post.delete({
            where: {
                id: params.postId
            }
        });

        return new Response(null, { status: 204 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "記事の削除に失敗しました" }, { status: 500 });
    }
}