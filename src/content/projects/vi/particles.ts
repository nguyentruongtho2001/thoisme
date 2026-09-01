import videoParticles from "../../../assets/videos/particles.mp4";

import particles0 from "../../../assets/images/projects/particles/particles-0.webp";
import particles1 from "../../../assets/images/projects/particles/particles-1.webp";
import particles2 from "../../../assets/images/projects/particles/particles-2.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "WebGL Particles",
  theme: "dark",
  tags: ["ogl", "javascript", "glsl"],
  live: "https://particles.david-hckh.com/",
  videoBorder: false,
  description:
    "Một dự án WebGL thử nghiệm được xây dựng với OGL.js, sử dụng các công thức toán học và hàm noise để tạo hiệu ứng hạt (particles).<br/><br/>Các hạt chuyển động mượt mà giữa nhiều hình dạng 3D khác nhau, hòa quyện vào nhau.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoParticles,
        caption: "Hệ thống hạt chuyển động",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: particles0,
        alt: "Hình thắt nút",
        caption: "Hình thắt nút",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: particles1,
        alt: "Hình bánh donut",
        caption: "Hình bánh donut",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: particles2,
        alt: "Hình cầu",
        caption: "Hình cầu",
      },
    },
  ],
} as const satisfies ProjectContent;
