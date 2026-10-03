import DeepDive from "../../../components/DeepDive";
import { viewportCulling as dd } from "../../../data/viewportCulling";

// 프로젝트 상세(/projects/arcade-finder)의 성능 표 제목에서 들어오는 딥다이브 페이지입니다.
//
// [slug] 동적 라우트와 형제로 놓았습니다. 이 폴더에는 page.js 가 없으므로
// /projects/arcade-finder 자체는 여전히 [slug] 가 처리합니다.
// 그리는 일은 components/DeepDive.js 가 합니다 (서버 딥다이브와 같은 틀).

export const metadata = {
  title: "클라이언트: 뷰포트 컬링 전후 | 오락실 파인더 | 강정민",
  description:
    "전국 마커 1,449개를 화면 안 337개로 줄인 작업의 코드와 원리. 무엇을 고쳤고 왜 그만큼 줄었는지, 그리고 이 수치가 SQL 과 무관한 이유.",
};

export default function ViewportCullingPage() {
  return <DeepDive dd={dd} />;
}
