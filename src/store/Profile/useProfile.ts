import { useAtom } from 'jotai';
import { atomProfiole } from './type';
import { useRequest } from 'ahooks';
import { serviceGetProfile } from './service';

export const useProfileInitial = () => {
  const [profile, setProfile] = useAtom(atomProfiole);
  const requestProfile = useRequest(serviceGetProfile, {
    manual: true,
    onSuccess: (res) => {
      setProfile(res?.data?.data);
    },
  });

  return {
    run: requestProfile.run,
    onRefresh: requestProfile.refresh,
  };
};
