import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Transition,
} from "framer-motion";
import {
  ArrowRight,
  Bot,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Filter,
  Grid2x2,
  Heart,
  Home,
  Landmark,
  Lock,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Play,
  Plus,
  ScanSearch,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Truck,
  UserRound,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "./utils/cn";

type Page = "home" | "listing" | "product" | "cart" | "checkout" | "account" | "wholesale" | "about" | "contact" | "track";
type Scope =
  | "All"
  | "Women"
  | "Kids"
  | "Festival Collection"
  | "Wedding Collection"
  | "Best Sellers"
  | "Trending Collection"
  | "Cotton Collection"
  | "New Arrivals"
  | "Offers";

type Product = {
  id: string;
  name: string;
  department: "Women" | "Kids Boys" | "Kids Girls" | "Baby";
  category: string;
  subcategory: string;
  collectionTags: string[];
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  hoverImage: string;
  description: string;
  fabric: string;
  sizes: string[];
  colors: string[];
  stock: number;
  badges: string[];
};

type CartItem = {
  productId: string;
  quantity: number;
  size: string;
  color: string;
};

type ListingFilters = {
  scope: Scope;
  category: string;
  department: string;
  color: string;
  size: string;
  maxPrice: number;
  sortBy: "Newest" | "Best Selling" | "Price Low To High" | "Price High To Low";
  discountedOnly: boolean;
  inStockOnly: boolean;
};

const transition: Transition = { duration: 0.68, ease: [0.22, 1, 0.36, 1] };

const socialLinks = {
  instagram: "https://www.instagram.com/yuva.priya.92351",
  youtube: "https://www.youtube.com/@jeev6989",
  meesho: "https://www.meesho.com/JeevRuthiEnterprises",
  whatsapp: "https://wa.me/919363697498",
  phone: "tel:+919363697498",
  email: "mailto:Yuvavishnu2426@gmail.com",
  directions:
    "https://www.google.com/maps/search/?api=1&query=No.81%2C+Vigneshwara+Nagar%2C+Kundrathur+Main+Road%2C+Porur%2C+Chennai+600116",
};

const announcements = [
  "🚚 Free Shipping Above ₹999",
  "🎉 Festival Sale Live",
  "📞 Wholesale Orders Available",
  "🎁 New Arrivals Added Daily",
  "💳 UPI + COD Available",
];

const womenPortraits = [
  "https://images.pexels.com/photos/28851461/pexels-photo-28851461.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/14284158/pexels-photo-14284158.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/6739340/pexels-photo-6739340.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/35521738/pexels-photo-35521738.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/37523792/pexels-photo-37523792.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/37523799/pexels-photo-37523799.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/8432522/pexels-photo-8432522.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/32982934/pexels-photo-32982934.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/35395108/pexels-photo-35395108.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/2723623/pexels-photo-2723623.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/30249378/pexels-photo-30249378.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/36951578/pexels-photo-36951578.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/32544086/pexels-photo-32544086.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/31580413/pexels-photo-31580413.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/31580442/pexels-photo-31580442.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/36951577/pexels-photo-36951577.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/17105116/pexels-photo-17105116.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
];

const kidsGirlsPortraits = [
  "https://images.pexels.com/photos/12100636/pexels-photo-12100636.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/15730103/pexels-photo-15730103.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/9323160/pexels-photo-9323160.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/18606561/pexels-photo-18606561.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/8084059/pexels-photo-8084059.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/7100328/pexels-photo-7100328.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
];

const kidsBoysPortraits = [
  "https://images.pexels.com/photos/19664810/pexels-photo-19664810.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/18544988/pexels-photo-18544988.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/18487396/pexels-photo-18487396.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/35819848/pexels-photo-35819848.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/7100297/pexels-photo-7100297.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
];

const babyPortraits = [
  "https://images.pexels.com/photos/37904241/pexels-photo-37904241.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/29015875/pexels-photo-29015875.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/32410090/pexels-photo-32410090.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/7282448/pexels-photo-7282448.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/33344775/pexels-photo-33344775.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/36276503/pexels-photo-36276503.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
];

const bannerImages = [
  "https://images.pexels.com/photos/14037486/pexels-photo-14037486.png?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  "https://images.pexels.com/photos/8750027/pexels-photo-8750027.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  "https://images.pexels.com/photos/31739926/pexels-photo-31739926.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  "https://images.pexels.com/photos/28943606/pexels-photo-28943606.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  "https://images.pexels.com/photos/35228874/pexels-photo-35228874.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  "https://images.pexels.com/photos/7100328/pexels-photo-7100328.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  "https://images.pexels.com/photos/35045845/pexels-photo-35045845.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  "https://images.pexels.com/photos/30214754/pexels-photo-30214754.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
];

const womenCategoryTitles: Record<string, string[]> = {
  Kurtis: ["Ajrakh Grace Kurti", "Terracotta Bloom Kurti", "Desert Loom Kurti", "Heritage Line Kurti", "Sunlit Courtyard Kurti"],
  Sarees: ["Royal Vermilion Saree", "Temple Weave Saree", "Amber Drape Saree", "Kashi Silk Saree", "Velvet Dawn Saree"],
  Dresses: ["Evening Muse Dress", "Ivory Story Dress", "Cedar Edit Dress", "Studio Luxe Dress", "Golden Hour Dress"],
  Tops: ["Artisan Panel Top", "City Silk Top", "Soft Loom Top", "Weekend Luxe Top", "Signature Edit Top"],
  "Salwar Sets": ["Heirloom Salwar Set", "Rust Glow Salwar Set", "Aangan Salwar Set", "Noor Salwar Set", "Heritage Salwar Set"],
};

const kidsBoysTitles: Record<string, string[]> = {
  Shirts: ["Little Monarch Shirt", "Terrace Check Shirt", "Porur Classic Shirt", "Weekend Fest Shirt", "Jr Signature Shirt"],
  "T-Shirts": ["Playfield Luxe Tee", "Metro Junior Tee", "Soft Cotton Tee", "Weekend Club Tee", "Urban Kids Tee"],
  "Party Wear": ["Prince Party Edit", "Tiny Celebration Set", "Midnight Junior Suit", "Star Kid Party Look", "Elite Party Set"],
  "Ethnic Wear": ["Festive Prince Kurta", "Temple Courtyard Set", "South Silk Junior", "Wedding Day Kurta", "Royal Ethnic Edit"],
};

const kidsGirlsTitles: Record<string, string[]> = {
  Frocks: ["Birthday Bloom Frock", "Caramel Charm Frock", "Twinkle Muse Frock", "Balloon Party Frock", "Little Aura Frock"],
  Dresses: ["Garden Story Dress", "Candy Luxe Dress", "Studio Smile Dress", "Playful Grace Dress", "Celebration Dress"],
  Gowns: ["Mini Regal Gown", "Princess Glow Gown", "Wedding Bells Gown", "Sparkle Evening Gown", "Pearl Party Gown"],
  "Party Wear": ["Confetti Party Edit", "Junior Luxe Party Set", "Golden Ribbon Dress", "Cocoa Party Layer", "Premium Kids Partywear"],
};

const babyTitles: Record<string, string[]> = {
  Rompers: ["Cloud Soft Romper", "Warm Nest Romper", "Tiny Bloom Romper", "Little Story Romper", "Baby Comfort Romper"],
  "Gift Sets": ["Welcome Home Gift Set", "Newborn Keepsake Set", "Gentle Days Gift Set", "Soft Touch Gift Set", "Premium Infant Gift Set"],
};

const colorOptions = [
  ["Cinnamon", "Ivory", "Mocha"],
  ["Clay Rose", "Pearl", "Rust"],
  ["Walnut", "Taupe", "Amber"],
  ["Rosewood", "Sand", "Cocoa"],
  ["Soft Gold", "Cream", "Chestnut"],
];

function makeProduct(args: {
  title: string;
  department: Product["department"];
  category: string;
  index: number;
  imagePool: string[];
  basePrice: number;
  fabric: string;
  sizes: string[];
  subcategory: string;
}) {
  const image = args.imagePool[args.index % args.imagePool.length];
  const hoverImage = args.imagePool[(args.index + 2) % args.imagePool.length];
  const collectionTags: string[] = [];
  const badges: string[] = [];

  if (["Kurtis", "Salwar Sets", "Party Wear", "Ethnic Wear", "Frocks"].includes(args.category) && args.index < 3) {
    collectionTags.push("Festival Collection");
  }
  if (["Sarees", "Salwar Sets", "Gowns", "Party Wear"].includes(args.category) && args.index < 2) {
    collectionTags.push("Wedding Collection");
  }
  if (["Kurtis", "Dresses", "Tops", "Salwar Sets"].includes(args.category) && args.index < 2) {
    collectionTags.push("Cotton Collection");
  }
  if (args.index === 0 || args.index === 4) {
    collectionTags.push("Best Sellers");
    badges.push("Best Seller");
  }
  if (args.index === 1 || args.index === 2) {
    collectionTags.push("New Arrivals");
    badges.push("New Arrival");
  }
  if (args.index === 3) {
    collectionTags.push("Trending Collection");
    badges.push("Trending");
  }

  return {
    id: `${args.department}-${args.category}-${args.index}`.toLowerCase().replace(/\s+/g, "-"),
    name: args.title,
    department: args.department,
    category: args.category,
    subcategory: args.subcategory,
    collectionTags: Array.from(new Set(collectionTags)),
    price: args.basePrice + args.index * 220,
    originalPrice: args.basePrice + args.index * 220 + 650,
    rating: 4.6 + (args.index % 3) * 0.1,
    reviews: 82 + args.index * 19,
    image,
    hoverImage,
    description:
      "A premium JEEV RUTHI COLLECTIONS style crafted for elevated everyday dressing, festive storytelling, and a polished fashion-forward family wardrobe.",
    fabric: args.fabric,
    sizes: args.sizes,
    colors: colorOptions[args.index % colorOptions.length],
    stock: 7 + ((args.index + 1) % 8),
    badges,
  } satisfies Product;
}

function buildProducts() {
  const items: Product[] = [];

  Object.entries(womenCategoryTitles).forEach(([category, titles], categoryIndex) => {
    titles.forEach((title, index) => {
      items.push(
        makeProduct({
          title,
          department: "Women",
          category,
          index,
          imagePool: womenPortraits.slice(categoryIndex, womenPortraits.length),
          basePrice: category === "Sarees" ? 2999 : category === "Salwar Sets" ? 2499 : 1899,
          fabric: category === "Sarees" ? "Art silk, jacquard pallu & soft lining" : "Premium cotton-blend with elegant drape",
          sizes: category === "Sarees" ? ["Free Size"] : ["S", "M", "L", "XL", "XXL"],
          subcategory: category === "Tops" ? "Western Wear" : "Ethnic Wear",
        }),
      );
    });
  });

  Object.entries(kidsBoysTitles).forEach(([category, titles], categoryIndex) => {
    titles.forEach((title, index) => {
      items.push(
        makeProduct({
          title,
          department: "Kids Boys",
          category,
          index,
          imagePool: kidsBoysPortraits.slice(categoryIndex, kidsBoysPortraits.length).concat(kidsBoysPortraits.slice(0, categoryIndex)),
          basePrice: category === "Party Wear" ? 1899 : 1299,
          fabric: "Soft premium cotton with party-ready finishing",
          sizes: ["4Y", "6Y", "8Y", "10Y", "12Y"],
          subcategory: category,
        }),
      );
    });
  });

  Object.entries(kidsGirlsTitles).forEach(([category, titles], categoryIndex) => {
    titles.forEach((title, index) => {
      items.push(
        makeProduct({
          title,
          department: "Kids Girls",
          category,
          index,
          imagePool: kidsGirlsPortraits.slice(categoryIndex, kidsGirlsPortraits.length).concat(kidsGirlsPortraits.slice(0, categoryIndex)),
          basePrice: category === "Gowns" ? 1799 : 1399,
          fabric: "Comfort blend with premium festive finish",
          sizes: ["3Y", "5Y", "7Y", "9Y", "11Y"],
          subcategory: category,
        }),
      );
    });
  });

  Object.entries(babyTitles).forEach(([category, titles], categoryIndex) => {
    titles.forEach((title, index) => {
      items.push(
        makeProduct({
          title,
          department: "Baby",
          category,
          index,
          imagePool: babyPortraits.slice(categoryIndex, babyPortraits.length).concat(babyPortraits.slice(0, categoryIndex)),
          basePrice: 1099,
          fabric: "Gentle-touch baby cotton for all-day comfort",
          sizes: ["0-3M", "3-6M", "6-12M"],
          subcategory: category,
        }),
      );
    });
  });

  return items;
}

const products = buildProducts();

const heroSlides = [
  {
    title: "Summer Collection",
    subtitle: "Light textures, breathable silhouettes, and premium ethnic styling for sunlit family moments.",
    image: bannerImages[4],
    cta: "Shop Summer",
    scope: "Cotton Collection" as Scope,
  },
  {
    title: "Festival Collection",
    subtitle: "Rich hues, heritage embroidery, and elegant festive stories styled for every family celebration.",
    image: bannerImages[0],
    cta: "Explore Festival",
    scope: "Festival Collection" as Scope,
  },
  {
    title: "Wedding Collection",
    subtitle: "Statement sarees, occasion sets, premium kids dressing, and elevated event-ready looks.",
    image: bannerImages[7],
    cta: "View Wedding Edit",
    scope: "Wedding Collection" as Scope,
  },
  {
    title: "New Arrivals",
    subtitle: "Fresh drops merchandised with a premium campaign feel, luxe details, and trend-led family fashion.",
    image: bannerImages[1],
    cta: "Shop New In",
    scope: "New Arrivals" as Scope,
  },
];

const circleCategories = [
  { label: "New Arrivals", image: womenPortraits[11], action: { scope: "New Arrivals" as Scope, category: "All" } },
  { label: "Kurtis", image: womenPortraits[0], action: { scope: "Women" as Scope, category: "Kurtis" } },
  { label: "Sarees", image: womenPortraits[8], action: { scope: "Women" as Scope, category: "Sarees" } },
  { label: "Kids Wear", image: kidsGirlsPortraits[0], action: { scope: "Kids" as Scope, category: "All" } },
  { label: "Party Wear", image: kidsBoysPortraits[1], action: { scope: "All" as Scope, category: "Party Wear" } },
  { label: "Festival Wear", image: womenPortraits[2], action: { scope: "Festival Collection" as Scope, category: "All" } },
  { label: "Best Sellers", image: womenPortraits[10], action: { scope: "Best Sellers" as Scope, category: "All" } },
  { label: "Wedding Collection", image: womenPortraits[9], action: { scope: "Wedding Collection" as Scope, category: "All" } },
];

const featuredCollections = [
  {
    title: "Women’s Luxury Ethnic",
    copy: "Kurtis, sarees, salwar sets, dresses, and tops with elevated editorial storytelling and boutique-grade presentation.",
    image: bannerImages[2],
    scope: "Women" as Scope,
  },
  {
    title: "Kids Celebration Studio",
    copy: "Boys, girls, and baby collections curated for birthdays, festive wear, party looks, and premium gifting moments.",
    image: bannerImages[5],
    scope: "Kids" as Scope,
  },
  {
    title: "Wholesale Gold Access",
    copy: "Bulk orders, dealer registration, reseller onboarding, catalogue support, and GST-friendly premium fashion sourcing.",
    image: bannerImages[6],
    scope: "Festival Collection" as Scope,
  },
];

const offerBanners = [
  {
    title: "Summer Collection",
    subtitle: "Light, airy, camera-ready cotton edits",
    image: bannerImages[4],
    scope: "Cotton Collection" as Scope,
  },
  {
    title: "Kids Party Wear",
    subtitle: "Premium celebration styles for memorable occasions",
    image: bannerImages[5],
    scope: "Kids" as Scope,
  },
  {
    title: "Trending Collection",
    subtitle: "Fresh premium picks rising fast in fashion discovery",
    image: bannerImages[3],
    scope: "Trending Collection" as Scope,
  },
];

const whyChooseUs = [
  "Wholesale & Retail",
  "Premium Quality",
  "Elegant Ethnic Styling",
  "Fast Delivery",
  "Secure Payments",
  "7 Day Easy Returns",
  "COD Available",
  "WhatsApp Support",
];

const shoppingChannels = [
  {
    title: "Website Shopping",
    copy: "A premium ecommerce experience with campaign discovery, refined product curation, and luxury checkout UX.",
    icon: ShoppingBag,
  },
  {
    title: "WhatsApp Shopping",
    copy: "Send screenshots, ask for styling help, and place assisted orders with fast human support.",
    icon: MessageCircle,
  },
  {
    title: "Meesho Shopping",
    copy: "Explore our Meesho storefront for social commerce convenience and wider shopping reach.",
    icon: Store,
  },
  {
    title: "Store Visit",
    copy: "Touch, feel, compare, and source family fashion directly from our Chennai location.",
    icon: MapPin,
  },
];

const testimonials = [
  {
    name: "Priya M.",
    title: "Retail Customer • Chennai",
    quote:
      "This feels like a premium fashion website, not a local shop page. The banners, products, and styling experience feel beautiful and polished.",
    image: bannerImages[0],
  },
  {
    name: "Karthik S.",
    title: "Family Occasion Buyer",
    quote:
      "We ordered across women and kids collections. The visual presentation, premium feeling, and WhatsApp support were excellent.",
    image: bannerImages[7],
  },
  {
    name: "Dealer Partner",
    title: "Wholesale Buyer • Tamil Nadu",
    quote:
      "The wholesale section feels structured and trustworthy. Great for resellers and family fashion store owners.",
    image: bannerImages[6],
  },
];

const megaMenu = {
  Women: ["Kurtis", "Sarees", "Dresses", "Tops", "Salwar Sets"],
  Kids: ["Shirts", "T-Shirts", "Party Wear", "Ethnic Wear", "Frocks", "Gowns", "Gift Sets"],
  Collections: ["New Arrivals", "Festival Collection", "Wedding Collection", "Cotton Collection", "Best Sellers"],
  Wholesale: ["Dealer Registration", "Bulk Orders", "Reseller Program", "GST Buyers"],
} as const;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getDiscount(product: Product) {
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
}

function byId(id: string) {
  return products.find((item) => item.id === id);
}

function LogoMark({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img src="/jr-logo.svg" alt="JEEV RUTHI COLLECTIONS logo" className={compact ? "h-12 w-auto" : "h-16 w-auto"} />
      {!compact && (
        <div>
          <p className="font-display text-2xl font-semibold tracking-[0.24em] text-[#1a1a1a]">JEEV RUTHI</p>
          <p className="text-[11px] uppercase tracking-[0.38em] text-[#8b5e3c]">Fashion For Every Family</p>
        </div>
      )}
    </div>
  );
}

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ ...transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("space-y-4", align === "center" && "mx-auto max-w-3xl text-center") }>
      <div className="inline-flex items-center gap-2 rounded-full border border-[#c89b6d]/30 bg-[#f7f1eb] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.34em] text-[#8b5e3c]">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </div>
      <h2 className="font-display text-4xl leading-none text-[#1a1a1a] sm:text-5xl">{title}</h2>
      <p className="max-w-2xl text-sm leading-7 text-[#5d4a3d] sm:text-base">{description}</p>
    </div>
  );
}

