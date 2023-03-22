import { memo, useCallback } from 'react';

import {
  AdditionalInfo,
  UpdateUpload,
  UploadState,
} from '#types/storeType/upload';
import { UploadTemplateProps } from '#types/upload';
import TextArea from '@atoms/TextArea';
import InfoArticle from '@molecules/InfoArticle';
import TextInput from '@molecules/TextInput';
import useDebounceInput from 'src/hooks/useDebounceInput';
import { useUploadUpdateStore } from 'src/hooks/useUploadUpdateStore';

import $ from './style.module.scss';

type Props = {
  data: {
    placeholder: string;
    label: string;
    type: keyof UploadState;
    subType: keyof AdditionalInfo;
  }[];
  opinionPlaceholder: string;
  onChange: UpdateUpload;
} & UploadTemplateProps;

function AdditionInfo(additionProps: Props) {
  const { isUpdate, data, opinionPlaceholder, onChange } = additionProps;
  const useStore = useUploadUpdateStore(isUpdate);
  const opinion = useStore((states) => states.opinion);
  const additionalInfo = useStore((states) => states.additionalInfo);
  const handleInput = useDebounceInput(onChange, 200);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      subType?: keyof AdditionalInfo,
    ) => handleInput(e.target.value, 'additionalInfo', subType),
    [handleInput],
  );

  const handleOpinionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleInput(e.target.value, 'opinion'),
    [handleInput],
  );

  return (
    <>
      <InfoArticle label="구매시기와 구매처">
        {data.map(({ label, placeholder, subType }) => {
          return (
            <TextInput
              key={label}
              className={$.addition}
              controlled={false}
              value={additionalInfo[subType]}
              {...{ label, placeholder, subType }}
              onChange={handleChange}
            />
          );
        })}
      </InfoArticle>
      <InfoArticle label="판매자의 한마디">
        <TextArea
          className={$.textarea}
          color="#e3e1e1"
          placeholder={opinionPlaceholder}
          value={opinion}
          onChange={handleOpinionChange}
        />
      </InfoArticle>
    </>
  );
}

export default memo(AdditionInfo);
