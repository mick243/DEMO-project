import DeepDive from "../../../components/DeepDive";
import { arcadeServer as dd } from "../../../data/arcadeServer";

// 프로젝트 상세(/projects/arcade-finder) Result 단계의 서버 성능 표 제목에서 들어오는 딥다이브 페이지입니다.
// viewport-culling 과 같은 틀(components/DeepDive.js)을 쓰고, 내용은 app/data/arcadeServer.js 에 있습니다.

export const metadata = {
  title: `${dd.title} | 오락실 파인더 | 강정민`,
  description: dd.description,
};

export default function ArcadeServerPage() {
  return <DeepDive dd={dd} />;
}
