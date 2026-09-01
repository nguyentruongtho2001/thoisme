import videoSharkie from "../../../assets/videos/sharkie.mp4";

import sharkie0 from "../../../assets/images/projects/sharkie/sharkie-0.webp";
import sharkie1 from "../../../assets/images/projects/sharkie/sharkie-1.webp";
import sharkie2 from "../../../assets/images/projects/sharkie/sharkie-2.webp";
import sharkie3 from "../../../assets/images/projects/sharkie/sharkie-3.webp";
import sharkie4 from "../../../assets/images/projects/sharkie/sharkie-4.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Sharkie",
  theme: "light",
  tags: ["javascript", "html", "css"],
  live: "https://sharkie.david-hckh.com/",
  source: "https://github.com/davidhckh/sharkie-game",
  description:
    "Sharkie là một tựa game phiêu lưu dưới nước 2D được xây dựng bằng JavaScript thuần và HTML5 Canvas.<br/><br/>Dự án được tổ chức theo các nguyên tắc lập trình hướng đối tượng, sử dụng các lớp (class) tùy chỉnh cho nhân vật, kẻ địch và hệ thống trò chơi, cùng các hiệu ứng chuyển động mượt mà, cơ chế chiến đấu và nền parallax nhiều lớp.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoSharkie,
        caption: "Gameplay",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie0,
        alt: "Nhân vật và thiết kế bản đồ",
        caption: "Nhân vật và thiết kế bản đồ",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie1,
        alt: "Trận boss",
        caption: "Trận boss",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie2,
        alt: "Nhiệm vụ",
        caption: "Nhiệm vụ",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie3,
        alt: "Màn hình chiến thắng",
        caption: "Màn hình chiến thắng",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie4,
        alt: "Màn hình thất bại",
        caption: "Màn hình thất bại",
      },
    },
  ],
} as const satisfies ProjectContent;
