interface Props {
    text?: any;
    type?: any;
    onClick?: () => void;
}

const DiaryButton = ({ text, type, onClick }: Props) => {
    const btnType = ["positive", "negative"].includes(type) ? type : "default";

    return (
        <button
            className={["MyButton", `MyButton_${btnType}`].join(" ")}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

DiaryButton.defaultProps = {
    type: "default",
};

export default DiaryButton;
