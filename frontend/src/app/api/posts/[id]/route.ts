import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'src/lib/posts.json');


export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
  const id: number = Number(params.id);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const postIndex = data.posts.findIndex((post: any) => post.id === id);
  if (postIndex === -1) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  const body = await request.json();
  data.posts[postIndex] = { ...data.posts[postIndex], ...body };
  fs.writeFileSync(filePath, JSON.stringify(data));
  return NextResponse.json(data.posts[postIndex], { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
  const id: number = Number(params.id);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const postIndex = data.posts.findIndex((post: any) => post.id === id);
  if (postIndex === -1) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  data.posts.splice(postIndex, 1);
  fs.writeFileSync(filePath, JSON.stringify(data));
  return new NextResponse(null, { status: 204 });
}
