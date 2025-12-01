import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaCalendar } from 'react-icons/fa';

export async function generateStaticParams() {
    const posts = getAllPosts(['slug']);
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug, [
        'title',
        'date',
        'slug',
        'content',
        'coverImage',
    ]);

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <article className="max-w-3xl mx-auto">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-primary hover:underline mb-8"
                >
                    <FaArrowLeft className="mr-2" /> Back to Blog
                </Link>

                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                        <FaCalendar className="mr-2" />
                        <time>{post.date}</time>
                    </div>
                </header>

                {post.coverImage && (
                    <div className="relative mb-12 rounded-xl overflow-hidden shadow-lg h-64 md:h-96 bg-gray-200 dark:bg-gray-800">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <MDXRemote source={post.content} />
                </div>
            </article>
        </div>
    );
}
