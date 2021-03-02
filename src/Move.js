import React, { useEffect, useState } from 'react';

const Move = (props) => {
    const [diffX, setDiffX] = useState(0);
    const [diffY, setDiffY] = useState(0);
    const [right, setRight] = useState(0);
    const [bottom, setBottom] = useState(0);
    const [focus, setFocus] = useState(false);
    const [zIndex, setZIndex] = useState(0);
    const [style, setStyle] = useState({ backgroundColor: props.color, zIndex, top: '60px', left: '20px' });

    const dragStart = e => {
        setDiffX(e.screenX - e.currentTarget.getBoundingClientRect().left);
        setDiffY(e.screenY - e.currentTarget.getBoundingClientRect().top);

        props.setDraggingState(true);
        setFocus(true);

        if (zIndex === props.zIndex) return;
        setZIndex(props.zIndex + 1);
        props.setZIndex(zIndex);
    };

    useEffect(() => {
        setStyle({ ...style, zIndex });
    }, [zIndex]);

    useEffect(() => {
        if (right >= props.width - 20) {
            props.setWidth(right + 20);
        }
    }, [right]);

    useEffect(() => {
        // Use -20 for margin due to 40px height of header
        if (bottom >= props.height - 20) {
            props.setHeight(bottom - 20);
        }
    }, [bottom]);

    const onDrag = e => {
        if (props.dragging && focus) {
            let top = e.screenY - diffY + window.scrollY;
            let left = e.screenX - diffX + window.scrollX;

            if (top < 60) top = 60;
            if (left < 20) left = 20;

            setStyle({ ...style, left, top });
        }
    };

    const dragEnd = (e) => {
        setFocus(false);
        setRight(e.currentTarget.getBoundingClientRect().right + window.scrollX);
        setBottom(e.currentTarget.getBoundingClientRect().bottom + window.scrollY);
    };

    return (
        <div
            style={style}
            className='moveable'
            onMouseDown={dragStart}
            onMouseMove={onDrag}
            onMouseUp={dragEnd}
        ></div>
    );
};

export default Move;
