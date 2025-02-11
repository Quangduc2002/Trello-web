import { useAtom } from 'jotai';
import { atomBoardAll } from './type';
import { useRequest } from 'ahooks';
import { serviceBoardAll } from './service';

export const useBoardAll = () => {
  const [, setBoardAll] = useAtom(atomBoardAll);
  const requestBoardAll = useRequest(serviceBoardAll, {
    manual: true,
    onSuccess: (res) => {
      setBoardAll(res?.data);
    },
  });

  return {
    run: requestBoardAll.run,
    onRefresh: requestBoardAll.refresh,
  };
};
