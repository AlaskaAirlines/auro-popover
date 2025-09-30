import { boundaryExample } from "../apiExamples/boundary";
import "../src/registered";

export function initExamples(initCount) {
  // biome-ignore lint: no-unused-vars
  initCount = initCount || 0;

  try {
    // javascript example function calls to be added here upon creation to test examples
    boundaryExample();
  } catch (_err) {
    if (initCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}