function ActionButton({
  children,
  onClick,
  variant = "primary",
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition",
        variant === "primary" && "bg-gradient-to-r from-[#6b3e26] via-[#8b5e3c] to-[#c89b6d] text-white shadow-[0_18px_42px_rgba(107,62,38,0.24)]",
        variant === "secondary" && "border border-[#c89b6d]/30 bg-white text-[#6b3e26] shadow-[0_10px_28px_rgba(32,20,12,0.06)]",
        variant === "ghost" && "text-[#6b3e26] hover:bg-[#f7f1eb]",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}

function Rating({ value, reviews }: { value: number; reviews: number }) {
  return (
    <div className="flex items-center gap-2 text-xs text-[#6b5748]">
      <div className="flex items-center gap-1 text-[#8b5e3c]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className={cn("h-3.5 w-3.5", index < Math.round(value) && "fill-current")} />
        ))}
      </div>
      <span className="font-semibold text-[#1a1a1a]">{value.toFixed(1)}</span>
      <span>({reviews})</span>
    </div>
  );
}

function ProductCard({
  product,
  wishlisted,
  onOpen,
  onWishlist,
  onQuickView,
  onAddToCart,
}: {
  product: Product;
  wishlisted: boolean;
  onOpen: () => void;
  onWishlist: () => void;
  onQuickView: () => void;
  onAddToCart: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={transition}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = -((event.clientY - rect.top) / rect.height - 0.5) * 8;
        setTilt({ x, y });
      }}
      className="group cursor-pointer"
      style={{ perspective: 1400 }}
      onClick={onOpen}
    >
      <div
        className="luxury-card overflow-hidden rounded-[30px]"
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: "transform 160ms ease-out",
        }}
      >
        <div className="relative overflow-hidden p-3">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#f2e8df]">
            <img
              src={product.image}
              alt={product.name}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition duration-700",
                hovered ? "scale-110 opacity-0" : "scale-100 opacity-100",
              )}
            />
            <img
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition duration-700",
                hovered ? "scale-100 opacity-100" : "scale-110 opacity-0",
              )}
            />
            <div className="absolute left-3 top-3 flex flex-col gap-2">
              <span className="rounded-full bg-[#6b3e26] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                {getDiscount(product)}% Off
              </span>
              {product.badges.map((badge) => (
                <span key={badge} className="rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6b3e26] backdrop-blur">
                  {badge}
                </span>
              ))}
            </div>
            <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
              <ActionIconButton active={wishlisted} onClick={onWishlist} icon={<Heart className={cn("h-4 w-4", wishlisted && "fill-current")} />} />
              <ActionIconButton onClick={onQuickView} icon={<ScanSearch className="h-4 w-4" />} />
            </div>
          </div>
        </div>

        <div className="space-y-3 px-5 pb-6">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8b5e3c]">{product.category}</p>
            <p className="text-xs text-[#7a6452]">{product.department}</p>
          </div>
          <div>
            <h3 className="font-display text-[2rem] leading-none text-[#1a1a1a]">{product.name}</h3>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#5d4a3d]">{product.description}</p>
          </div>
          <Rating value={product.rating} reviews={product.reviews} />
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-lg font-bold text-[#1a1a1a]">{formatCurrency(product.price)}</p>
              <p className="text-sm text-[#9b8b7f] line-through">{formatCurrency(product.originalPrice)}</p>
            </div>
            <ActionButton
              className="px-4 py-2 text-xs"
              onClick={() => {
                onAddToCart();
              }}
            >
              Add To Cart
            </ActionButton>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ActionIconButton({ icon, onClick, active = false }: { icon: ReactNode; onClick: () => void; active?: boolean }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur transition",
        active ? "border-[#8b5e3c]/40 bg-[#f7f1eb] text-[#6b3e26]" : "border-white/65 bg-white/86 text-[#1a1a1a] hover:bg-white",
      )}
    >
      {icon}
    </button>
  );
}

