import CommonHeader from "../../../../common/CommonHeader";
import "../../../../../App.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import DiaryHeader from "../../../../common/diary/DiaryHeader";
import DiaryButton from "../../../../common/diary/DiaryButton";
import EmotionItem from "../../../../common/diary/EmotionItem";
import { Image } from "antd";
import { emotionList } from "../../../../../app/data/emotion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../app/store";
import {
    deleteDiary,
    getFileImage,
    saveDiary,
    updateDiary,
} from "../../../../../api/diary/diaryApi";
import dayjs from "dayjs";

const Detail = () => {
    // URL Parameter와 기본 데이터
    const uploadDir = process.env.REACT_APP_FILE_UPLOAD_DIR;
    const { date, id } = useParams();
    console.log("id", id, "date", date);
    const emotionData = emotionList;
    const noImage = process.env.PUBLIC_URL + `/assets/noImage.png`;

    const { diaryData } = useSelector((state: RootState) => state.diary);

    // State
    const [selectedDate, setSelectDate] = useState("");
    const [emotion, setEmotion] = useState(3);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState("");
    const [content, setContent] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [fileKey, setFileKey] = useState(Date.now()); // 파일 입력 초기화를 위한 키

    // Navigate Hook
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (Number(id) > 0 && diaryData.length > 0) {
            const target = diaryData.filter(
                (item: any) => Number(id) === Number(item.id)
            );
            setContent(target[0].content);
            setEmotion(target[0].score);
            setSelectDate(dayjs(target[0].selectedDate).format("YYYY-MM-DD"));
            if (target[0].fileName) {
                const imageUrl = `${process.env.REACT_APP_API_URL}/file/image/${target[0].fileName}`;
                setImageUrl(imageUrl);
            }
        } else if (date) {
            setSelectDate(date);
        }
    }, [date, diaryData, id]);

    // 감정 선택 핸들러
    const handleClickEmotion = useCallback((score: any) => {
        setEmotion(score);
    }, []);

    // 이미지 파일 선택 핸들러
    const handleChangeImage = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) return;
            const file = e.target.files[0];
            if (file) {
                const image = URL.createObjectURL(file);
                setImageUrl(image);
                setImageFile(file);
            }
        },
        []
    );
    const dd = diaryData.filter((item: any) => Number(item.id) === Number(id));

    console.log("dd", dd);
    // 이미지 삭제 핸들러
    const handlerDeleteImage = useCallback(() => {
        setImageUrl("");
        setImageFile(null);
        setFileKey(Date.now()); // 파일 입력을 초기화하기 위해 고유한 키 생성
    }, []);

    // 작성 완료 핸들러
    const handleSubmit = () => {
        const param = {
            date: dayjs(selectedDate).format("YYYYMMDD"),
            score: emotion,
            content,
            imageFile,
        };

        if (!emotion || !content) {
            alert("오늘의 점수 또는 내용을 입력해주세요.");
            return;
        }
        dispatch(saveDiary(param))
            .unwrap() // unwrap을 사용하여 비동기 결과를 처리
            .then(() => {
                navigate("/info"); // 저장 성공 후 /info로 이동
            })
            .catch((error) => {
                alert("저장에 실패하였습니다");
                console.error("저장 실패:", error); // 실패 시 에러 처리
            });
    };

    //수정 핸들러
    const handleModify = () => {
        console.log("modify");
        if (id) {
            const param = {
                id,
                content,
                imageFile,
                score: emotion,
                date: selectedDate,
            };
            console.log("param", param);
            dispatch(updateDiary(param))
                .unwrap()
                .then(() => {
                    navigate(
                        `/detail/${dayjs(selectedDate).format(
                            "YYYY-MM-DD"
                        )}/${id}`
                    );
                })
                .catch((error) => {
                    console.error("error", error);
                    alert("수정 실패하였습니다");
                });
        }
    };

    //삭제 핸들러
    const handleDelete = () => {
        console.log(`targetId = ${id}`);
        dispatch(deleteDiary(Number(id)))
            .unwrap()
            .then(() => navigate("/info"))
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <CommonHeader>
                <div className="DiaryEditor">
                    <DiaryHeader
                        headText={"오늘의 기억"}
                        leftChild={
                            <DiaryButton
                                text={"뒤로가기"}
                                onClick={() => navigate(-1)}
                            />
                        }
                        rightChild={
                            Number(id) > 0 && (
                                <>
                                    <DiaryButton
                                        text={"수정하기"}
                                        type={"positive"}
                                        onClick={handleModify}
                                    />
                                    <DiaryButton
                                        text={"삭제하기"}
                                        type={"negative"}
                                        onClick={handleDelete}
                                    />
                                </>
                            )
                        }
                    />
                    <section>
                        <h4>오늘은 언제인가요?</h4>
                        <div className="input_box">
                            <input
                                className="input_date"
                                name="date"
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectDate(e.target.value)}
                            />
                        </div>
                        <section>
                            <h4>오늘의 감정</h4>
                            <div className="input_box emotion_list_wrapper">
                                {emotionData.map((item) => (
                                    <EmotionItem
                                        key={item.emotion_id}
                                        {...item}
                                        onClick={handleClickEmotion}
                                        isSelected={
                                            Number(item.emotion_id) ===
                                            Number(emotion)
                                        }
                                    />
                                ))}
                            </div>
                        </section>
                        <section>
                            <h4>사진</h4>
                            <Image
                                className="imageBox"
                                src={imageUrl || noImage}
                                alt={"이미지가 없습니다."}
                            />
                            <div className="filebox">
                                <input
                                    className="upload-name"
                                    value="첨부파일"
                                    placeholder="첨부파일"
                                    readOnly
                                />
                                <label htmlFor="file">파일찾기</label>
                                <input
                                    type="file"
                                    id="file"
                                    key={fileKey} // key를 바꿔서 파일 입력 필드 초기화
                                    onChange={handleChangeImage}
                                />
                                {imageUrl && (
                                    <button onClick={handlerDeleteImage}>
                                        이미지 삭제
                                    </button>
                                )}
                            </div>
                        </section>
                        <section>
                            <h4>오늘의 일기</h4>
                            <div className="input_box text_wrapper">
                                <textarea
                                    placeholder="오늘은 어땠나요?"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                        </section>
                        <div className="control_box">
                            {Number(id) === 0 && (
                                <DiaryButton
                                    text={"작성완료"}
                                    type={"positive"}
                                    onClick={handleSubmit}
                                />
                            )}
                        </div>
                    </section>
                </div>
            </CommonHeader>
        </div>
    );
};

export default Detail;
