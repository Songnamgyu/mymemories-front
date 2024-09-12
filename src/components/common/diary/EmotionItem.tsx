interface Props {
    emotion_id: number;
    emotion_descript: string;
    emotion_img: any;
    onClick: (id: any) => void;
    isSelected: boolean;
}

const EmotionItem = ({
    emotion_id,
    emotion_descript,
    emotion_img,
    onClick,
    isSelected,
}: Props) => {
    return (
        <div
            className={[
                "EmotionItem",
                isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
            ].join("")}
            onClick={() => onClick(emotion_id)}
        >
            <img src={emotion_img} />
            <span>{emotion_descript}</span>
        </div>
    );
};
export default EmotionItem;
