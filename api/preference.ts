import { useRouter } from 'next/router';

import { InfoState } from '#types/storeType/info';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { Axios } from 'api/core';
import { AxiosError } from 'axios';
import { arrToString } from 'utils';

const removeBlank = (str: string) => str.replace(/ /g, '');

export const postPreference = async (
  state: InfoState,
): Promise<res.Preference> => {
  const { topSize, bottomSize, topColors, bottomColors } = state;

  const requestData = {
    ...state,
    topSize: arrToString(topSize),
    bottomSize: arrToString(bottomSize),
    topColors: removeBlank(arrToString(topColors)),
    bottomColors: removeBlank(arrToString(bottomColors)),
  };
  delete requestData.infoUpdate;
  const response = await Axios.post(
    '/api/preference',
    JSON.stringify(requestData),
  );
  return response;
};

export function usePostPreference(): UseMutationResult<
  res.Preference,
  AxiosError,
  InfoState
> {
  const router = useRouter();

  return useMutation(postPreference, {
    onSuccess: (data) => {
      console.log(data);
      router.push('/upload');
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
