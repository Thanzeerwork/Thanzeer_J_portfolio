export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  topic: string;
  topicSlug: string;
  readingTime: string;
  excerpt: string;
  featured: boolean;
  image?: string;
}

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: "creating-a-custom-n8n-node-for-wordpress-managing-custom-post-types",
    title: "Creating a custom n8n Node for WordPress: managing Custom Post Types",
    date: "2025-06-09",
    formattedDate: "09 Jun 2025",
    topic: "AI in practice",
    topicSlug: "ai-in-practice",
    readingTime: "8 min",
    excerpt:
      "How to dynamically populate WordPress custom post types within custom n8n workflow nodes, connecting automated editorial pipelines to headless REST APIs.",
    featured: true,
    image: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/blog/n8n-nodes.DZBmC54u_3hPav.webp",
  },
  {
    slug: "how-to-buld-a-desktop-kubernetescluster-with-turing-pi2-part-2",
    title: "How to Build a Desktop Kubernetes Cluster with Turing Pi 2 - part 2",
    date: "2025-04-21",
    formattedDate: "21 Apr 2025",
    topic: "Dev",
    topicSlug: "dev",
    readingTime: "14 min",
    excerpt:
      "Installing K3s, MetalLB load balancing, ArgoCD GitOps, and Prometheus/Grafana monitoring on a 4-node Raspberry Pi CM4 cluster on your desk.",
    featured: true,
    image: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/turing-pi2.D0p0vrG1_1TWNon.webp",
  },
  {
    slug: "how-to-buld-a-desktop-kubernetescluster-with-turing-pi2-part-1",
    title: "How to Build a Desktop Kubernetes Cluster with Turing Pi 2 - part 1",
    date: "2025-04-15",
    formattedDate: "15 Apr 2025",
    topic: "Dev",
    topicSlug: "dev",
    readingTime: "10 min",
    excerpt:
      "Hardware assembly, power supply management, BMC flashing, and Ubuntu Server provisioning for the Turing Pi 2 mini-ITX cluster board.",
    featured: true,
    image: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/turing-pi2.D0p0vrG1_2fgKSn.webp",
  },
  {
    slug: "is-it-still-worth-developing-on-wordpress-in-2025",
    title: "Is it still worth developing on WordPress in 2025?",
    date: "2025-03-18",
    formattedDate: "18 Mar 2025",
    topic: "Dev",
    topicSlug: "dev",
    readingTime: "7 min",
    excerpt:
      "An unvarnished perspective on custom block development, headless architecture with Next.js/Astro, and why creative agencies still demand WordPress backends.",
    featured: false,
    image: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/wordpress.BDRBrdTA_PX3iM.webp",
  },
  {
    slug: "10-tips-to-start-ui-design-with-focus",
    title: "10 tips to start UI design with focus and clarity",
    date: "2025-02-10",
    formattedDate: "10 Feb 2025",
    topic: "Reviews",
    topicSlug: "reviews",
    readingTime: "6 min",
    excerpt:
      "Starting with high-contrast wireframes, strict typographic scales, and semantic layout boundaries before opening color palettes or illustration decks.",
    featured: false,
    image: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/front-io.B86nOX4n_CdsG9.webp",
  },
  {
    slug: "hidden-potential-by-adam-grant-review",
    title: "Hidden Potential by Adam Grant: Notes for Independent Builders",
    date: "2025-01-20",
    formattedDate: "20 Jan 2025",
    topic: "Reviews",
    topicSlug: "reviews",
    readingTime: "5 min",
    excerpt:
      "Key takeaways on deliberate practice, scaffolding difficult skills, and overcoming technical plateaus as a solo practitioner.",
    featured: false,
    image: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/blog/hidden-potential-adam-grant.CvrPDBjT_1PADv2.webp",
  },
  {
    slug: "freelance-and-full-remote-a-guide-to-surviving-part-2",
    title: "Freelance and Full Remote: A Guide to Surviving - part 2",
    date: "2024-11-14",
    formattedDate: "14 Nov 2024",
    topic: "Freelance",
    topicSlug: "freelance",
    readingTime: "9 min",
    excerpt:
      "Contracts, payment milestones, asynchronous communication rituals, and protecting uninterrupted creative deep work while serving clients worldwide.",
    featured: false,
    image: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/blog/freelancing.C2EyemAU_D4wF6.webp",
  },
  {
    slug: "freelance-and-full-remote-a-guide-to-surviving-part-1",
    title: "Freelance and Full Remote: A Guide to Surviving - part 1",
    date: "2024-10-28",
    formattedDate: "28 Oct 2024",
    topic: "Freelance",
    topicSlug: "freelance",
    readingTime: "8 min",
    excerpt:
      "Setting up your physical workstation, tax residency, and the mental boundaries required to sustain a 20-year independent career.",
    featured: false,
    image: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/blog/freelancing.C2EyemAU_Z1gT0or.webp",
  },
  {
    slug: "hello-world",
    title: "Hello World: Mapping the Hard Terrain of the Web",
    date: "2024-09-01",
    formattedDate: "01 Sep 2024",
    topic: "Dev",
    topicSlug: "dev",
    readingTime: "3 min",
    excerpt:
      "A manifesto on crafting digital experiences where ambitious design and robust engineering coexist without compromise.",
    featured: false,
    image: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/blog/hello-world.Nweds3Fi_7WcDj.webp",
  },
];
