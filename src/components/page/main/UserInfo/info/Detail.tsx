import CommonHeader from "../../../../common/CommonHeader";
import "../../../../../App.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import DiaryHeader from "../../../../common/diary/DiaryHeader";
import DiaryButton from "../../../../common/diary/DiaryButton";
import EmotionItem from "../../../../common/diary/EmotionItem";

const Detail = () => {
    const { date } = useParams();
    console.log(date);
    const [selectedDate, setSelectDate] = useState("");
    const [emotion, setEmotion] = useState(3);
    const navigate = useNavigate();

    //
    const emotionList = [
        {
            emotion_id: 1,
            emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
            emotion_descript: "완전 좋음",
        },
        {
            emotion_id: 2,
            emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
            emotion_descript: "좋음",
        },
        {
            emotion_id: 3,
            emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
            emotion_descript: "그럭 저럭",
        },
        {
            emotion_id: 4,
            emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
            emotion_descript: "나쁨",
        },
        {
            emotion_id: 5,
            emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
            emotion_descript: "완전 나쁨",
        },
    ];
    //

    useEffect(() => {
        if (!date) return;
        setSelectDate(date);
    }, [date]);

    const handleClickEmotion = useCallback((score: any) => {
        console.log(score);
        setEmotion(score);
    }, []);
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
                                {emotionList.map((item) => (
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
                            <h2>오늘의 일기</h2>
                            <div className="input_box text_wrapper">
                                <textarea
                                    placeholder="오늘은 어땟나요?"
                                    //ref={contentRef}
                                    //value={content}
                                    //onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                        </section>
                        <section />
                        <div className="control_box">
                            {/* <MyButton
                            text={"취소하기"}
                            onClick={() => navigate(-1)}
                        />
                        {isEdit ? (
                            <MyButton
                                text={"수정하기"}
                                type={"positive"}
                                onClick={handleEdit}
                            />
                        ) : (
                            <MyButton
                                text={"작성완료"}
                                type={"positive"}
                                onClick={handleSubmit}
                            />
                        )} */}
                        </div>
                    </section>
                </div>
            </CommonHeader>
        </div>
    );
};
export default Detail;
