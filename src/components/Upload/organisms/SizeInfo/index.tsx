import { memo, useEffect } from 'react';

import { UploadTemplateProps } from '#types/upload';
import ErrorMsg from '@atoms/ErrorMsg';
import { sizeBtnBox } from '@constants/upload/utils';
import InfoBtnBox from '@organisms/InfoBtnBox';
import { useUploadUpdateStore } from 'src/hooks/useUploadUpdateStore';

import { sizeValidate } from './validate';

type Props = {
  sizeProps: sizeBtnBox;
} & UploadTemplateProps;

function SizeInfo(infoProps: Props) {
  const { isUpdate, sizeProps } = infoProps;
  const useStore = useUploadUpdateStore(isUpdate);
  const state = useStore((states) => states.size);
  const onChange = useStore((states) => states.updateUpload);
  const updateValidate = useStore((states) => states.updateValidate);
  const isSizeValid = sizeValidate(state);

  useEffect(() => {
    updateValidate('size', isSizeValid);
  }, [isSizeValid, updateValidate]);

  return (
    <InfoBtnBox
      {...sizeProps}
      compareData={state}
      handleFunc={onChange}
      error={<ErrorMsg isValid={isSizeValid} msg="사이즈를 선택해주세요." />}
    />
  );
}

export default memo(SizeInfo);
