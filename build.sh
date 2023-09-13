echo "build dist file!"

# 기존 디렉토리 삭제
rm -R ./dist

# 디렉토리 새로 생성
mkdir -p ./dist/resources
mkdir -p ./dist/WEB-INF


# 파일 복사
cp -R resources ./dist
cp -R WEB-INF ./dist

# 파일 경로치환
export search1="/resources/"
export replace1="https://madive15.github.io/SKE_NEWENC/resources/"

for filename in `find ./dist/WEB-INF`
do
  echo ${filename}
  sed -i -e "s@${search1}@${replace1}@" ${filename}
done

for filename in `find ./dist/resources`
do
  echo ${filename}
  sed -i -e "s@${search1}@${replace1}@" ${filename}
done
