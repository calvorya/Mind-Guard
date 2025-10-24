import { useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

const resources = [
  {
    href: "https://taaghche.com/book/116846/%D8%B1%D8%A7%D9%87-%D9%87%D8%A7%DB%8C-%D8%AF%D8%B1%D9%85%D8%A7%D9%86-%D8%AE%D9%88%D8%AF%D8%A7%D8%B1%D8%B6%D8%A7%DB%8C%DB%8C",
    title: "کتاب: راه‌های درمان خودارضایی",
    info: "سید اکبر موسوی • انتشارات میراث ماندگار",
    img: "https://img.taaghche.com/frontCover/116846.jpg?w=200",
  },
  {
    href: "https://addictionresource.com/addiction/masturbation/overcoming-masturbation-addiction/",
    title: "راهنمای رهایی از خودارضایی و اعتیاد به آن",
    info: "مقاله آموزشی",
    img: "https://addictionresource.com/wp-content/uploads/2019/09/OVERCOMING-MASTURBATION-ADDICTION-768x410.jpg",
  },
  {
    href: "https://healthline.com/health/how-to-stop-masturbating",
    title: "چگونه خودارضایی را متوقف کنیم؟",
    info: "مقاله Healthline",
    img: "https://www.healthline.com/hlcmsresource/images/AN_images/stop-masturbation-732×549-thumbnail.jpg",
  },
  {
    href: "https://nofap.com/",
    title: "NoFap – وب‌سایت جامعه و پشتیبانی",
    info: "انجمن ترک خودارضایی/پورن",
    img: "https://nofap.com/wp-content/uploads/2019/08/SVG_logo.svg",
  },
  {
    href: "https://www.amazon.com/MASTERING-SELF-CONTROL-OVERCOMING-CONTROLLING-MASTURBATION/dp/B0DCW4CXLQ",
    title: "Mastering Self-Control: Overcoming and Controlling Masturbation",
    info: "کتاب Benjamin Hayes",
    img: "https://m.media-amazon.com/images/I/61eLCCPBF7L._SY342_.jpg",
  },
  {
    href: "https://www.barnesandnoble.com/w/mastering-control-begedict-opoku-twumasi/1146335031",
    title: "Mastering Control: Overcoming Masturbation and Reclaiming Your Life",
    info: "کتاب Benedict Opoku Twumasi",
    img: "https://prodimage.images-bn.com/pimages/9789798322588_p0_v1_s1200x630.jpg",
  },
  {
    href: "https://alimirsadeghi.com/%D8%AA%D8%B1%DA%A9-%D8%AE%D9%88%D8%AF%D8%A7%D8%B1%D8%B6%D8%A7%DB%8C%DB%8C/",
    title: "مقاله: ترک خودارضایی",
    info: "علیرضا میرصادقی",
    img: "https://alimirsadeghi.com/wp-content/uploads/2020/01/Quit-masturbating.jpg",
  },
  {
    href: "https://wikiravan.com/blog/%D8%B1%D8%A7%D9%87-%D9%87%D8%A7%DB%8C-%D8%AA%D8%B1%DA%A9-%D8%AE%D9%88%D8%AF%D8%A7%D8%B1%D8%B6%D8%A7%DB%8C%DB%8C-%D8%A8%D9%87-%D8%B1%D9%88%D8%B4%DB%8C-%D8%B3%D8%A7%D8%AF%D9%87/",
    title: "مقاله: ترک خودارضایی با ۱۴ روش علمی",
    info: "ویکی روان",
    img: "https://www.wikiravan.com/blog/wp-content/uploads/2021/04/%DA%86%DA%AF%D9%88%D9%86%D9%87-%D8%AE%D9%88%D8%AF-%D8%A7%D8%B1%D8%B6%D8%A7%DB%8C%DB%8C-%D8%B1%D8%A7-%D8%AA%D8%B1%DA%A9-%DA%A9%D9%86%DB%8C%D9%85.jpg",
  },
  {
    href: "https://paziresh24.com/blog/17544/%D8%A7%D8%B9%D8%AA%DB%8C%D8%A7%D8%AF-%D8%A8%D9%87-%D8%AE%D9%88%D8%AF%D8%A7%D8%B1%D8%B6%D8%A7%DB%8C%DB%8C/",
    title: "مقاله: اعتیاد به خودارضایی چیست و چطور ترک می‌شود؟",
    info: "پذیرش۲۴",
    img: "https://www.paziresh24.com/blog/wp-content/uploads/2021/05/1-39-1030x539.jpg",
  },
];

export function Resources() {
  const [i, setI] = useState(0);
  const r = resources[i];
  const go = (d) => setI((v) => (v + d + resources.length) % resources.length);

  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl shadow-sm ring-1 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <button onClick={() => go(-1)} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
        <ArrowRight className="w-4 h-4 text-gray-700 dark:text-gray-300" />
      </button>
      <a href={r.href} target="_blank" rel="noopener noreferrer" className="relative w-56 h-36 rounded-2xl overflow-hidden shadow ring-1 ring-gray-200 dark:ring-gray-700 group transition-all duration-300">
        <img src={r.img} alt={r.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-2 left-3 right-3 text-white">
          <div className="flex justify-between items-center text-sm font-semibold">
            {r.title}
            <ExternalLink className="w-4 h-4 opacity-80" />
          </div>
          <div className="text-xs text-gray-300">{r.info}</div>
        </div>
      </a>
      <button onClick={() => go(1)} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
        <ArrowLeft className="w-4 h-4 text-gray-700 dark:text-gray-300" />
      </button>
    </div>
  );
}
