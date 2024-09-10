import CommonHeader from "../../../../common/CommonHeader";
import "../../../../../App.css";
import { useParams } from "react-router-dom";

const Detail = () => {
    const { date } = useParams();
    console.log(date);

    return (
        <div>
            <CommonHeader>
                <div className="DiaryEditor">
                    <section>
                        <h4>오늘은 언제인가요?</h4>
                        <div className="input_box">
                            <input
                                className="input_date"
                                type="date"
                                // value={selectDate}
                                // onChange={(e) => setSelectDate(e.target.value)}
                            />
                        </div>
                        <section>
                            <h4>오늘의 감정</h4>
                            <div className="input_box emotion_list_wrapper">
                                {/* {emotionList.map((item) => (
                                <EmotionItem
                                    key={item.emotion_id}
                                    {...item}
                                    onClick={handleClickEmotion}
                                    isSelected={item.emotion_id === emotion}
                                />
                            ))} */}
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
