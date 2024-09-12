interface Props {
    leftChild?: any;
    headText?: any;
    rightChild?: any;
}

const DiaryHeader = ({ leftChild, headText, rightChild }: Props) => {
    return (
        <header>
            <div className="head_btn_left">{leftChild}</div>
            <div className="head_text">{headText}</div>
            <div className="head_btn_right">{rightChild}</div>
        </header>
    );
};
export default DiaryHeader;
