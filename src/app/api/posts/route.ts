import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'src/lib/posts.json');

export async function GET() {
  try {
    console.log(filePath);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newPost = await req.json();
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.posts.push(newPost);
    fs.writeFileSync(filePath, JSON.stringify(data));
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to write data' }, { status: 500 });
  }
}
