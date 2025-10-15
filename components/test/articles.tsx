import ArticleCard from "./articleCard";

const posts = [
  {
    id: 1,
    title: "چیزتو ارتقا بده",
    href: "#",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "بازاریابی", href: "#" },
    author: {
      name: "جانی خسته",
      role: "مدیر",
      href: "#",
      imageUrl: "https://github.com/react.png",
    },
  },
  {
    id: 2,
    title: "یه عنوان تستی",
    href: "#",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "تست", href: "#" },
    author: {
      name: "جانی پیر",
      role: "کارمند",
      href: "#",
      imageUrl: "https://github.com/profile.png",
    },
  },
  {
    id: 3,
    title: "نظری ندارم",
    href: "#",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "فرانت", href: "#" },
    author: {
      name: "جانی احمق",
      role: "اصل کاری",
      href: "#",
      imageUrl: "https://github.com/fun.png",
    },
  },
  {
    id: 4,
    title: "نمدونم ارتقا بده",
    href: "#",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "بازاریابی", href: "#" },
    author: {
      name: "جانی گنگ",
      role: "ارشد",
      href: "#",
      imageUrl: "https://github.com/fun2.png",
    },
  },
];

const Article = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className=" space-y-16 ">
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
