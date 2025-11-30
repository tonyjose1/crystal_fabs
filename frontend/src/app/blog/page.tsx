import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/blog';

export default function BlogIndex() {
    const posts = getAllPosts(['title', 'date', 'slug', 'excerpt', 'coverImage']);

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-text-primary mb-4">Our Blog</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Insights, tips, and news about custom steel fabrication and engineering.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                            <div className="bg-[var(--color-background-secondary)] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-800 h-full flex flex-col">
                                {post.coverImage && (
                                    <div className="relative h-48 overflow-hidden">
                                        {/* In a real app, use Next.js Image component */}
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="text-sm text-primary mb-2">{post.date}</div>
                                    <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                                        {post.excerpt}
                                    </p>
                                    <span className="text-primary font-medium group-hover:underline">
                                        Read More &rarr;
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
