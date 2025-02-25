import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CircleSolid = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={props.width}
        height={props.height}
        {...props}
    >
        <Path
            fill={props.color}
            strokeWidth={1}
            d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm129-297c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71L280 392c0 13.3-10.7 24-24 24s-24-10.7-24-24V177.9l-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 103c9.4-9.4 24.6-9.4 33.9 0L385 215z" />
    </Svg>
)
export default CircleSolid
