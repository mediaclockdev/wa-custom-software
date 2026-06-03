import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Cta from "@layouts/components/Cta";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import SeoMeta from "@layouts/partials/SeoMeta";
import { getListPage, getSinglePage } from "@lib/contentParser";
import Post from "@partials/Post";
import Breadcrumbs from "@layouts/components/Breadcrumbs";
const { blog_folder } = config.settings;

// blog pagination
const BlogPagination = async ({ params }) => {
  //
  const currentPage = parseInt((params && params.slug) || 1);
  const { pagination } = config.settings;
  const posts = await getSinglePage(`content/${blog_folder}`);
  const postIndex = await getListPage(`content/${blog_folder}/_index.md`);
  //
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const { frontmatter } = postIndex;
  const { title } = frontmatter;

  return (
    <GSAPWrapper>
      <SeoMeta title={title} />
      <section className="section pt-4">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 tracking-tight">
            {title}
          </h1>
        </div>
        {/* <Breadcrumbs /> */}
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center pb-6">
            {currentPosts.map((post, i) => (
              <div key={`key-${i}`}>
                <Post post={post} />
              </div>
            ))}
          </div>
          <Pagination
            section={blog_folder}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
    </GSAPWrapper>
  );
};

export default BlogPagination;

export async function generateStaticParams() {
  const getAllSlug = await getSinglePage(`content/${blog_folder}`);
  const allSlug = getAllSlug.map((item) => item.slug);
  const { pagination } = config.settings;
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      slug: (i + 1).toString(),
    });
  }

  return paths;
}
