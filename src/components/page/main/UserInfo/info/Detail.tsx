import CommonHeader from "../../../../common/CommonHeader";
import "../../../../../App.css";
import { useNavigate, useParams } from "react-router-dom";
import {
    ChangeEvent,
    ChangeEventHandler,
    ReactEventHandler,
    useCallback,
    useEffect,
    useState,
} from "react";
import DiaryHeader from "../../../../common/diary/DiaryHeader";
import DiaryButton from "../../../../common/diary/DiaryButton";
import EmotionItem from "../../../../common/diary/EmotionItem";
import { Image } from "antd";
import { emotionList } from "../../../../../app/data/emotion";

const Detail = () => {
    //parameter
    const { date } = useParams();
    console.log(date);
    // state
    const [selectedDate, setSelectDate] = useState("");
    const [emotion, setEmotion] = useState(3);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [showImages, setShowImages] = useState<string[]>([]); //blob형태로 변경한 이미지 url들을 담기 위한 배열
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const emotionData = emotionList;
    const noImage = process.env.PUBLIC_URL + `/assets/noImage.png`;

    //hook
    const navigate = useNavigate();

    useEffect(() => {
        if (!date) return;
        setSelectDate(date);
    }, [date]);

    //

    //function
    const handleClickEmotion = useCallback((score: any) => {
        console.log(score);
        setEmotion(score);
    }, []);
    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("e.target", e.target.files);
        if (!e.target.files) return;
        const file = e.target.files[0];
        if (file) {
            let image = window.URL.createObjectURL(file);
            setImageUrl(image);
        }
    };

    //
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
                        rightChild={<DiaryButton text={"삭제하기"} />}
                    />
                    <section>
                        <h4>오늘은 언제인가요?</h4>
                        <div className="input_box">
                            <input
                                className="input_date"
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
                                        isSelected={item.emotion_id === emotion}
                                    />
                                ))}
                            </div>
                        </section>
                        <section>
                            <h4>사진</h4>
                            <Image
                                className="imageBox"
                                src={imageUrl ? imageUrl : noImage}
                                alt={"이미지가 없습니다."}
                            />
                            <div className="filebox">
                                <input
                                    className="upload-name"
                                    value="첨부파일"
                                    placeholder="첨부파일"
                                />
                                <label htmlFor="file">파일찾기</label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={handleChangeImage}
                                />
                            </div>
                        </section>
                        <section>
                            <h4>오늘의 일기</h4>
                            <div className="input_box text_wrapper">
                                <textarea
                                    placeholder="오늘은 어땟나요?"
                                    //ref={contentRef}
                                    //value={content}
                                    //onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                        </section>
                        <div className="control_box">
                            <DiaryButton
                                text={"취소하기"}
                                onClick={() => navigate(-1)}
                            />
                            {isEdit ? (
                                <DiaryButton
                                    text={"수정하기"}
                                    type={"positive"}
                                    // onClick={handleEdit}
                                />
                            ) : (
                                <DiaryButton
                                    text={"작성완료"}
                                    type={"positive"}
                                    //onClick={handleSubmit}
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
