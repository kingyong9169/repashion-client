import { memo, useCallback } from 'react';

import { UpdateUpload, UploadState } from '#types/storeType/upload';
import Button from '@atoms/Button';
import { SelectArrow } from '@atoms/icon';
import TextInput from '@atoms/TextInput';
import InfoArticle from '@molecules/InfoArticle';
import { useMainCategoryTree, useSubCategory } from 'api/getCategoryData';
import useDebounceInput from 'hooks/useDebounceInput';

import Dialog from '../Dialog';
import { findNameByProp } from '../Dialog/utils';
import $ from './style.module.scss';

type Props = {
  dialogOpen: boolean;
  state: UploadState['basicInfo'];
  categoryData: res.CategoryTree['data'] | undefined;
  onChange: UpdateUpload;
  openDialog: () => void;
  closeDialog: () => void;
};

function Basic(basicProps: Props) {
  // TODO: id로 카테고리 리팩토링
  const { dialogOpen, openDialog, onChange, closeDialog } = basicProps;
  const { state, categoryData: genderCategory } = basicProps;
  const [gender, main, sub] = state.category;
  const mainCategory = useMainCategoryTree(gender); // TODO: 2번 렌더링
  const subCategory = useSubCategory(main, 'code');

  const korGender = findNameByProp(genderCategory?.children, gender, 'code');
  const korMain = findNameByProp(mainCategory?.children, main, 'code');
  const korSub = findNameByProp(subCategory?.children, sub, 'code');

  const categoryBtnText =
    gender && main && sub
      ? `${korGender} | ${korMain} | ${korSub}`
      : '카테고리 선택';
  const handleInput = useDebounceInput(onChange, 200);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleInput(e.target.value, 'basicInfo', 'title'),
    [handleInput],
  );

  const handleBrandChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleInput(e.target.value, 'basicInfo', 'brand'),
    [handleInput],
  );

  return (
    <InfoArticle label="아이템 기본 정보" required className={$['basic-info']}>
      <TextInput
        label="아이템"
        className={$.title}
        controlled={false}
        value={state.title}
        placeholder="아이템 이름"
        onChange={handleTitleChange}
      />

      <Button
        background="#fff"
        color="#000"
        fontWeight={400}
        className={$['open-dialog']}
        onClick={openDialog}
        label="카테고리 다이얼로그 열기"
      >
        {categoryBtnText}
        <SelectArrow className={$.icon} />
      </Button>
      <Dialog
        {...{ genderCategory, mainCategory, subCategory }}
        state={state}
        isOpen={dialogOpen}
        onClose={closeDialog}
        onChange={onChange}
      />

      <TextInput
        label="브랜드"
        className={$.title}
        controlled={false}
        value={state.brand}
        placeholder="브랜드 이름"
        onChange={handleBrandChange}
      />
    </InfoArticle>
  );
}

export default memo(Basic);
