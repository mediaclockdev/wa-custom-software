import dateFormat from "@lib/utils/dateFormat";
import readingTime from "@lib/utils/readingTime";
import { markdownify } from "@lib/utils/textConverter";
import MDXContent from "app/helper/MDXContent";
import Image from "next/image";
import ImageFallback from "./components/ImageFallback";
import Post from "./partials/Post";
import SeoMeta from "./partials/SeoMeta";
import Breadcrumbs from "./components/Breadcrumbs";

const PostSingle = ({ frontmatter, content, recentPosts }) => {
  let { description, title, date, image, author } = frontmatter;
  description = description ? description : content.slice(0, 120);

  return (
    <>
      <SeoMeta title={title} description={description} image={image} />
      <Breadcrumbs customTitle={title} />
      <section className="section pt-0">
        <div className="container">
          <article>
            <div className="row justify-center mt-3">
              <div className="lg:col-10">
                {image && (
                  <Image
                    src={image}
                    height="600"
                    width="1020"
                    alt={title}
                    priority={true}
                    className="fade w-full rounded-lg "
                  />
                )}
              </div>
              <div className="lg:col-10">
                {markdownify(title, "h1", "h2 mt-4 lg:mt-6")}
                <div className="mt-6 flex items-center">
                  <div className="overflow-hidden rounded-full border-2 border-white shadow-[0_0_0_2px] shadow-primary">
                    <ImageFallback
                      src={author.avatar}
                      width={50}
                      height={50}
                      alt="author"
                    />
                  </div>
                  <div className="pl-5">
                    <p className="font-medium text-dark">{author.name}</p>
                    <p>
                      {dateFormat(date)} - {readingTime(content)}
                    </p>
                  </div>
                </div>
                <div
                  className="content mb-4 mt-5 text-left prose-h2:mb-2 prose-h2:mt-3 lg:prose-h2:mt-6 prose-h2:text-2xl lg:prose-h2:text-3xl  prose-p:text-lg prose-p:my-1 prose-ul:mt-2 prose-li:cursor-default prose-li:text-gray-600 prose-li:marker:text-gray-600"
                >
                  <MDXContent content={content} />
                </div>
              </div>
              {/* {disqus.enable && (
                <div className="fade row justify-center ">
                  <div className="lg:col-8">
                    <DisqussEmbed />
                  </div>
                </div>
              )} */}
            </div>
          </article>

          <div className="section mt-4">
            <h2 className="section-title text-center">Recent Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 justify-center mt-8">
              {recentPosts.slice(0, 2).map((post, index) => (
                <div key={"post-" + index} className="animate">
                  <Post post={post} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostSingle;
