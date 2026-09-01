import videoQuibbo from "../../../assets/videos/quibbo.mp4";

import quibbo0 from "../../../assets/images/projects/quibbo/quibbo-0.webp";
import quibbo1 from "../../../assets/images/projects/quibbo/quibbo-1.webp";
import quibbo2 from "../../../assets/images/projects/quibbo/quibbo-2.webp";
import quibbo3 from "../../../assets/images/projects/quibbo/quibbo-3.webp";
import quibbo4 from "../../../assets/images/projects/quibbo/quibbo-4.webp";
import quibbo5 from "../../../assets/images/projects/quibbo/quibbo-5.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Quibbo",
  theme: "light",
  tags: ["three", "node", "kubernetes", "redis", "postgresql"],
  videoBorder: true,
  description:
    "Quibbo là một nền tảng cho các game nhiều người chơi theo lượt diễn ra nhanh. Nó kết hợp hệ thống xếp trận (matchmaking), avatar 3D có thể tùy chỉnh và tích hợp tài khoản với phần thưởng xếp hạng.<br/><br/>Dự án bắt đầu như một thử nghiệm kỹ thuật và phát triển thành một hệ thống có khả năng mở rộng để thử nghiệm các ý tưởng game mới.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoQuibbo,
        caption: "Trải nghiệm người dùng",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo0,
        alt: "Trình tạo Avatar",
        caption: "Trình tạo Avatar",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo1,
        alt: "Tic-Tac-Toe nhiều người chơi",
        caption: "Tic-Tac-Toe nhiều người chơi",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo2,
        alt: "Nhiều mini-game",
        caption: "Nhiều mini-game",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo3,
        alt: "Các biến thể Avatar",
        caption: "Các biến thể Avatar",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo4,
        alt: "Thiết kế đáp ứng",
        caption: "Thiết kế đáp ứng",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo5,
        alt: "Chế độ tối",
        caption: "Chế độ tối",
      },
    },
  ],
} as const satisfies ProjectContent;
