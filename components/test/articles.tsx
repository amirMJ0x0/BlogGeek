import ArticleCard from "./articleCard";

const posts = [
  {
    id: 1,
    title: "الگوریتم RankBrain",
    href: "#",
    description:
      "رنک برین یا رتبه بندی با هوش مصنوعی، الگوریتم جدید گوگل مبتنی بر یادگیری مداوم است که به گوگل کمک میکند نتایج جستجو را براساس رفتار کاربران بهینه سازی کند.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "الگوریتم", href: "#" },
    author: {
      name: "علی اصفهانی",
      role: "Senior Front End",
      href: "#",
      imageUrl: "https://github.com/jadijadi.png",
    },
  },
  {
    id: 2,
    title: "الگوریتم پاندا",
    href: "#",
    description:
      "پاندا یکی از شناخته‌شده‌ترین الگوریتم‌های‌گوگل است. وظیفه اصلی آن بررسی کیفیت محتوا و شناسایی میزان رضایت کاربران از متن قرار گرفته در صفحه است. بسیاری تصور می‌کنند این الگوریتم فقط بر روی محتوای تکراری تمرکز دارد در حالی‌که عملکرد آن بسیار پیچیده‌تر است.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "الگوریتم", href: "#" },
    author: {
      name: "ممد داوودی",
      role: "Exploit-Developer",
      href: "#",
      imageUrl: "https://github.com/Mohammaddvd.png",
    },
  },
  {
    id: 4,
    title: "ساختمان داده",
    href: "#",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "تست", href: "#" },
    author: {
      name: "امیر جواهری",
      role: "Front-End Developer",
      href: "#",
      imageUrl: "https://github.com/amirMJ0x0.png",
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
