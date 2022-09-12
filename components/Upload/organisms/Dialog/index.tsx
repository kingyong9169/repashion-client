import { memo, useEffect, useState } from 'react';

import { BasicInfo, UpdateUpload } from '#types/storeType/upload';
import Button from '@atoms/Button';
import ButtonFooter from '@atoms/ButtonFooter';
import Span from '@atoms/Span';
import RadioSelect from '@molecules/RadioSelect';
import { Modal } from '@templates/Modal';

import $ from './style.module.scss';
import { curCategoryChildrenByProp } from './utils';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  genderCategory: res.CategoryTree['data'] | undefined;
  mainCategory: res.CategoryTree['data'] | undefined;
  subCategory: res.CategoryTree['data'] | undefined;
  state: BasicInfo;
  onChange: UpdateUpload;
};

function Dialog(dialogProps: Omit<Props, 'isOpen'>) {
  const { state, onChange, onClose } = dialogProps;
  const { genderCategory, mainCategory, subCategory } = dialogProps;
  const { category, curCategoryIdx } = state;
  const [curCategory, setCurCategory] = useState(genderCategory);
  const isIncludeCurValue = curCategory
    ? curCategoryChildrenByProp(curCategory, 'code').includes(
        category[curCategoryIdx],
      )
    : false;
  const isCurValueExist = !!category[curCategoryIdx] && isIncludeCurValue;
  const isValidPrevBtn = curCategoryIdx !== 0 && category[curCategoryIdx - 1];
  const lastBtnText = curCategoryIdx === category.length - 1 ? '완료' : '다음';
  const pageNum = `${curCategoryIdx + 1}/${category.length}`;
  const prevBtnColor = !isValidPrevBtn ? '#e3e1e1' : '#000';
  const nextBtnColor = !isCurValueExist ? '#e3e1e1' : '#000';

  useEffect(() => {
    return () => {
      onChange(0, 'basicInfo', 'curCategoryIdx');
    };
  }, [onChange]);

  const prevBtn = (idx: number) => {
    if (idx === 1) {
      setCurCategory(genderCategory);
    } else if (idx === 2) {
      setCurCategory(mainCategory);
    } else {
      return;
    }
    onChange(idx - 1, 'basicInfo', 'curCategoryIdx');
  };

  const nextBtn = (idx: number) => {
    if (idx === 0) {
      setCurCategory(mainCategory);
    } else if (idx === 1) {
      setCurCategory(subCategory);
    } else {
      onClose();
      return;
    }
    onChange(idx + 1, 'basicInfo', 'curCategoryIdx');
  };

  return (
    <>
      <header className={$['dialog-header']}>
        <Span className={$.title}>카테고리 선택</Span>
        <Span fontSize={12} fontWeight={500}>
          {curCategory?.name}
        </Span>
        <Span color="#6A6A6A" className={$['page-num']}>
          {pageNum}
        </Span>
      </header>

      <div className={$['dialog-body']}>
        <div className={$['radio-group']}>
          {curCategory?.children.map(({ name, code }) => {
            const isClicked = category[curCategoryIdx] === code;
            return (
              <RadioSelect
                key={code}
                isBorder
                isClicked={isClicked}
                type="basicInfo"
                subType="category"
                idx={curCategoryIdx}
                {...{ name, code, onSubTypeClick: onChange }}
              />
            );
          })}
        </div>

        <ButtonFooter
          LeftBtn={
            <Button
              background={prevBtnColor}
              className={$.prev}
              onClick={() => {
                if (isValidPrevBtn) prevBtn(curCategoryIdx);
              }}
            >
              이전
            </Button>
          }
          btnColor={nextBtnColor}
          onClick={() => {
            if (isCurValueExist) nextBtn(curCategoryIdx);
          }}
        >
          {lastBtnText}
        </ButtonFooter>
      </div>
    </>
  );
}

function DialogWrapper(dialogProps: Props) {
  const { isOpen, onClose, state, onChange } = dialogProps;
  const { genderCategory, mainCategory, subCategory } = dialogProps;
  return (
    <Modal id="category-dialog" {...{ isOpen, onClose }}>
      <div
        className={$['category-dialog']}
        aria-describedby="카테고리 다이얼로그"
      >
        <Dialog
          {...{
            state,
            onChange,
            onClose,
            genderCategory,
            mainCategory,
            subCategory,
          }}
        />
      </div>
    </Modal>
  );
}

export default memo(DialogWrapper);
