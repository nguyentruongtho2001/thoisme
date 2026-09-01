import videoCubeWar from "../../../assets/videos/cubewar.mp4";

import cubewar0 from "../../../assets/images/projects/cubewar/cubewar-0.webp";
import cubewar1 from "../../../assets/images/projects/cubewar/cubewar-1.webp";
import cubewar2 from "../../../assets/images/projects/cubewar/cubewar-2.webp";
import cubewar3 from "../../../assets/images/projects/cubewar/cubewar-3.webp";
import cubewar4 from "../../../assets/images/projects/cubewar/cubewar-4.webp";
import cubewar5 from "../../../assets/images/projects/cubewar/cubewar-5.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "CubeWar",
  theme: "dark",
  tags: ["three", "node", "websockets", "redis"],
  videoBorder: false,
  live: "https://cubewar.io",
  description:
    "CubeWar là một tựa game nhiều người chơi chạy trên trình duyệt, nơi người chơi điều khiển các nhân vật hình khối trong những trận đấu chiến thuật nhanh và kịch tính.<br/><br/>Tôi tự xây dựng toàn bộ hệ thống, bao gồm game engine, hệ thống timeline phía client và mạng thời gian thực với hệ thống xếp trận (matchmaking) dựa trên Redis để mang lại trải nghiệm chơi mượt mà, chịu được tải cao.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoCubeWar,
        caption: "Gameplay",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar0,
        alt: "Hướng dẫn",
        caption: "Hướng dẫn",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar1,
        alt: "Chủ đề bản đồ",
        caption: "Chủ đề bản đồ",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar2,
        alt: "Xác thực",
        caption: "Xác thực",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar3,
        alt: "Thiết kế đáp ứng",
        caption: "Thiết kế đáp ứng",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar4,
        alt: "Nhiều chế độ chơi",
        caption: "Nhiều chế độ chơi",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar5,
        alt: "Hệ thống nhóm",
        caption: "Hệ thống nhóm",
      },
    },
  ],
} as const satisfies ProjectContent;
