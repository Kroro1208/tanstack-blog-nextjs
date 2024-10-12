import { db } from "@/lib/db";
import { writeFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import path from "node:path";

export async function POST(req: Request) {
    try {
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

        const post = await db.post.create({
            data: {
                title,
                content,
                tagId,
                image: image || ''
            }
        });
        return NextResponse.json(post, {status: 201});
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({message: "記事の作成に失敗しました", error: String(error)}, {status: 500});
    }
}