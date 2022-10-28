import React, { useCallback, useEffect, useRef, useState } from 'react';

import BackBtn from '@atoms/BackBtn';
import ButtonFooter from '@atoms/ButtonFooter';
import Span from '@atoms/Span';
import TextInput from '@atoms/TextInput';
import { seoData } from '@constants/seo';
import InfoArticle from '@molecules/InfoArticle';
import PageTemplate from '@templates/PageTemplate';
import ProfileImgUpload from 'src/components/MyPage/organisms/ProfileImgUpload';
import { useDebounceInput } from 'src/hooks';
import { useSaveMyInfo } from 'src/hooks/api/profile';
import { useImgPreview } from 'src/hooks/useImgPreview';
import { toastError } from 'src/utils/toaster';

type Props = Omit<res.Profile['data'], 'totalCount'>;

function InfoModifyTemplate(templateProps: Props) {
  // TODO: 닉네임 중복체크
  const { name, email, profileImage } = templateProps;
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useSaveMyInfo();
  const [nickname, setNickName] = useState(name || '');
  const [image, saveImage] = useImgPreview();
  const [img, setImg] = useState<string | ArrayBuffer>(profileImage || '');
  const debounceInput = useDebounceInput(setNickName, 300);

  useEffect(() => {
    if (image.file && image.preview) {
      setImg(image.preview);
    }
  }, [image]);

  const handleNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceInput(e.target.value);
  };

  const onUploadClick = useCallback(() => {
    if (inputRef.current) inputRef.current.click();
  }, []);

  const handleUpload = (e: React.ChangeEvent) => {
    saveImage(e);
  };

  const handleSave = useCallback(() => {
    if (!image.file) {
      toastError({ message: '이미지를 올려주세요.' });
      return;
    }
    if (!nickname) {
      toastError({ message: '닉네임을 입력해주세요.' });
      return;
    }
    const formData = new FormData();
    formData.append('name', nickname);
    if (image.file) formData.append('profileImage', image.file);
    mutate(formData);
  }, [image.file, mutate, nickname]);

  return (
    <PageTemplate
      metaTitle="re:Fashion | 마이 페이지 | 설정 | 계정 설정"
      metaUrl={`${seoData.url}/mypage/setting/acount`}
      title="계정 설정"
      left={<BackBtn color="#000" />}
      isNeedFooter={false}
      paddingTop="88px"
      sidePadding="24px"
    >
      <ProfileImgUpload
        {...{
          img,
          inputRef,
          onUploadClick,
          handleUpload,
        }}
      />

      <InfoArticle label="닉네임" style={{ marginTop: '47px' }}>
        <TextInput
          controlled={false}
          placeholder="닉네임을 입력해주세요."
          onChange={handleNickName}
          value={nickname}
        />
      </InfoArticle>

      <InfoArticle label="이메일">
        <Span fontWeight={400}>{email}</Span>
      </InfoArticle>

      <ButtonFooter onClick={handleSave}>완료</ButtonFooter>
    </PageTemplate>
  );
}

export default InfoModifyTemplate;
