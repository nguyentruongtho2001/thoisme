import videoPokedex from "../../../assets/videos/pokedex.mp4";

import pokedex0 from "../../../assets/images/projects/pokedex/pokedex-0.webp";
import pokedex1 from "../../../assets/images/projects/pokedex/pokedex-1.webp";
import pokedex2 from "../../../assets/images/projects/pokedex/pokedex-2.webp";
import pokedex3 from "../../../assets/images/projects/pokedex/pokedex-3.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Pokédex",
  theme: "light",
  tags: ["javascript", "html", "css"],
  live: "https://pokedex.david-hckh.com/",
  source: "https://github.com/davidhckh/pokedex",
  videoBorder: true,
  description:
    "Một trong những dự án web đầu tiên của tôi để luyện tập các khái niệm lập trình web cơ bản. Pokédex là mã nguồn mở để các lập trình viên khác có thể học theo cách tôi đã từng học.<br/><br/>Nó cũng tương tác với một API công khai để tích lũy thêm kinh nghiệm về việc lấy dữ liệu bất đồng bộ.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoPokedex,
        caption: "Ứng dụng Pokédex",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex0,
        alt: "Chế độ xem mặc định",
        caption: "Chế độ xem mặc định",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex1,
        alt: "Chức năng tìm kiếm",
        caption: "Chức năng tìm kiếm",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex2,
        alt: "Thiết kế đáp ứng",
        caption: "Thiết kế đáp ứng",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex3,
        alt: "Lazy Loading",
        caption: "Lazy Loading",
      },
    },
  ],
} as const satisfies ProjectContent;
