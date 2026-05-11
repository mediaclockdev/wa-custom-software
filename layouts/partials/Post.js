import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import readingTime from "@lib/utils/readingTime";
import Link from "next/link";

const Post = ({ post, i }) => {
  const { summary_length, blog_folder } = config.settings;
  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md border border-slate-100 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

      {post.frontmatter.image && (
        <div className="relative w-full overflow-hidden bg-slate-50 z-10">
          <Link href={`/${blog_folder}/${post.slug}`} className="block w-full h-full">
            <ImageFallback
              className="w-full object-cover transition-transform duration-700 group-hover:scale-110 aspect-[4/3]"
              src={post.frontmatter.image}
              alt={post.frontmatter.title}
              width={570}
              height={335}
            />
          </Link>
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      )}

      <div className="p-5 lg:p-6 lg:py-2 flex flex-col flex-grow relative z-10 bg-white">
        <h2 className="h4 mt-2 line-clamp-2">
          <Link
            href={`/${blog_folder}/${post.slug}`}
            className="block text-gray-900 group-hover:text-primary transition-colors duration-300"
          >
            {post.frontmatter.title}
          </Link>
        </h2>
        <p className="text-lg text-slate-600 mt-2 lg:mt-2 line-clamp-4 flex-grow">{post.content}</p>

        <div className="mt-6 lg:mt-2 flex items-center pt-4 border-t border-slate-100">
          <div className="overflow-hidden rounded-full border-2 border-white shadow-[0_0_0_2px] shadow-primary shrink-0">
            <ImageFallback
              src={post.frontmatter.author.avatar}
              width={50}
              height={50}
              alt="author"
            />
          </div>
          <div className="pl-4">
            <p className="font-medium text-gray-900">
              {post.frontmatter.author.name}
            </p>
            <p className="text-sm text-slate-500 mt-0.5">
              {dateFormat(post.frontmatter.date)} - {readingTime(post.content)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
