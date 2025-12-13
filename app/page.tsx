import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { ModeToggle } from "@/components/mode-toggle"

// 1. Viết câu thần chú (Query) để gọi dữ liệu về
// Lấy _id, title, slug, ngày đăng. Sắp xếp bài mới nhất lên đầu.
const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  summary
}`;

// 2. Định nghĩa kiểu dữ liệu cho bài viết (TypeScript)
// Mày lười thì dùng any, nhưng tao ép mày dùng interface cho quen thói sạch sẽ
interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  summary: string;
}

// 3. Component chính (Async vì phải chờ lấy dữ liệu)
export default async function Home() {
  console.log("Đang lấy dữ liệu từ Sanity..."); // Log chơi chơi

  // Gọi hàm fetch data. Cực kỳ đơn giản.
  // options: { next: { revalidate: 60 } } nghĩa là cứ 60s nó sẽ update dữ liệu mới 1 lần (ISR)
  const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, { next: { revalidate: 60 } });

  console.log("Đã lấy được:", posts.length, "bài viết");

  return (
    <main className="min-h-screen max-w-4xl mx-auto p-5 bg-background text-foreground transition-colors">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-primary">
          Blog Của Thằng Dev Ngu
        </h1>
        <ModeToggle />
      </div>
      <div className="grid gap-5">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="block p-6 border rounded-lg shadow hover:shadow-lg transition-colors bg-card text-card-foreground"
            >
              <h2 className="text-2xl font-bold mb-2">
                {post.title}
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
              </p>
              <p className="text-muted-foreground">
                {post.summary || "Đéo có tóm tắt, bấm vào mà đọc..."}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-center text-red-500">
            Địt mẹ chưa có bài nào, vào Admin viết đi!
          </p>
        )}
      </div>
    </main>
  );
}