function HeroSlider({ slides, onOpenScope }: { slides: typeof heroSlides; onOpenScope: (scope: Scope) => void }) {
  const [index, setIndex] = useState(0);
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 500], [0, 90]);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % slides.length), 4200);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const slide = slides[index];

  return (
    <section className="px-4 pt-8 sm:pt-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[42px] bg-[#2d1d14] text-white shadow-[0_38px_120px_rgba(32,20,12,0.18)]">
        <div className="relative min-h-[620px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <motion.img
                style={{ y: parallax }}
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-[112%] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1e110b]/75 via-[#2f1c12]/45 to-[#3d2416]/20" />
            </motion.div>
          </AnimatePresence>

          <div className="relative grid min-h-[620px] items-center gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-14">
            <motion.div key={`copy-${slide.title}`} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.34em] text-[#f3d8c0] backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                Premium Ethnic Campaign
              </div>
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.4em] text-[#f0c8a1]">JEEV RUTHI COLLECTIONS</p>
                <h1 className="font-display text-6xl leading-none sm:text-7xl xl:text-[7rem]">{slide.title}</h1>
                <p className="max-w-xl text-sm leading-8 text-white/80 sm:text-lg">{slide.subtitle}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ActionButton onClick={() => onOpenScope(slide.scope)}>{slide.cta}</ActionButton>
                <ActionButton variant="secondary" onClick={() => onOpenScope("Women")}>Shop Women</ActionButton>
                <ActionButton variant="ghost" onClick={() => onOpenScope("Kids")}>Shop Kids</ActionButton>
              </div>
            </motion.div>

            <div className="hidden lg:block" />

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between sm:left-10 sm:right-10 lg:left-14 lg:right-14">
              <div className="flex items-center gap-2">
                {slides.map((item, slideIndex) => (
                  <button
                    type="button"
                    key={item.title}
                    onClick={() => setIndex(slideIndex)}
                    className={cn(
                      "h-2.5 rounded-full transition",
                      slideIndex === index ? "w-10 bg-white" : "w-2.5 bg-white/40",
                    )}
                    aria-label={`Go to ${item.title}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setIndex((current) => (current - 1 + slides.length) % slides.length)} className="rounded-full border border-white/15 bg-white/10 p-3 backdrop-blur">
                  <ChevronLeft className="h-4 w-4 text-white" />
                </button>
                <button type="button" onClick={() => setIndex((current) => (current + 1) % slides.length)} className="rounded-full border border-white/15 bg-white/10 p-3 backdrop-blur">
                  <ChevronRight className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryScroller({ onSelect }: { onSelect: (scope: Scope, category?: string) => void }) {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeading
          eyebrow="Category Circles"
          title="Browse premium fashion the Maybell way"
          description="Swipe through circular category discovery cards with realistic campaign imagery, strong visual merchandising, and fast collection entry points."
        />
        <div className="hide-scrollbar flex gap-5 overflow-x-auto pb-3">
          {circleCategories.map((item, index) => (
            <motion.button
              type="button"
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: index * 0.05 }}
              whileHover={{ y: -8, rotate: 1.5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(item.action.scope, item.action.category)}
              className="group min-w-[145px] text-center"
            >
              <div className="luxury-outline mx-auto h-32 w-32 overflow-hidden rounded-full bg-[#f3ebe2] p-1.5 shadow-[0_18px_44px_rgba(32,20,12,0.09)] sm:h-36 sm:w-36">
                <div className="h-full w-full overflow-hidden rounded-full">
                  <img src={item.image} alt={item.label} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold text-[#1a1a1a]">{item.label}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CampaignBanner({
  title,
  subtitle,
  image,
  cta,
  onClick,
  dark = true,
  compact = false,
}: {
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  onClick: () => void;
  dark?: boolean;
  compact?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <motion.div ref={ref} whileHover={{ y: -6 }} className={cn("group relative overflow-hidden rounded-[38px]", compact ? "min-h-[420px]" : "min-h-[520px]") }>
      <motion.img src={image} alt={title} style={{ y }} className="absolute inset-0 h-[112%] w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className={cn("absolute inset-0", dark ? "bg-gradient-to-r from-[#20140c]/72 via-[#402719]/36 to-transparent" : "bg-gradient-to-r from-white/70 to-transparent")} />
      <div className="relative flex h-full items-end p-8 sm:p-10 lg:p-12">
        <div className={cn("max-w-xl space-y-5", dark ? "text-white" : "text-[#1a1a1a]")}>
          <p className={cn("text-xs uppercase tracking-[0.34em]", dark ? "text-[#f0c8a1]" : "text-[#8b5e3c]")}>Campaign Banner</p>
          <h3 className="font-display text-5xl leading-none sm:text-6xl">{title}</h3>
          <p className={cn("text-sm leading-7 sm:text-base", dark ? "text-white/80" : "text-[#5d4a3d]")}>{subtitle}</p>
          <ActionButton onClick={onClick}>{cta}</ActionButton>
        </div>
      </div>
    </motion.div>
  );
}

function ProductGridSection({
  eyebrow,
  title,
  description,
  products,
  wishlist,
  onExplore,
  onOpenProduct,
  onWishlist,
  onQuickView,
  onAddToCart,
}: {
  eyebrow: string;
  title: string;
  description: string;
  products: Product[];
  wishlist: string[];
  onExplore: () => void;
  onOpenProduct: (product: Product) => void;
  onWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}) {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <ActionButton variant="secondary" onClick={onExplore}>
            Explore More <ArrowRight className="h-4 w-4" />
          </ActionButton>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlisted={wishlist.includes(product.id)}
              onOpen={() => onOpenProduct(product)}
              onWishlist={() => onWishlist(product.id)}
              onQuickView={() => onQuickView(product)}
              onAddToCart={() => onAddToCart(product)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ListingPage({
  filters,
  setFilters,
  products,
  allProducts,
  wishlist,
  onOpenProduct,
  onWishlist,
  onQuickView,
  onAddToCart,
}: {
  filters: ListingFilters;
  setFilters: Dispatch<SetStateAction<ListingFilters>>;
  products: Product[];
  allProducts: Product[];
  wishlist: string[];
  onOpenProduct: (product: Product) => void;
  onWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}) {
  const categories = ["All", ...Array.from(new Set(allProducts.map((product) => product.category)))];
  const departments = ["All", ...Array.from(new Set(allProducts.map((product) => product.department)))];
  const sizes = ["All", ...Array.from(new Set(allProducts.flatMap((product) => product.sizes)))];
  const colors = ["All", ...Array.from(new Set(allProducts.flatMap((product) => product.colors)))];

  return (
    <section className="px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl space-y-10">
        <Reveal>
          <div className="overflow-hidden rounded-[38px] bg-[#2f1c12] text-white shadow-[0_30px_90px_rgba(32,20,12,0.16)]">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="p-8 sm:p-10 lg:p-12">
                <p className="text-xs uppercase tracking-[0.34em] text-[#f0c8a1]">Luxury Listing</p>
                <h1 className="mt-4 font-display text-5xl leading-none sm:text-6xl">{filters.scope}</h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/78 sm:text-base">
                  Browse a premium ethnic fashion grid with category, price, size, color, and availability filters across women, kids, festive, cotton, wedding, and best-selling edits.
                </p>
              </div>
              <div className="relative min-h-[280px]">
                <img src={bannerImages[2]} alt="Listing banner" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="luxury-card rounded-[32px] p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-full bg-[#f7f1eb] p-3 text-[#6b3e26]">
                <Filter className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#8b5e3c]">Filters</p>
                <h3 className="font-display text-3xl text-[#1a1a1a]">Refine discovery</h3>
              </div>
            </div>

            <FilterGroup title="Category">
              <PillFilter options={categories} value={filters.category} onChange={(value) => setFilters((current) => ({ ...current, category: value }))} />
            </FilterGroup>

            <FilterGroup title="Department">
              <PillFilter options={departments} value={filters.department} onChange={(value) => setFilters((current) => ({ ...current, department: value }))} compact />
            </FilterGroup>

            <FilterGroup title="Price">
              <input type="range" min={999} max={4999} step={100} value={filters.maxPrice} onChange={(event) => setFilters((current) => ({ ...current, maxPrice: Number(event.target.value) }))} className="w-full accent-[#8b5e3c]" />
              <p className="text-sm text-[#5d4a3d]">Up to {formatCurrency(filters.maxPrice)}</p>
            </FilterGroup>

            <FilterGroup title="Size">
              <PillFilter options={sizes} value={filters.size} onChange={(value) => setFilters((current) => ({ ...current, size: value }))} compact />
            </FilterGroup>

            <FilterGroup title="Color">
              <PillFilter options={colors} value={filters.color} onChange={(value) => setFilters((current) => ({ ...current, color: value }))} compact />
            </FilterGroup>

            <div className="space-y-3 border-t border-[#e5d8ca] pt-5">
              <label className="flex items-center gap-3 text-sm text-[#5d4a3d]">
                <input type="checkbox" checked={filters.discountedOnly} onChange={(event) => setFilters((current) => ({ ...current, discountedOnly: event.target.checked }))} />
                Discounted styles only
              </label>
              <label className="flex items-center gap-3 text-sm text-[#5d4a3d]">
                <input type="checkbox" checked={filters.inStockOnly} onChange={(event) => setFilters((current) => ({ ...current, inStockOnly: event.target.checked }))} />
                In stock only
              </label>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="flex flex-col gap-3 rounded-[28px] border border-[#eaded2] bg-[#faf7f2] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#8b5e3c]">Luxury Ecommerce Grid</p>
                <p className="text-sm text-[#5d4a3d]">{products.length} styles found</p>
              </div>
              <select value={filters.sortBy} onChange={(event) => setFilters((current) => ({ ...current, sortBy: event.target.value as ListingFilters["sortBy"] }))} className="rounded-full border border-[#d9c8b8] bg-white px-4 py-2 text-sm text-[#6b3e26] outline-none">
                <option>Newest</option>
                <option>Best Selling</option>
                <option>Price Low To High</option>
                <option>Price High To Low</option>
              </select>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  wishlisted={wishlist.includes(product.id)}
                  onOpen={() => onOpenProduct(product)}
                  onWishlist={() => onWishlist(product.id)}
                  onQuickView={() => onQuickView(product)}
                  onAddToCart={() => onAddToCart(product)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-[#e5d8ca] py-5 first:border-t-0 first:pt-0">
      <p className="mb-3 text-sm font-semibold text-[#1a1a1a]">{title}</p>
      {children}
    </div>
  );
}

function PillFilter({ options, value, onChange, compact = false }: { options: string[]; value: string; onChange: (value: string) => void; compact?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.slice(0, compact ? 8 : 14).map((option) => (
        <button
          type="button"
          key={option}
          onClick={() => onChange(option)}
          className={cn(
            "rounded-full border px-3 py-2 text-xs font-medium transition",
            value === option ? "border-[#c89b6d]/50 bg-[#f7f1eb] text-[#6b3e26]" : "border-[#e5d8ca] bg-white text-[#6a594b] hover:border-[#c89b6d]/45",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function ProductPage({
  product,
  related,
  recent,
  frequent,
  wishlisted,
  onWishlist,
  onAddToCart,
  onBuyNow,
  onOpenProduct,
}: {
  product: Product;
  related: Product[];
  recent: Product[];
  frequent: Product[];
  wishlisted: boolean;
  onWishlist: () => void;
  onAddToCart: (size: string, color: string, quantity: number) => void;
  onBuyNow: (size: string, color: string, quantity: number) => void;
  onOpenProduct: (product: Product) => void;
}) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("Description");
  const [pincode, setPincode] = useState("");
  const [pincodeMessage, setPincodeMessage] = useState("");
  const gallery = [product.image, product.hoverImage, product.image, product.hoverImage];

  useEffect(() => {
    setSize(product.sizes[0]);
    setColor(product.colors[0]);
    setQuantity(1);
    setTab("Description");
    setPincode("");
    setPincodeMessage("");
  }, [product]);

  const tabs: Record<string, ReactNode> = {
    Description: product.description,
    "Fabric Details": product.fabric,
    "Size Guide": `Available sizes: ${product.sizes.join(", ")}. Each style is cut for premium comfort and polished festive presentation.`,
    "Delivery Information": "Tamil Nadu: 2–4 Business Days • South India: 3–6 Business Days • Rest of India: 5–8 Business Days • Free shipping above ₹999.",
    "Return Policy": "7 day easy returns on unused products with original tags and original packaging.",
    Reviews: `${product.reviews}+ premium shoppers reviewed this style ${product.rating.toFixed(1)} stars for fit, finish, and elevated look.`,
  };

  return (
    <section className="px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl space-y-14">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-[110px_1fr]">
              <div className="hide-scrollbar flex gap-3 overflow-x-auto sm:flex-col">
                {gallery.map((image, index) => (
                  <div key={`${image}-${index}`} className="overflow-hidden rounded-[22px] border border-[#e5d8ca] bg-[#f7f1eb] p-1 sm:w-full">
                    <img src={image} alt={`${product.name} preview ${index + 1}`} className="h-24 w-24 rounded-[18px] object-cover sm:h-28 sm:w-full" />
                  </div>
                ))}
              </div>
              <div className="overflow-hidden rounded-[36px] bg-[#f3ebe2] shadow-[0_26px_80px_rgba(32,20,12,0.08)]">
                <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.45 }} src={product.image} alt={product.name} className="aspect-[4/5] h-full w-full object-cover" />
              </div>
            </div>
          </Reveal>

          <Reveal className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-[#8b5e3c]">{product.department} • {product.category}</p>
                  <h1 className="font-display text-5xl leading-none text-[#1a1a1a]">{product.name}</h1>
                </div>
                <button type="button" onClick={onWishlist} className="rounded-full border border-[#eaded2] bg-white p-3 text-[#6b3e26]">
                  <Heart className={cn("h-5 w-5", wishlisted && "fill-current")} />
                </button>
              </div>
              <Rating value={product.rating} reviews={product.reviews} />
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-[#1a1a1a]">{formatCurrency(product.price)}</span>
                <span className="text-lg text-[#9b8b7f] line-through">{formatCurrency(product.originalPrice)}</span>
                <span className="rounded-full bg-[#f7f1eb] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#8b5e3c]">Save {getDiscount(product)}%</span>
              </div>
              <p className="text-sm leading-7 text-[#5d4a3d]">{product.description}</p>
            </div>

            <div className="rounded-[32px] border border-[#eaded2] bg-[#faf7f2] p-6">
              <div className="space-y-5">
                <div>
                  <p className="mb-3 text-sm font-semibold text-[#1a1a1a]">Select Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((item) => (
                      <button type="button" key={item} onClick={() => setSize(item)} className={cn("rounded-full border px-4 py-2 text-sm font-semibold transition", size === item ? "border-[#c89b6d]/50 bg-white text-[#6b3e26]" : "border-[#e5d8ca] bg-white text-[#6a594b]") }>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-sm font-semibold text-[#1a1a1a]">Select Color</p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((item) => (
                      <button type="button" key={item} onClick={() => setColor(item)} className={cn("rounded-full border px-4 py-2 text-sm font-semibold transition", color === item ? "border-[#6b3e26] bg-[#6b3e26] text-white" : "border-[#e5d8ca] bg-white text-[#6a594b]") }>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-sm font-semibold text-[#1a1a1a]">Quantity</p>
                  <div className="flex w-fit items-center gap-3 rounded-full border border-[#e5d8ca] bg-white px-3 py-2">
                    <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="rounded-full p-2 text-[#6b3e26]">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold text-[#1a1a1a]">{quantity}</span>
                    <button type="button" onClick={() => setQuantity((current) => current + 1)} className="rounded-full p-2 text-[#6b3e26]">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <ActionButton onClick={() => onAddToCart(size, color, quantity)}>Add To Cart</ActionButton>
                  <ActionButton variant="secondary" onClick={() => onBuyNow(size, color, quantity)}>Buy Now</ActionButton>
                  <ActionButton variant="secondary" onClick={() => window.open(socialLinks.whatsapp, "_blank")}>Order Via WhatsApp</ActionButton>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <InfoMiniCard icon={<Truck className="h-5 w-5" />} title="Delivery" copy="Tamil Nadu 2–4 days" />
              <InfoMiniCard icon={<ShieldCheck className="h-5 w-5" />} title="Returns" copy="7 day easy returns" />
              <InfoMiniCard icon={<Lock className="h-5 w-5" />} title="Secure" copy="OTP + secure checkout" />
            </div>

            <div className="rounded-[32px] border border-[#eaded2] bg-white p-6 shadow-[0_20px_50px_rgba(32,20,12,0.05)]">
              <p className="mb-3 text-sm font-semibold text-[#1a1a1a]">Pincode Checker</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input value={pincode} onChange={(event) => setPincode(event.target.value)} placeholder="Enter 6-digit pincode" className="flex-1 rounded-full border border-[#e5d8ca] px-4 py-3 text-sm outline-none" />
                <ActionButton variant="secondary" onClick={() => setPincodeMessage(/^\d{6}$/.test(pincode) ? "Delivery available. Tamil Nadu: 2–4 days • South India: 3–6 days • Rest of India: 5–8 days" : "Please enter a valid 6-digit pincode")}>Check Delivery</ActionButton>
              </div>
              {pincodeMessage && <p className="mt-3 text-sm text-[#5d4a3d]">{pincodeMessage}</p>}
            </div>
          </Reveal>
        </div>

        <div className="space-y-6">
          <div className="hide-scrollbar flex gap-3 overflow-x-auto">
            {Object.keys(tabs).map((item) => (
              <button type="button" key={item} onClick={() => setTab(item)} className={cn("rounded-full border px-5 py-3 text-sm font-semibold transition", tab === item ? "border-[#c89b6d]/50 bg-[#f7f1eb] text-[#6b3e26]" : "border-[#e5d8ca] bg-white text-[#6a594b]") }>
                {item}
              </button>
            ))}
          </div>
          <div className="rounded-[32px] border border-[#eaded2] bg-[#faf7f2] p-6 text-sm leading-8 text-[#5d4a3d] sm:p-8">
            {tabs[tab]}
          </div>
        </div>

        <RelatedStrip title="Related Products" products={related} onOpenProduct={onOpenProduct} />
        <RelatedStrip title="Recently Viewed" products={recent} onOpenProduct={onOpenProduct} />
        <RelatedStrip title="Frequently Bought Together" products={frequent} onOpenProduct={onOpenProduct} />
      </div>
    </section>
  );
}

function InfoMiniCard({ icon, title, copy }: { icon: ReactNode; title: string; copy: string }) {
  return (
    <div className="rounded-[26px] border border-[#eaded2] bg-[#faf7f2] p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-[#f7f1eb] p-3 text-[#6b3e26]">{icon}</div>
        <div>
          <p className="font-semibold text-[#1a1a1a]">{title}</p>
          <p className="text-sm text-[#6a594b]">{copy}</p>
        </div>
      </div>
    </div>
  );
}

function RelatedStrip({ title, products, onOpenProduct }: { title: string; products: Product[]; onOpenProduct: (product: Product) => void }) {
  return (
    <div className="space-y-6">
      <h3 className="font-display text-4xl text-[#1a1a1a]">{title}</h3>
      <div className="hide-scrollbar flex gap-5 overflow-x-auto pb-2">
        {products.map((product) => (
          <div key={product.id} className="min-w-[280px] overflow-hidden rounded-[30px] border border-[#eaded2] bg-white shadow-[0_20px_50px_rgba(32,20,12,0.05)]">
            <button type="button" onClick={() => onOpenProduct(product)} className="block w-full text-left">
              <img src={product.image} alt={product.name} className="aspect-[4/3] w-full object-cover" />
              <div className="space-y-3 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[#8b5e3c]">{product.category}</p>
                <h4 className="font-display text-3xl text-[#1a1a1a]">{product.name}</h4>
                <p className="font-semibold text-[#1a1a1a]">{formatCurrency(product.price)}</p>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CartPage({
  items,
  subtotal,
  discount,
  shipping,
  total,
  couponCode,
  setCouponCode,
  onApplyCoupon,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  onContinue,
}: {
  items: Array<CartItem & { product: Product }>;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponCode: string;
  setCouponCode: (value: string) => void;
  onApplyCoupon: () => void;
  onUpdateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  onRemove: (productId: string, size: string, color: string) => void;
  onCheckout: () => void;
  onContinue: () => void;
}) {
  return (
    <section className="px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeading eyebrow="Cart" title="Premium bag review before checkout" description="Update quantity, apply a coupon, estimate shipping, and review your luxury brown themed order summary." />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="rounded-[32px] border border-dashed border-[#d8c8b9] bg-[#faf7f2] p-10 text-center">
                <ShoppingBag className="mx-auto h-10 w-10 text-[#6b3e26]" />
                <h3 className="mt-4 font-display text-4xl text-[#1a1a1a]">Your bag is empty</h3>
                <p className="mt-3 text-sm text-[#5d4a3d]">Browse women, kids, festive, and wedding edits to build your premium JR order.</p>
                <ActionButton className="mt-6" onClick={onContinue}>Continue Shopping</ActionButton>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="luxury-card flex flex-col gap-5 rounded-[30px] p-5 sm:flex-row">
                  <img src={item.product.image} alt={item.product.name} className="h-40 w-full rounded-[24px] object-cover sm:w-32" />
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-[#8b5e3c]">{item.product.category}</p>
                        <h3 className="font-display text-3xl text-[#1a1a1a]">{item.product.name}</h3>
                        <p className="text-sm text-[#6a594b]">{item.size} • {item.color}</p>
                      </div>
                      <button type="button" onClick={() => onRemove(item.productId, item.size, item.color)} className="text-sm font-semibold text-[#8b5e3c] underline underline-offset-4">
                        Remove
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3 rounded-full border border-[#e5d8ca] bg-white px-3 py-2">
                        <button type="button" onClick={() => onUpdateQuantity(item.productId, item.size, item.color, item.quantity - 1)} className="rounded-full p-2 text-[#6b3e26]">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-semibold text-[#1a1a1a]">{item.quantity}</span>
                        <button type="button" onClick={() => onUpdateQuantity(item.productId, item.size, item.color, item.quantity + 1)} className="rounded-full p-2 text-[#6b3e26]">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-semibold text-[#1a1a1a]">{formatCurrency(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="space-y-5">
            <div className="luxury-card rounded-[30px] p-6">
              <h3 className="font-display text-3xl text-[#1a1a1a]">Coupon Code</h3>
              <div className="mt-4 flex gap-3">
                <input value={couponCode} onChange={(event) => setCouponCode(event.target.value)} className="flex-1 rounded-full border border-[#e5d8ca] px-4 py-3 text-sm outline-none" />
                <ActionButton variant="secondary" onClick={onApplyCoupon}>Apply</ActionButton>
              </div>
              <p className="mt-3 text-sm text-[#6a594b]">Use FAMILY15 or FESTIVE15.</p>
            </div>
            <div className="luxury-card rounded-[30px] p-6">
              <h3 className="font-display text-3xl text-[#1a1a1a]">Order Summary</h3>
              <div className="mt-6 space-y-4 text-sm text-[#5d4a3d]">
                <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />
                <SummaryRow label="Discount" value={`- ${formatCurrency(discount)}`} />
                <SummaryRow label="Shipping" value={shipping === 0 ? "Free" : formatCurrency(shipping)} />
                <SummaryRow label="Free Shipping" value="Above ₹999" subtle />
                <div className="border-t border-[#eaded2] pt-4">
                  <SummaryRow label="Total" value={formatCurrency(total)} strong />
                </div>
              </div>
              <ActionButton className="mt-6 w-full" onClick={onCheckout}>Proceed To Checkout</ActionButton>
              <ActionButton variant="ghost" className="mt-2 w-full" onClick={onContinue}>Continue Shopping</ActionButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryRow({ label, value, strong = false, subtle = false }: { label: string; value: string; strong?: boolean; subtle?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={cn(strong && "font-semibold text-[#1a1a1a]", subtle && "text-[#8b5e3c]")}>{label}</span>
      <span className={cn(strong && "font-semibold text-[#1a1a1a]", subtle && "text-[#8b5e3c]")}>{value}</span>
    </div>
  );
}

function CheckoutPage({ isLoggedIn, items, subtotal, discount, shipping, total, onLogin, onPay }: { isLoggedIn: boolean; items: Array<CartItem & { product: Product }>; subtotal: number; discount: number; shipping: number; total: number; onLogin: () => void; onPay: () => void }) {
  if (!isLoggedIn) {
    return (
      <section className="px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-5xl rounded-[38px] border border-[#eaded2] bg-white p-10 text-center shadow-[0_24px_70px_rgba(32,20,12,0.08)]">
          <LogoMark className="justify-center" />
          <h1 className="mt-8 font-display text-5xl text-[#1a1a1a]">Login required for checkout</h1>
          <p className="mt-4 text-sm leading-7 text-[#5d4a3d]">Guest users can browse freely, but checkout, buy now, wishlist, and cart actions require premium account access.</p>
          <ActionButton className="mt-8" onClick={onLogin}>Open Premium Login</ActionButton>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeading eyebrow="Checkout" title="Secure checkout with premium trust signals" description="Complete your order with secure payment, saved addresses, delivery instructions, and Razorpay-ready payment UX." />
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5">
            <div className="luxury-card rounded-[30px] p-6">
              <h3 className="font-display text-3xl text-[#1a1a1a]">Saved Addresses</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  "Home • Porur, Chennai",
                  "Office • Kundrathur Main Road",
                ].map((address) => (
                  <div key={address} className="rounded-[24px] border border-[#eaded2] bg-[#faf7f2] p-4">
                    <p className="font-semibold text-[#1a1a1a]">{address}</p>
                    <p className="mt-2 text-sm leading-6 text-[#6a594b]">Premium address card with landmark, pincode, and alternate mobile support.</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="luxury-card rounded-[30px] p-6">
              <h3 className="font-display text-3xl text-[#1a1a1a]">New Address</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {["Full Name", "Phone Number", "Email Address", "Pincode", "City", "State"].map((field) => (
                  <input key={field} placeholder={field} className="rounded-2xl border border-[#e5d8ca] px-4 py-3 text-sm outline-none" />
                ))}
                <textarea placeholder="Full Address" className="min-h-28 rounded-2xl border border-[#e5d8ca] px-4 py-3 text-sm outline-none sm:col-span-2" />
              </div>
            </div>

            <div className="luxury-card rounded-[30px] p-6">
              <h3 className="font-display text-3xl text-[#1a1a1a]">Delivery Instructions</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {["Call Before Delivery", "Leave At Door", "Deliver To Security", "Alternate Number"].map((item) => (
                  <label key={item} className="flex items-center gap-3 rounded-2xl border border-[#eaded2] bg-[#faf7f2] px-4 py-3 text-sm text-[#5d4a3d]">
                    <input type="checkbox" />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="luxury-card rounded-[30px] p-6">
              <h3 className="font-display text-3xl text-[#1a1a1a]">Order Summary</h3>
              <div className="mt-5 space-y-4">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}-${item.color}`} className="flex items-center gap-4 rounded-[22px] border border-[#eaded2] bg-[#faf7f2] p-3">
                    <img src={item.product.image} alt={item.product.name} className="h-20 w-20 rounded-[18px] object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-[#1a1a1a]">{item.product.name}</p>
                      <p className="text-sm text-[#6a594b]">{item.size} • {item.color} • Qty {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[#1a1a1a]">{formatCurrency(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-4 border-t border-[#eaded2] pt-4 text-sm text-[#5d4a3d]">
                <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />
                <SummaryRow label="Discount" value={`- ${formatCurrency(discount)}`} />
                <SummaryRow label="Shipping" value={shipping === 0 ? "Free" : formatCurrency(shipping)} />
                <SummaryRow label="Total" value={formatCurrency(total)} strong />
              </div>
            </div>

            <div className="luxury-card rounded-[30px] p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#6b3e26] p-3 text-white">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-[#8b5e3c]">Payment Methods</p>
                  <h3 className="font-display text-3xl text-[#1a1a1a]">Razorpay-ready checkout</h3>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: CreditCard, label: "Debit & Credit Cards" },
                  { icon: Wallet, label: "UPI / Paytm / Wallets" },
                  { icon: Landmark, label: "Net Banking" },
                  { icon: ShoppingBag, label: "Cash On Delivery" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-[22px] border border-[#eaded2] bg-[#faf7f2] p-4">
                      <div className="flex items-center gap-3 text-[#5d4a3d]">
                        <Icon className="h-5 w-5 text-[#6b3e26]" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-5 text-sm leading-7 text-[#5d4a3d]">UI is prepared for Razorpay Standard Checkout. Connect your live Key ID and server-side Orders API for real payments, verification, and settlements.</p>
              <ActionButton className="mt-6 w-full" onClick={onPay}>Proceed To Razorpay</ActionButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AccountPage({ isLoggedIn, onLogin, wishlistProducts, recentOrders, onOpenProduct }: { isLoggedIn: boolean; onLogin: () => void; wishlistProducts: Product[]; recentOrders: Array<CartItem & { product: Product }>; onOpenProduct: (product: Product) => void }) {
  if (!isLoggedIn) {
    return (
      <section className="px-4 py-10 sm:py-14">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[38px] border border-[#eaded2] bg-white shadow-[0_30px_90px_rgba(32,20,12,0.08)] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="bg-[#2f1c12] p-8 text-white sm:p-10">
            <LogoMark compact />
            <p className="mt-8 text-xs uppercase tracking-[0.34em] text-[#f0c8a1]">Premium Login</p>
            <h1 className="mt-4 font-display text-5xl leading-none">Access your luxury account experience</h1>
            <p className="mt-5 text-sm leading-7 text-white/75 sm:text-base">Mobile OTP login, Google login, email login, wishlist access, order tracking, saved addresses, and faster premium shopping workflows.</p>
          </div>
          <div className="p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.28em] text-[#8b5e3c]">Member Access</p>
            <h2 className="mt-3 font-display text-5xl text-[#1a1a1a]">Sign in</h2>
            <div className="mt-8 grid gap-4">
              <input placeholder="Mobile number or email" className="rounded-2xl border border-[#e5d8ca] px-4 py-3 text-sm outline-none" />
              <ActionButton onClick={onLogin}>Continue With Mobile OTP</ActionButton>
              <ActionButton variant="secondary" onClick={onLogin}>Continue With Google</ActionButton>
              <ActionButton variant="secondary" onClick={onLogin}>Continue With Email</ActionButton>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl space-y-10">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#8b5e3c]">Customer Account</p>
          <h1 className="font-display text-5xl text-[#1a1a1a]">JR Member Dashboard</h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {["Dashboard", "Orders", "Wishlist", "Addresses", "Saved Payments", "Returns", "Support Tickets", "Order Tracking"].map((item, index) => (
            <Reveal key={item} delay={index * 0.04}>
              <div className="luxury-card rounded-[28px] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[#8b5e3c]">Member Area</p>
                <h3 className="mt-3 font-display text-3xl text-[#1a1a1a]">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6a594b]">Premium access to {item.toLowerCase()} and smoother repeat purchases.</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="luxury-card rounded-[30px] p-6">
            <h3 className="font-display text-3xl text-[#1a1a1a]">Recent Orders</h3>
            <div className="mt-5 space-y-4">
              {recentOrders.slice(0, 3).map((order) => (
                <div key={`${order.productId}-${order.size}`} className="flex items-center gap-4 rounded-[22px] border border-[#eaded2] bg-[#faf7f2] p-4">
                  <img src={order.product.image} alt={order.product.name} className="h-20 w-20 rounded-[18px] object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-[#1a1a1a]">{order.product.name}</p>
                    <p className="text-sm text-[#6a594b]">Packed • Qty {order.quantity}</p>
                  </div>
                  <span className="rounded-full bg-[#6b3e26] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">Packed</span>
                </div>
              ))}
            </div>
          </div>
          <div className="luxury-card rounded-[30px] p-6">
            <h3 className="font-display text-3xl text-[#1a1a1a]">Wishlist</h3>
            <div className="mt-5 space-y-4">
              {wishlistProducts.slice(0, 3).map((product) => (
                <button type="button" key={product.id} onClick={() => onOpenProduct(product)} className="flex w-full items-center gap-4 rounded-[22px] border border-[#eaded2] bg-[#faf7f2] p-4 text-left">
                  <img src={product.image} alt={product.name} className="h-20 w-20 rounded-[18px] object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-[#1a1a1a]">{product.name}</p>
                    <p className="text-sm text-[#6a594b]">{formatCurrency(product.price)}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#6b3e26]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WholesalePage() {
  return (
    <section className="px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl space-y-10">
        <CampaignBanner title="Wholesale Banner" subtitle="Dealer registration, reseller support, GST buyer onboarding, and premium bulk fashion access across Tamil Nadu and India." image={bannerImages[6]} cta="Register As Dealer" onClick={() => window.open(socialLinks.whatsapp, "_blank")} />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="luxury-card rounded-[30px] p-6 sm:p-8">
            <h2 className="font-display text-4xl text-[#1a1a1a]">Dealer Registration & Bulk Orders</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Business Name", "Contact Person", "Phone Number", "WhatsApp Number", "Email Address", "GST Number", "City", "State"].map((field) => (
                <input key={field} placeholder={field} className="rounded-2xl border border-[#e5d8ca] px-4 py-3 text-sm outline-none" />
              ))}
              <select className="rounded-2xl border border-[#e5d8ca] px-4 py-3 text-sm outline-none sm:col-span-2">
                <option>Buyer Type</option>
                <option>Dealer Registration</option>
                <option>Reseller Program</option>
                <option>GST Buyer</option>
                <option>Bulk Orders</option>
              </select>
              <textarea placeholder="Collection requirements / order notes" className="min-h-32 rounded-2xl border border-[#e5d8ca] px-4 py-3 text-sm outline-none sm:col-span-2" />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ActionButton>Register Now</ActionButton>
              <ActionButton variant="secondary" onClick={() => window.open(socialLinks.whatsapp, "_blank")}>WhatsApp Wholesale Contact</ActionButton>
              <ActionButton variant="secondary" onClick={() => window.open(socialLinks.meesho, "_blank")}>Catalogue Download</ActionButton>
            </div>
          </div>
          <div className="space-y-5">
            {[
              { title: "Bulk Orders", copy: "Premium sourcing for boutiques, family stores, and seasonal buying." },
              { title: "Dealer Registration", copy: "Priority pricing and faster communication for long-term partners." },
              { title: "Reseller Program", copy: "Built for online sellers, home sellers, and social resellers." },
              { title: "GST Buyers", copy: "Business-friendly documentation and GST-ready invoicing support." },
            ].map((item) => (
              <div key={item.title} className="luxury-card rounded-[30px] p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-[#8b5e3c]">Wholesale</p>
                <h3 className="mt-3 font-display text-3xl text-[#1a1a1a]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#5d4a3d]">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="About Us"
            title="A Chennai-based premium family fashion and wholesale brand"
            description="JEEV RUTHI COLLECTIONS is a Chennai-based fashion retailer and wholesaler offering premium quality women’s wear, kids wear, festive collections, party wear and family fashion at affordable prices. We proudly serve retail customers, wholesale buyers, dealers and resellers across Tamil Nadu and India. Our mission is to provide stylish, affordable and high-quality fashion for every family."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              "Women Wear",
              "Kids Wear",
              "Wholesale & Retail",
            ].map((item) => (
              <div key={item} className="luxury-card rounded-[28px] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[#8b5e3c]">JEEV RUTHI</p>
                <p className="mt-3 font-display text-3xl text-[#1a1a1a]">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-[38px]">
          <img src={bannerImages[2]} alt="About JR" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeading eyebrow="Contact Us" title="Retail assistance, wholesale queries, store visits, and social support" description="Reach the JR team for collection guidance, order help, reseller onboarding, WhatsApp shopping, and premium customer support." />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="luxury-card rounded-[30px] p-6 sm:p-8">
            <h2 className="font-display text-4xl text-[#1a1a1a]">Contact Form</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Full Name", "Phone Number", "Email Address", "Subject"].map((field) => (
                <input key={field} placeholder={field} className="rounded-2xl border border-[#e5d8ca] px-4 py-3 text-sm outline-none" />
              ))}
              <textarea placeholder="Tell us how we can help" className="min-h-36 rounded-2xl border border-[#e5d8ca] px-4 py-3 text-sm outline-none sm:col-span-2" />
            </div>
            <ActionButton className="mt-6">Send Message</ActionButton>
          </div>
          <div className="space-y-5">
            <div className="luxury-card rounded-[30px] p-6">
              <h3 className="font-display text-3xl text-[#1a1a1a]">Direct Contact</h3>
              <div className="mt-5 grid gap-3">
                {[
                  { icon: Phone, label: "+91 93636 97498", href: socialLinks.phone },
                  { icon: MessageCircle, label: "WhatsApp", href: socialLinks.whatsapp },
                  { icon: Mail, label: "Yuvavishnu2426@gmail.com", href: socialLinks.email },
                  { icon: Camera, label: "Instagram", href: socialLinks.instagram },
                  { icon: Play, label: "YouTube", href: socialLinks.youtube },
                  { icon: Store, label: "Meesho Store", href: socialLinks.meesho },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-4 rounded-[22px] border border-[#eaded2] bg-[#faf7f2] p-4 text-[#5d4a3d]">
                      <div className="rounded-full bg-[#f7f1eb] p-3 text-[#6b3e26]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="luxury-card rounded-[30px] p-6">
              <h3 className="font-display text-3xl text-[#1a1a1a]">Store Details</h3>
              <div className="mt-5 space-y-4 text-sm leading-7 text-[#5d4a3d]">
                <p><strong className="text-[#1a1a1a]">Address:</strong> No.81, Vigneshwara Nagar, Kundrathur Main Road, Porur, Chennai – 600116, Tamil Nadu, India</p>
                <p><strong className="text-[#1a1a1a]">Hours:</strong> Monday – Sunday • 9:00 AM – 9:00 PM</p>
              </div>
              <div className="mt-5 overflow-hidden rounded-[26px] border border-[#eaded2]">
                <iframe title="JR map" src="https://www.google.com/maps?q=No.81%2C%20Vigneshwara%20Nagar%2C%20Kundrathur%20Main%20Road%2C%20Porur%2C%20Chennai%20600116&output=embed" className="h-64 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <ActionButton className="mt-5" onClick={() => window.open(socialLinks.directions, "_blank")}>Directions</ActionButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrackOrderPage() {
  return (
    <section className="px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-5xl space-y-10">
        <SectionHeading eyebrow="Track Order" title="Track every step of your JR delivery" description="Use your order ID or mobile number to review dispatch milestones from packed to delivered." align="center" />
        <div className="luxury-card rounded-[32px] p-6 text-center sm:p-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-3 rounded-full border border-[#e5d8ca] bg-[#faf7f2] p-2 sm:flex-row">
            <input placeholder="Enter order ID or mobile number" className="flex-1 bg-transparent px-4 py-3 text-sm outline-none" />
            <ActionButton>Track Now</ActionButton>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-4">
            {["Order Confirmed", "Packed", "Shipped", "Out For Delivery"].map((item, index) => (
              <div key={item} className="space-y-3">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#6b3e26] text-lg font-bold text-white">{index + 1}</div>
                <p className="font-semibold text-[#1a1a1a]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onNavigate, onOpenScope }: { onNavigate: (page: Page) => void; onOpenScope: (scope: Scope, category?: string) => void }) {
  return (
    <footer className="border-t border-[#eaded2] bg-[#18110d] px-4 pb-28 pt-16 text-white sm:pb-16">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_repeat(4,1fr)]">
          <div className="space-y-5">
            <LogoMark compact />
            <p className="max-w-sm text-sm leading-7 text-white/72">JEEV RUTHI COLLECTIONS brings together premium ethnic storytelling, luxury ecommerce UX, women wear, kids wear, wholesale access, and family fashion discovery.</p>
            <div className="flex items-center gap-3">
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-3 text-white/75 transition hover:text-[#c89b6d]"><Camera className="h-4 w-4" /></a>
              <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-3 text-white/75 transition hover:text-[#c89b6d]"><Play className="h-4 w-4" /></a>
              <a href={socialLinks.meesho} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/75 transition hover:text-[#c89b6d]">Meesho</a>
            </div>
          </div>
          <FooterColumn title="Shop" links={[["Women", () => onOpenScope("Women")], ["Kids", () => onOpenScope("Kids")], ["New Arrivals", () => onOpenScope("New Arrivals")], ["Best Sellers", () => onOpenScope("Best Sellers")], ["Offers", () => onOpenScope("Offers")]]} />
          <FooterColumn title="Customer Service" links={[["Contact Us", () => onNavigate("contact")], ["FAQ", () => onNavigate("contact")], ["Shipping Policy", () => onNavigate("contact")], ["Return Policy", () => onNavigate("contact")], ["Privacy Policy", () => onNavigate("about")], ["Terms & Conditions", () => onNavigate("about")]]} />
          <FooterColumn title="Wholesale" links={[["Dealer Registration", () => onNavigate("wholesale")], ["Bulk Orders", () => onNavigate("wholesale")], ["Reseller Program", () => onNavigate("wholesale")]]} />
          <div>
            <h3 className="font-display text-3xl text-white">Contact</h3>
            <div className="mt-4 space-y-3 text-sm leading-7 text-white/72">
              <p>No.81, Vigneshwara Nagar, Kundrathur Main Road, Porur, Chennai – 600116</p>
              <a href={socialLinks.phone} className="block">+91 93636 97498</a>
              <a href={socialLinks.whatsapp} className="block">WhatsApp</a>
              <a href={socialLinks.email} className="block">Yuvavishnu2426@gmail.com</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.26em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© JEEV RUTHI COLLECTIONS. All Rights Reserved.</p>
          <p>Secure Payments • OTP Login • Easy Returns • COD Available</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<[string, () => void]> }) {
  return (
    <div>
      <h3 className="font-display text-3xl text-white">{title}</h3>
      <div className="mt-4 space-y-3 text-sm text-white/72">
        {links.map(([label, action]) => (
          <button type="button" key={label} onClick={action} className="block text-left transition hover:text-[#c89b6d]">
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MobileBottomNav({ onNavigate, onOpenScope, onSearch }: { onNavigate: (page: Page) => void; onOpenScope: (scope: Scope, category?: string) => void; onSearch: () => void }) {
  const items = [
    { label: "Home", icon: Home, action: () => onNavigate("home") },
    { label: "Categories", icon: Grid2x2, action: () => onOpenScope("All") },
    { label: "Search", icon: Search, action: onSearch },
    { label: "Wishlist", icon: Heart, action: () => onNavigate("account") },
    { label: "Account", icon: UserRound, action: () => onNavigate("account") },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-[#eaded2] bg-white/95 px-2 py-2 backdrop-blur lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button type="button" key={item.label} onClick={item.action} className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6a594b]">
              <Icon className="h-4 w-4 text-[#6b3e26]" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Header({
  activePage,
  announcement,
  cartCount,
  wishlistCount,
  mobileOpen,
  setMobileOpen,
  onNavigate,
  onOpenScope,
  onSearch,
}: {
  activePage: Page;
  announcement: string;
  cartCount: number;
  wishlistCount: number;
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
  onNavigate: (page: Page) => void;
  onOpenScope: (scope: Scope, category?: string) => void;
  onSearch: () => void;
}) {
  const [mega, setMega] = useState<keyof typeof megaMenu | null>(null);
  const navItems = [
    { label: "Home", action: () => onNavigate("home") },
    { label: "Women", action: () => onOpenScope("Women") },
    { label: "Kids", action: () => onOpenScope("Kids") },
    { label: "Collections", action: () => onOpenScope("All") },
    { label: "Wholesale", action: () => onNavigate("wholesale") },
    { label: "Offers", action: () => onOpenScope("Offers") },
    { label: "About Us", action: () => onNavigate("about") },
    { label: "Contact Us", action: () => onNavigate("contact") },
    { label: "Track Order", action: () => onNavigate("track") },
  ];

  return (
    <header className="sticky top-0 z-[100]">
      <div className="border-b border-[#d8c8b9] bg-[#fffaf6] px-4 py-2">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 text-xs uppercase tracking-[0.26em] text-[#8b5e3c]">
          <AnimatePresence mode="wait">
            <motion.p key={announcement} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="font-medium">
              {announcement}
            </motion.p>
          </AnimatePresence>
          <div className="hidden items-center gap-3 sm:flex">
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="text-[#6b3e26]"><Camera className="h-4 w-4" /></a>
            <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="text-[#6b3e26]"><Play className="h-4 w-4" /></a>
            <a href={socialLinks.meesho} target="_blank" rel="noreferrer" className="text-[#6b3e26]"><Store className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="glass-panel border-b border-[#eaded2] px-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 py-4">
          <button type="button" onClick={() => onNavigate("home")} className="shrink-0 text-left">
            <LogoMark compact />
          </button>

          <nav className="hidden items-center gap-5 lg:flex" onMouseLeave={() => setMega(null)}>
            {navItems.map((item) => {
              const hasMega = item.label in megaMenu;
              return (
                <div key={item.label} className="relative">
                  <button
                    type="button"
                    onMouseEnter={() => setMega(hasMega ? (item.label as keyof typeof megaMenu) : null)}
                    onClick={item.action}
                    className={cn("flex items-center gap-1 text-sm font-semibold text-[#5d4a3d] transition hover:text-[#6b3e26]", activePage === "home" && item.label === "Home" && "text-[#6b3e26]")}
                  >
                    {item.label}
                    {hasMega && <ChevronDown className="h-4 w-4" />}
                  </button>
                  <AnimatePresence>
                    {mega === item.label && (
                      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="absolute left-1/2 top-full z-40 mt-6 w-[760px] -translate-x-1/2 rounded-[32px] border border-[#eaded2] bg-white p-6 shadow-[0_24px_60px_rgba(32,20,12,0.12)]">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                          {megaMenu[item.label as keyof typeof megaMenu].map((link) => (
                            <button
                              type="button"
                              key={link}
                              onClick={() => {
                                if (link === "New Arrivals") onOpenScope("New Arrivals");
                                else if (link === "Festival Collection") onOpenScope("Festival Collection");
                                else if (link === "Wedding Collection") onOpenScope("Wedding Collection");
                                else if (link === "Cotton Collection") onOpenScope("Cotton Collection");
                                else if (link === "Best Sellers") onOpenScope("Best Sellers");
                                else if (["Kurtis", "Sarees", "Dresses", "Tops", "Salwar Sets"].includes(link)) onOpenScope("Women", link);
                                else if (["Shirts", "T-Shirts", "Party Wear", "Ethnic Wear", "Frocks", "Gowns", "Gift Sets"].includes(link)) onOpenScope("Kids", link);
                                else onNavigate("wholesale");
                              }}
                              className="rounded-[22px] border border-[#f0e5db] bg-[#faf7f2] px-4 py-4 text-left text-sm font-medium text-[#5d4a3d] transition hover:border-[#c89b6d]/45 hover:text-[#6b3e26]"
                            >
                              {link}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <HeaderIcon label="Search" icon={<Search className="h-4 w-4" />} onClick={onSearch} />
            <HeaderIcon label="Wishlist" icon={<Heart className="h-4 w-4" />} count={wishlistCount} onClick={() => onNavigate("account")} />
            <HeaderIcon label="Account" icon={<UserRound className="h-4 w-4" />} onClick={() => onNavigate("account")} />
            <HeaderIcon label="Cart" icon={<ShoppingBag className="h-4 w-4" />} count={cartCount} onClick={() => onNavigate("cart")} />
            <button type="button" onClick={() => setMobileOpen((current) => !current)} className="ml-1 flex h-11 w-11 items-center justify-center rounded-full border border-[#eaded2] text-[#6b3e26] lg:hidden">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="border-b border-[#eaded2] bg-white/96 px-4 py-5 backdrop-blur lg:hidden">
            <div className="mx-auto max-w-7xl space-y-3">
              {navItems.map((item) => (
                <button type="button" key={item.label} onClick={item.action} className="flex w-full items-center justify-between rounded-2xl border border-[#eaded2] bg-[#faf7f2] px-4 py-3 text-left text-sm font-semibold text-[#5d4a3d]">
                  <span>{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-[#6b3e26]" />
                </button>
              ))}
              <div className="flex items-center gap-3 pt-3">
                <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-[#eaded2] p-3 text-[#6b3e26]"><Camera className="h-4 w-4" /></a>
                <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="rounded-full border border-[#eaded2] p-3 text-[#6b3e26]"><Play className="h-4 w-4" /></a>
                <a href={socialLinks.meesho} target="_blank" rel="noreferrer" className="rounded-full border border-[#eaded2] px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#6b3e26]">Meesho</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeaderIcon({ label, icon, count, onClick }: { label: string; icon: ReactNode; count?: number; onClick: () => void }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#eaded2] bg-white/85 text-[#6b3e26] transition hover:-translate-y-0.5">
      {icon}
      {count ? <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#6b3e26] px-1 text-[10px] font-bold text-white">{count}</span> : null}
    </button>
  );
}

function AuthModal({ open, onClose, onSuccess, reason }: { open: boolean; onClose: () => void; onSuccess: (method: string) => void; reason: string }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] bg-black/55 p-4 backdrop-blur" onClick={onClose}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} onClick={(event) => event.stopPropagation()} className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-[38px] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.2)] lg:grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="bg-[#2f1c12] p-8 text-white sm:p-10">
              <LogoMark compact />
              <p className="mt-8 text-xs uppercase tracking-[0.34em] text-[#f0c8a1]">Premium Login Required</p>
              <h2 className="mt-4 font-display text-5xl leading-none">Continue your luxury shopping journey</h2>
              <p className="mt-5 text-sm leading-7 text-white/76 sm:text-base">Browse freely, then unlock wishlist, add to cart, buy now, and checkout with premium account access.</p>
            </div>
            <div className="p-8 sm:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#8b5e3c]">Authentication</p>
                  <h3 className="mt-2 font-display text-4xl text-[#1a1a1a]">Sign in to continue</h3>
                </div>
                <button type="button" onClick={onClose} className="rounded-full border border-[#eaded2] p-2 text-[#6b3e26]"><X className="h-5 w-5" /></button>
              </div>
              <p className="mt-4 rounded-2xl bg-[#faf7f2] px-4 py-3 text-sm text-[#5d4a3d]">{reason}</p>
              <div className="mt-6 grid gap-4">
                <input placeholder="Mobile number or email" className="rounded-2xl border border-[#e5d8ca] px-4 py-3 text-sm outline-none" />
                <ActionButton onClick={() => onSuccess("Mobile OTP")}>Continue With Mobile OTP</ActionButton>
                <ActionButton variant="secondary" onClick={() => onSuccess("Google")}>Continue With Google</ActionButton>
                <ActionButton variant="secondary" onClick={() => onSuccess("Email")}>Continue With Email</ActionButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [loading, setLoading] = useState(true);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([products[0].id]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authReason, setAuthReason] = useState("Login required to continue.");
  const pendingActionRef = useRef<null | (() => void)>(null);
  const [couponCode, setCouponCode] = useState("FAMILY15");
  const [couponApplied, setCouponApplied] = useState(true);
  const [filters, setFilters] = useState<ListingFilters>({
    scope: "Women",
    category: "All",
    department: "All",
    color: "All",
    size: "All",
    maxPrice: 4999,
    sortBy: "Newest",
    discountedOnly: false,
    inStockOnly: false,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setAnnouncementIndex((current) => (current + 1) % announcements.length), 2800);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

  const cartDetailed = useMemo(
    () =>
      cart
        .map((item) => ({ ...item, product: byId(item.productId) }))
        .filter((item): item is CartItem & { product: Product } => Boolean(item.product)),
    [cart],
  );

  const featuredWomen = useMemo(() => products.filter((product) => product.department === "Women").slice(0, 8), []);
  const featuredKids = useMemo(() => products.filter((product) => ["Kids Boys", "Kids Girls", "Baby"].includes(product.department)).slice(0, 8), []);
  const festivalProducts = useMemo(() => products.filter((product) => product.collectionTags.includes("Festival Collection")).slice(0, 8), []);
  const cottonProducts = useMemo(() => products.filter((product) => product.collectionTags.includes("Cotton Collection")).slice(0, 8), []);
  const trendingProducts = useMemo(() => products.filter((product) => product.collectionTags.includes("Trending Collection")).slice(0, 8), []);
  const bestSellers = useMemo(() => products.filter((product) => product.collectionTags.includes("Best Sellers")).slice(0, 8), []);
  const wishlistProducts = useMemo(() => products.filter((product) => wishlist.includes(product.id)), [wishlist]);

  const visibleProducts = useMemo(() => {
    let list = [...products];

    const inScope = (product: Product) => {
      switch (filters.scope) {
        case "Women":
          return product.department === "Women";
        case "Kids":
          return ["Kids Boys", "Kids Girls", "Baby"].includes(product.department);
        case "Festival Collection":
        case "Wedding Collection":
        case "Best Sellers":
        case "Trending Collection":
        case "Cotton Collection":
        case "New Arrivals":
          return product.collectionTags.includes(filters.scope);
        case "Offers":
          return getDiscount(product) >= 20;
        default:
          return true;
      }
    };

    list = list.filter(inScope);

    if (filters.category !== "All") list = list.filter((product) => product.category === filters.category);
    if (filters.department !== "All") list = list.filter((product) => product.department === filters.department);
    if (filters.color !== "All") list = list.filter((product) => product.colors.includes(filters.color));
    if (filters.size !== "All") list = list.filter((product) => product.sizes.includes(filters.size));
    list = list.filter((product) => product.price <= filters.maxPrice);
    if (filters.discountedOnly) list = list.filter((product) => getDiscount(product) >= 20);
    if (filters.inStockOnly) list = list.filter((product) => product.stock > 0);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      list = list.filter((product) => product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query) || product.collectionTags.some((tag) => tag.toLowerCase().includes(query)));
    }

    switch (filters.sortBy) {
      case "Best Selling":
        list.sort((a, b) => b.reviews - a.reviews);
        break;
      case "Price Low To High":
        list.sort((a, b) => a.price - b.price);
        break;
      case "Price High To Low":
        list.sort((a, b) => b.price - a.price);
        break;
      default:
        list.sort((a, b) => Number(b.collectionTags.includes("New Arrivals")) - Number(a.collectionTags.includes("New Arrivals")));
    }

    return list;
  }, [filters, searchQuery]);

  const subtotal = cartDetailed.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.15) : 0;
  const shipping = subtotal > 999 ? 0 : subtotal === 0 ? 0 : 99;
  const total = subtotal - discount + shipping;

  const relatedProducts = useMemo(
    () => products.filter((product) => product.department === selectedProduct.department && product.id !== selectedProduct.id).slice(0, 4),
    [selectedProduct],
  );
  const recentProducts = useMemo(() => products.filter((product) => recentlyViewed.includes(product.id) && product.id !== selectedProduct.id).slice(0, 4), [recentlyViewed, selectedProduct]);
  const frequentlyBought = useMemo(() => products.filter((product) => product.category === selectedProduct.category && product.id !== selectedProduct.id).slice(0, 4), [selectedProduct]);

  const searchSuggestions = useMemo(() => {
    const suggestions = [
      "Festival Collection",
      "Wedding Collection",
      "Cotton Collection",
      "Kurtis",
      "Sarees",
      "Kids Party Wear",
      ...products.slice(0, 8).map((product) => product.name),
    ];

    if (!searchQuery.trim()) return suggestions.slice(0, 8);
    return suggestions.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 8);
  }, [searchQuery]);

  function showToast(message: string) {
    setToast(message);
  }

  function requireAuth(action: () => void, reason: string) {
    if (!isLoggedIn) {
      pendingActionRef.current = action;
      setAuthReason(reason);
      setAuthOpen(true);
      return;
    }
    action();
  }

  function completeLogin(method: string) {
    setIsLoggedIn(true);
    setAuthOpen(false);
    showToast(`${method} login successful`);
    const pendingAction = pendingActionRef.current;
    pendingActionRef.current = null;
    pendingAction?.();
  }

  function navigate(page: Page) {
    setActivePage(page);
    setMobileMenuOpen(false);
  }

  function openScope(scope: Scope, category = "All") {
    setFilters((current) => ({ ...current, scope, category }));
    setActivePage("listing");
    setMobileMenuOpen(false);
  }

  function openProduct(product: Product) {
    setSelectedProduct(product);
    setActivePage("product");
    setRecentlyViewed((current) => [product.id, ...current.filter((id) => id !== product.id)].slice(0, 8));
  }

  function toggleWishlist(productId: string) {
    requireAuth(
      () => {
        setWishlist((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]);
        showToast(wishlist.includes(productId) ? "Removed from wishlist" : "Added to wishlist");
      },
      "Please login to save styles to your premium wishlist.",
    );
  }

  function addToCart(product: Product, size = product.sizes[0], color = product.colors[0], quantity = 1) {
    requireAuth(
      () => {
        setCart((current) => {
          const existing = current.find((item) => item.productId === product.id && item.size === size && item.color === color);
          if (existing) {
            return current.map((item) => item.productId === product.id && item.size === size && item.color === color ? { ...item, quantity: item.quantity + quantity } : item);
          }
          return [...current, { productId: product.id, quantity, size, color }];
        });
        showToast(`${product.name} added to cart`);
      },
      "Please login before adding premium styles to your bag.",
    );
  }

  function buyNow(product: Product, size = product.sizes[0], color = product.colors[0], quantity = 1) {
    requireAuth(
      () => {
        addToCartDirect(product, size, color, quantity);
        navigate("checkout");
      },
      "Please login to continue with buy now and secure checkout.",
    );
  }

  function addToCartDirect(product: Product, size = product.sizes[0], color = product.colors[0], quantity = 1) {
    setCart((current) => {
      const existing = current.find((item) => item.productId === product.id && item.size === size && item.color === color);
      if (existing) {
        return current.map((item) => item.productId === product.id && item.size === size && item.color === color ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...current, { productId: product.id, quantity, size, color }];
    });
    showToast(`${product.name} added to cart`);
  }

  function updateCartQuantity(productId: string, size: string, color: string, quantity: number) {
    setCart((current) => current.map((item) => item.productId === productId && item.size === size && item.color === color ? { ...item, quantity: Math.max(1, quantity) } : item));
  }

  function removeFromCart(productId: string, size: string, color: string) {
    setCart((current) => current.filter((item) => !(item.productId === productId && item.size === size && item.color === color)));
    showToast("Item removed from cart");
  }

  function applyCoupon() {
    const normalized = couponCode.trim().toUpperCase();
    if (normalized === "FAMILY15" || normalized === "FESTIVE15") {
      setCouponApplied(true);
      showToast("Luxury coupon applied");
    } else {
      setCouponApplied(false);
      showToast("Invalid coupon code");
    }
  }

  function beginCheckout() {
    requireAuth(() => navigate("checkout"), "Please login to continue to secure checkout.");
  }

  function openRazorpay() {
    showToast("Razorpay UI is ready. Connect live key and Orders API for production payments.");
  }

  const pageContent = (
    <AnimatePresence mode="wait">
      <motion.main key={activePage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
        {activePage === "home" && (
          <div>
            <HeroSlider slides={heroSlides} onOpenScope={(scope) => openScope(scope)} />
            <CategoryScroller onSelect={(scope, category) => openScope(scope, category)} />

            <section className="px-4 py-16 sm:py-20">
              <div className="mx-auto max-w-7xl space-y-10">
                <SectionHeading eyebrow="Featured Collections" title="Premium collection storytelling with campaign-first discovery" description="Editorially merchandised entry points inspired by premium ethnic and beauty ecommerce experiences, built for exploration, aspiration, and conversion." />
                <div className="grid gap-6 lg:grid-cols-3">
                  {featuredCollections.map((item, index) => (
                    <Reveal key={item.title} delay={index * 0.06}>
                      <CampaignBanner title={item.title} subtitle={item.copy} image={item.image} cta="Explore Collection" onClick={() => item.title.includes("Wholesale") ? navigate("wholesale") : openScope(item.scope)} compact />
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            <ProductGridSection eyebrow="Women’s Collection" title="Premium women’s fashion curated for modern family wardrobes" description="Discover kurtis, sarees, dresses, tops, and salwar sets through high-end visuals, product motion, and elevated merchandising." products={featuredWomen} wishlist={wishlist} onExplore={() => openScope("Women")} onOpenProduct={openProduct} onWishlist={toggleWishlist} onQuickView={setQuickView} onAddToCart={(product) => addToCart(product)} />
            <ProductGridSection eyebrow="Kids Collection" title="Kids fashion with premium partywear and occasion-first charm" description="Browse boys, girls, and baby collections designed for festivals, birthdays, family functions, and style-rich gifting moments." products={featuredKids} wishlist={wishlist} onExplore={() => openScope("Kids")} onOpenProduct={openProduct} onWishlist={toggleWishlist} onQuickView={setQuickView} onAddToCart={(product) => addToCart(product)} />

            <section className="px-4 py-16 sm:py-20">
              <div className="mx-auto max-w-7xl space-y-10">
                <SectionHeading eyebrow="Offer Banner Section" title="Large campaign banners built for fashion discovery" description="Visual-first campaign storytelling inspired by premium ethnic ecommerce sites, placed between discovery sections for stronger browsing flow." />
                <div className="grid gap-6 lg:grid-cols-3">
                  {offerBanners.map((item, index) => (
                    <Reveal key={item.title} delay={index * 0.05}>
                      <CampaignBanner title={item.title} subtitle={item.subtitle} image={item.image} cta="Shop Now" onClick={() => openScope(item.scope)} compact />
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            <section className="px-4 py-16 sm:py-20">
              <div className="mx-auto max-w-7xl space-y-10">
                <CampaignBanner title="Festival Collection" subtitle="Rich cultural hues, celebratory silhouettes, and occasion-ready family fashion designed with premium storytelling and elegant presence." image={bannerImages[0]} cta="Explore Festival Collection" onClick={() => openScope("Festival Collection")} />
                <ProductGridSection eyebrow="Festival Edit" title="Celebrate with elevated festive dressing" description="Premium festive curation spanning women and kids fashion, ready for gatherings, gifting, and memorable family occasions." products={festivalProducts} wishlist={wishlist} onExplore={() => openScope("Festival Collection")} onOpenProduct={openProduct} onWishlist={toggleWishlist} onQuickView={setQuickView} onAddToCart={(product) => addToCart(product)} />
              </div>
            </section>

            <section className="px-4 py-16 sm:py-20">
              <div className="mx-auto max-w-7xl space-y-10">
                <CampaignBanner title="Cotton Collection" subtitle="Soft-touch breathable styles with an earthy premium mood, crafted for everyday elegance and easy seasonal dressing." image={bannerImages[4]} cta="Shop Cotton Collection" onClick={() => openScope("Cotton Collection")} dark={false} />
                <ProductGridSection eyebrow="Cotton Collection" title="Breathable edits with premium ethnic calm" description="Cotton-led kurtis, dresses, tops, and sets that balance comfort, polish, and rich visual presentation." products={cottonProducts} wishlist={wishlist} onExplore={() => openScope("Cotton Collection")} onOpenProduct={openProduct} onWishlist={toggleWishlist} onQuickView={setQuickView} onAddToCart={(product) => addToCart(product)} />
              </div>
            </section>

            <section className="px-4 py-16 sm:py-20">
              <div className="mx-auto max-w-7xl space-y-10">
                <CampaignBanner title="Trending Collection" subtitle="Styles gaining attention fast across modern ethnic dressing, family shopping, and premium discovery journeys." image={bannerImages[3]} cta="View Trending" onClick={() => openScope("Trending Collection")} />
                <ProductGridSection eyebrow="Trending Collection" title="Momentum picks rising across the JR storefront" description="High-appeal styles with a fashion-first look, editorial imagery, and strong conversion energy." products={trendingProducts} wishlist={wishlist} onExplore={() => openScope("Trending Collection")} onOpenProduct={openProduct} onWishlist={toggleWishlist} onQuickView={setQuickView} onAddToCart={(product) => addToCart(product)} />
              </div>
            </section>

            <ProductGridSection eyebrow="Best Sellers" title="Repeated favorites from women, kids, festive, and family fashion shoppers" description="JR best-sellers combine premium styling, strong fit confidence, and dependable gifting or celebration appeal." products={bestSellers} wishlist={wishlist} onExplore={() => openScope("Best Sellers")} onOpenProduct={openProduct} onWishlist={toggleWishlist} onQuickView={setQuickView} onAddToCart={(product) => addToCart(product)} />

            <section className="px-4 py-16 sm:py-20">
              <div className="mx-auto max-w-7xl">
                <CampaignBanner title="Wholesale Banner" subtitle="Become a dealer, place bulk orders, source family fashion collections, and scale your fashion business with a premium partner from Chennai." image={bannerImages[6]} cta="Register For Wholesale" onClick={() => navigate("wholesale")} />
              </div>
            </section>

            <section className="px-4 py-16 sm:py-20">
              <div className="mx-auto max-w-7xl space-y-10">
                <SectionHeading eyebrow="Customer Reviews" title="Trust built through premium presentation and consistent product delight" description="Ratings, testimonials, and visual proof reinforce a luxury brand story that feels polished, modern, and reliable." />
                <div className="grid gap-6 lg:grid-cols-3">
                  {testimonials.map((item, index) => (
                    <Reveal key={item.name} delay={index * 0.05}>
                      <div className="luxury-card overflow-hidden rounded-[32px]">
                        <img src={item.image} alt={item.name} className="aspect-[4/3] w-full object-cover" />
                        <div className="space-y-4 p-6">
                          <div>
                            <h3 className="font-display text-3xl text-[#1a1a1a]">{item.name}</h3>
                            <p className="text-sm text-[#6a594b]">{item.title}</p>
                          </div>
                          <div className="flex items-center gap-1 text-[#8b5e3c]">
                            {Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} className="h-4 w-4 fill-current" />)}
                          </div>
                          <p className="text-sm leading-7 text-[#5d4a3d]">“{item.quote}”</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            <section className="px-4 py-16 sm:py-20">
              <div className="mx-auto max-w-7xl space-y-10">
                <SectionHeading eyebrow="Instagram Feed" title="A social-first gallery styled like a premium campaign board" description="Extend fashion discovery through a live-looking Instagram grid with editorial imagery and branded social presence." />
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {womenPortraits.slice(0, 6).map((image, index) => (
                    <motion.a key={image} href={socialLinks.instagram} target="_blank" rel="noreferrer" whileHover={{ y: -6 }} className={cn("group relative overflow-hidden rounded-[28px]", index === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-auto" : "aspect-square")}>
                      <img src={image} alt="JR Instagram style" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1a1a1a] opacity-0 transition group-hover:opacity-100">
                        <Camera className="h-3.5 w-3.5 text-[#6b3e26]" />
                        @yuva.priya.92351
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>

            <section className="px-4 py-16 sm:py-20">
              <div className="mx-auto max-w-7xl space-y-10">
                <SectionHeading eyebrow="Why Choose Us" title="Luxury experience supported by practical trust signals" description="The right mix of fashion aspiration, delivery confidence, payment security, and wholesale readiness." />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {whyChooseUs.map((item, index) => (
                    <Reveal key={item} delay={index * 0.04}>
                      <div className="luxury-card flex items-center gap-4 rounded-[26px] p-5">
                        <div className="rounded-full bg-[#f7f1eb] p-3 text-[#6b3e26]"><Check className="h-5 w-5" /></div>
                        <p className="font-semibold text-[#1a1a1a]">{item}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            <section className="px-4 py-16 sm:py-20">
              <div className="mx-auto max-w-7xl space-y-10">
                <SectionHeading eyebrow="Shop With Us Anywhere" title="Multi-channel fashion buying for modern Indian shoppers" description="Meet premium buyers across web, WhatsApp, Meesho, and in-store discovery without losing brand sophistication." />
                <div className="grid gap-6 lg:grid-cols-4">
                  {shoppingChannels.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Reveal key={item.title} delay={index * 0.05}>
                        <motion.div whileHover={{ y: -8 }} className="luxury-card rounded-[32px] p-6">
                          <div className="w-fit rounded-full bg-[#f7f1eb] p-3 text-[#6b3e26]"><Icon className="h-6 w-6" /></div>
                          <h3 className="mt-5 font-display text-3xl text-[#1a1a1a]">{item.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-[#5d4a3d]">{item.copy}</p>
                        </motion.div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="px-4 py-16 sm:py-20">
              <div className="mx-auto max-w-7xl overflow-hidden rounded-[38px] border border-[#eaded2] bg-[#faf7f2]">
                <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
                  <div className="p-8 sm:p-10 lg:p-12">
                    <SectionHeading eyebrow="Store Visit" title="Visit JEEV RUTHI COLLECTIONS in Chennai" description="Enjoy in-person styling, product touch-and-feel, wholesale discussions, and premium family fashion support at our store." />
                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <div className="rounded-[26px] border border-[#eaded2] bg-white p-5">
                        <p className="text-xs uppercase tracking-[0.24em] text-[#8b5e3c]">Address</p>
                        <p className="mt-3 text-sm leading-7 text-[#5d4a3d]">No.81, Vigneshwara Nagar,<br />Kundrathur Main Road, Porur,<br />Chennai – 600116, Tamil Nadu, India</p>
                      </div>
                      <div className="rounded-[26px] border border-[#eaded2] bg-white p-5">
                        <p className="text-xs uppercase tracking-[0.24em] text-[#8b5e3c]">Business Hours</p>
                        <p className="mt-3 text-sm leading-7 text-[#5d4a3d]">Monday – Sunday<br />9:00 AM – 9:00 PM</p>
                      </div>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <ActionButton onClick={() => window.open(socialLinks.phone, "_self")}>Call Now</ActionButton>
                      <ActionButton variant="secondary" onClick={() => window.open(socialLinks.whatsapp, "_blank")}>WhatsApp Now</ActionButton>
                      <ActionButton variant="secondary" onClick={() => window.open(socialLinks.directions, "_blank")}>Get Directions</ActionButton>
                    </div>
                  </div>
                  <div className="space-y-4 p-4 sm:p-6">
                    <img src={bannerImages[6]} alt="JR store visual" className="h-64 w-full rounded-[30px] object-cover lg:h-80" />
                    <div className="overflow-hidden rounded-[30px] border border-[#eaded2]">
                      <iframe title="JR store map" src="https://www.google.com/maps?q=No.81%2C%20Vigneshwara%20Nagar%2C%20Kundrathur%20Main%20Road%2C%20Porur%2C%20Chennai%20600116&output=embed" className="h-64 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="px-4 pb-24 pt-16 sm:pb-28 sm:pt-20">
              <div className="mx-auto max-w-6xl rounded-[38px] border border-[#eaded2] bg-white p-8 text-center shadow-[0_24px_70px_rgba(32,20,12,0.08)] sm:p-12">
                <div className="mx-auto max-w-3xl space-y-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8b5e3c]">Newsletter</p>
                  <h3 className="font-display text-5xl leading-none text-[#1a1a1a]">Get first access to premium campaign drops and family fashion launches</h3>
                  <p className="text-sm leading-7 text-[#5d4a3d] sm:text-base">Stay updated on new arrivals, cotton edits, festive collections, wedding campaigns, and wholesale opportunities.</p>
                </div>
                <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-full border border-[#eaded2] bg-[#faf7f2] p-2 sm:flex-row">
                  <input type="email" placeholder="Enter your email" className="flex-1 bg-transparent px-4 py-3 text-sm outline-none" />
                  <ActionButton>Subscribe Now</ActionButton>
                </div>
              </div>
            </section>
          </div>
        )}

        {activePage === "listing" && (
          <ListingPage filters={filters} setFilters={setFilters} products={visibleProducts} allProducts={products} wishlist={wishlist} onOpenProduct={openProduct} onWishlist={toggleWishlist} onQuickView={setQuickView} onAddToCart={(product) => addToCart(product)} />
        )}

        {activePage === "product" && (
          <ProductPage product={selectedProduct} related={relatedProducts} recent={recentProducts} frequent={frequentlyBought} wishlisted={wishlist.includes(selectedProduct.id)} onWishlist={() => toggleWishlist(selectedProduct.id)} onAddToCart={(size, color, quantity) => addToCart(selectedProduct, size, color, quantity)} onBuyNow={(size, color, quantity) => buyNow(selectedProduct, size, color, quantity)} onOpenProduct={openProduct} />
        )}

        {activePage === "cart" && (
          <CartPage items={cartDetailed} subtotal={subtotal} discount={discount} shipping={shipping} total={total} couponCode={couponCode} setCouponCode={setCouponCode} onApplyCoupon={applyCoupon} onUpdateQuantity={updateCartQuantity} onRemove={removeFromCart} onCheckout={beginCheckout} onContinue={() => openScope("All")} />
        )}

        {activePage === "checkout" && (
          <CheckoutPage isLoggedIn={isLoggedIn} items={cartDetailed} subtotal={subtotal} discount={discount} shipping={shipping} total={total} onLogin={() => { pendingActionRef.current = () => navigate("checkout"); setAuthReason("Please login to continue to secure checkout."); setAuthOpen(true); }} onPay={openRazorpay} />
        )}

        {activePage === "account" && (
          <AccountPage isLoggedIn={isLoggedIn} onLogin={() => { pendingActionRef.current = () => navigate("account"); setAuthReason("Please login to access your premium account dashboard."); setAuthOpen(true); }} wishlistProducts={wishlistProducts} recentOrders={cartDetailed} onOpenProduct={openProduct} />
        )}

        {activePage === "wholesale" && <WholesalePage />}
        {activePage === "about" && <AboutPage />}
        {activePage === "contact" && <ContactPage />}
        {activePage === "track" && <TrackOrderPage />}
      </motion.main>
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#1a1a1a]">
      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.45 } }} className="fixed inset-0 z-[130] flex items-center justify-center bg-[#120c09]">
            <div className="space-y-8 text-center">
              <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="mx-auto w-fit">
                <img src="/jr-logo.svg" alt="JR logo" className="h-32 w-auto" />
              </motion.div>
              <div className="space-y-3">
                <p className="font-display text-4xl tracking-[0.22em] text-white">JEEV RUTHI</p>
                <p className="text-xs uppercase tracking-[0.46em] text-[#c89b6d]">Loading a premium ethnic fashion experience</p>
              </div>
              <div className="mx-auto h-1.5 w-72 overflow-hidden rounded-full bg-white/10">
                <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} className="h-full w-32 rounded-full bg-gradient-to-r from-[#6b3e26] via-[#c89b6d] to-[#f3d8c0]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -12, x: 20 }} animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0, y: -12, x: 20 }} className="fixed right-4 top-24 z-[125] rounded-2xl border border-[#e5d8ca] bg-white px-4 py-3 text-sm font-semibold text-[#6b3e26] shadow-[0_24px_60px_rgba(32,20,12,0.12)]">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <Header activePage={activePage} announcement={announcements[announcementIndex]} cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} wishlistCount={wishlist.length} mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} onNavigate={navigate} onOpenScope={openScope} onSearch={() => setSearchOpen(true)} />

      {pageContent}

      <Footer onNavigate={navigate} onOpenScope={openScope} />
      <MobileBottomNav onNavigate={navigate} onOpenScope={openScope} onSearch={() => setSearchOpen(true)} />

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onSuccess={completeLogin} reason={authReason} />

      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[122] bg-black/50 p-4 backdrop-blur" onClick={() => setSearchOpen(false)}>
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 22 }} onClick={(event) => event.stopPropagation()} className="mx-auto mt-16 max-w-4xl rounded-[32px] bg-white p-6 shadow-[0_30px_90px_rgba(0,0,0,0.18)] sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#8b5e3c]">AI Search</p>
                  <h3 className="font-display text-3xl text-[#1a1a1a]">Find your premium fit</h3>
                </div>
                <button type="button" onClick={() => setSearchOpen(false)} className="rounded-full border border-[#eaded2] p-2 text-[#6b3e26]"><X className="h-5 w-5" /></button>
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-full border border-[#e5d8ca] bg-[#faf7f2] px-5 py-4">
                <Bot className="h-5 w-5 text-[#6b3e26]" />
                <input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search kurtis, sarees, salwar sets, party wear, cotton collection..." className="w-full bg-transparent text-sm outline-none placeholder:text-[#9b8b7f]" />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {searchSuggestions.map((item) => (
                  <button type="button" key={item} onClick={() => { setSearchQuery(item); setSearchOpen(false); openScope("All"); }} className="rounded-full border border-[#eaded2] px-4 py-2 text-sm text-[#5d4a3d] transition hover:bg-[#faf7f2]">
                    {item}
                  </button>
                ))}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.filter((product) => searchQuery.trim() ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase()) : true).slice(0, 6).map((product) => (
                  <button type="button" key={product.id} onClick={() => { setSearchOpen(false); openProduct(product); }} className="flex items-center gap-4 rounded-3xl border border-[#eaded2] bg-[#faf7f2] p-3 text-left transition hover:bg-white">
                    <img src={product.image} alt={product.name} className="h-20 w-20 rounded-2xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-[0.24em] text-[#8b5e3c]">{product.category}</p>
                      <p className="font-display text-2xl text-[#1a1a1a]">{product.name}</p>
                      <p className="text-sm text-[#6a594b]">{formatCurrency(product.price)}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {quickView && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[123] bg-black/55 p-4 backdrop-blur" onClick={() => setQuickView(null)}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} onClick={(event) => event.stopPropagation()} className="mx-auto mt-12 grid max-w-5xl overflow-hidden rounded-[34px] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.18)] lg:grid-cols-[1.05fr_0.95fr]">
              <div className="bg-[#f3ebe2] p-4"><img src={quickView.image} alt={quickView.name} className="h-full w-full rounded-[28px] object-cover" /></div>
              <div className="space-y-6 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#8b5e3c]">Quick View</p>
                    <h3 className="font-display text-4xl text-[#1a1a1a]">{quickView.name}</h3>
                  </div>
                  <button type="button" onClick={() => setQuickView(null)} className="rounded-full border border-[#eaded2] p-2 text-[#6b3e26]"><X className="h-5 w-5" /></button>
                </div>
                <Rating value={quickView.rating} reviews={quickView.reviews} />
                <p className="text-sm leading-7 text-[#5d4a3d]">{quickView.description}</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-[#1a1a1a]">{formatCurrency(quickView.price)}</span>
                  <span className="text-sm text-[#9b8b7f] line-through">{formatCurrency(quickView.originalPrice)}</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <ActionButton onClick={() => addToCart(quickView)}>Add To Cart</ActionButton>
                  <ActionButton variant="secondary" onClick={() => { setQuickView(null); openProduct(quickView); }}>View Full Product</ActionButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="fixed bottom-36 right-4 z-40 flex items-center gap-3 rounded-full bg-[#6b3e26] px-4 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(32,20,12,0.18)] transition hover:-translate-y-1">
        <MessageCircle className="h-5 w-5 text-[#f3d8c0]" />
        WhatsApp Support
      </a>
    </div>
  );
}
