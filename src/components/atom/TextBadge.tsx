import React, {CSSProperties} from 'react';
import "../../stylesheet/atom/TextBadge.css"

interface TextBadgeProps {
    color: any
    message: string
    style: CSSProperties
}

const TextBadge = ({ color, message, style }: TextBadgeProps) => {
    return (
        <div className="text-badge" style={{...style, backgroundColor: color }}>
            <p>{message}</p>
        </div>
    );
};

TextBadge.defaultProps = {
    style: {}
}

export default TextBadge;
