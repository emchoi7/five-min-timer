import {useState, useRef} from 'react';
import Button from './Button';

export default function Timer() {
    const [timeLeftStr, setTimeLeftStr] = useState("05:00");
    const [started, setStarted] = useState(false);
    const minRef = useRef(1);
    const secRef = useRef(0);
    const intervalRef = useRef(null);

    function getTimeStr() {
        return "0"+minRef.current+":"+("0" + secRef.current).slice(-2);
    }

    function onClickStartHandler(e) {
        e.preventDefault();
        setStarted(true);

        intervalRef.current = setInterval(() => {
            if(minRef.current === 0 && secRef.current === 0) {
                setStarted(false);
                minRef.current = 5;
                secRef.current = 0;
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            } else if(secRef.current === 0) {
                minRef.current = minRef.current - 1;
                secRef.current = 59;
            } else {
                secRef.current = secRef.current - 1;
            }
            setTimeLeftStr(getTimeStr());
        }, 1000);
    }

    function onClickStopHandler(e) {
        e.preventDefault();
        setStarted(false);

        clearInterval(intervalRef.current);
        intervalRef.current = null;
        minRef.current = 5;
        secRef.current = 0;
        setTimeLeftStr("05:00");
    }

    function onClickPauseHandler(e) {
        e.preventDefault();
        setStarted(false);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }

    return <div>
        <p>{timeLeftStr}</p>
        <Button disabled={started} onClickHandler={onClickStartHandler}>Start</Button>
        <Button disabled={!started} onClickHandler={onClickPauseHandler}>Pause</Button>
        <Button disabled={!started} onClickHandler={onClickStopHandler}>Stop</Button>
    </div>
}