import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SquareMaximize = (props) => (
    <Svg
        width={props.width}
        height={props.height}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <Path
            fill={props.color}
            strokeWidth={1}
            d="M400 96c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16v320c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16zm-16-64c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96c0-35.3 28.7-64 64-64zm-64 224c0 6.7-2.8 13-7.7 17.6l-112 104c-7 6.5-17.2 8.2-25.9 4.4S160 369.5 160 360V152c0-9.5 5.7-18.2 14.4-22s18.9-2.1 25.9 4.4l112 104c4.9 4.5 7.7 10.9 7.7 17.6"></Path>
    </Svg>

);

export default SquareMaximize;
