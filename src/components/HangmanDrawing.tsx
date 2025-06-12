const Head = (
    <div style={{
        height: "50px",
        width: "50px",
        border: "10px solid black",
        borderRadius: "100%",
        position: "absolute",
        top: "50px",
        right: "-30px"
    }}/>
);

const Body = (
    <div style={{
        height: "100px",
        width: "10px",
        background: "black",
        position: "absolute",
        top: "120px",
        right: "0px"
    }}/>
)

const RightArm = (
    <div style={{
        height: "10px",
        width: "100px",
        background: "black",
        position: "absolute",
        top: "150px",
        right: "-100px",
        rotate: "-30deg",
        transformOrigin: "left bottom"
    }}/>
)

const LeftArm = (
    <div style={{
        height: "10px",
        width: "100px",
        background: "black",
        position: "absolute",
        top: "150px",
        right: "10px",
        rotate: "30deg",
        transformOrigin: "right bottom"
    }}/>
)

const RightLeg = (
    <div style={{
        height: "10px",
        width: "100px",
        background: "black",
        position: "absolute",
        top: "210px",
        right: "-90px",
        rotate: "60deg",
        transformOrigin: "left bottom"
    }}/>
)

const LeftLeg = (
    <div style={{
        height: "10px",
        width: "100px",
        background: "black",
        position: "absolute",
        top: "210px",
        right: "0px",
        rotate: "-60deg",
        transformOrigin: "right bottom"
    }}/>
)

const BODY_PARTS = [
    Head, Body, RightArm, LeftArm, RightLeg, LeftLeg
];

type HangmanDrawingProps = {
    numberOfGuesses: number;
}

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
    return <div style={{position: "relative"}}>
            {BODY_PARTS.slice(0, numberOfGuesses)}
            <div style={{ height: "50px", width: "10px", background: "black", position: "absolute", top:0, right:0 }}/>
            <div style={{ height: "10px", width: "200px", background: "black", marginLeft: "120px" }}/>
            <div style={{ height: "400px", width: "10px", background: "black", marginLeft: "120px" }}/>
            <div style={{ height: "10px", width: "250px", background: "black" }}/>
            </div>
}