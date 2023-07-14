/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import axios from "axios";
let url = ''

export const ServerPage = () => {
    const [time, setTime] = useState(5);
    const [links, setLinks] = useState([
        'taikula.life',
        'taikula.host',
        'taikula.cloud',
        'taikula.online',
        'taikula.tech',
    ]);
    const [usable, setUsable] = useState<string[]>([]);

    let timer: any = null;
    let countdown: number = 5;

    function getCountdown() {
        if (countdown <= 0) {
            window.location.href = url;
            return timer && clearTimeout(timer);
        }
        let secText: any = document.getElementById('js-sec-circle');
        let e = Math.round(countdown / 10 * 735);
        secText.style.strokeDashoffset = e - 735;

        setTime(countdown);
        countdown--;
        timer = setTimeout(() => {
            getCountdown();
        }, 1000);
    }

    async function getUrl() {
        let arr: Array<string> = []
        for (let i = 0; i < links.length; i++) {
            let link = links[i];
            await axios.get(`https://${link}/papi/status`).then(async (res) => {
                if (res.data === 'ok') {
                    arr.push(link);
                    setUsable([...arr]);
                }
            })
        }

        let randomUrl = arr[Math.floor(Math.random() * arr.length)];
        url = `https://${randomUrl}`

        getCountdown();
    }

    useEffect(() => {
        getUrl();
    }, [])

    return (
        <>
            <div css={_css}>
                <div id="js-alert-box" className="alert-box">
                    <svg className="alert-circle" width="234" height="234">
                        <circle cx="117" cy="117" r="108" fill="#FFF" stroke="#43AEFA" stroke-width="17">
                        </circle>
                        <circle id="js-sec-circle" className="alert-sec-circle" cx="117" cy="117" r="108" fill="transparent"
                            stroke="#F4F1F1" stroke-width="18" transform="rotate(-90 117 117)">
                        </circle>
                        <text className="alert-sec-unit" x="82" y="172" fill="#BDBDBD">倒数</text>
                    </svg>
                    <div id="js-sec-text" className="alert-sec-text">
                        {time}
                    </div>
                    <div className="alert-body">
                        <div id="js-alert-head" className="alert-head">
                        </div>
                        <div className="alert-concent">
                            <p>
                                {
                                    links && links.length && links.map((link, index) => {
                                        return <div className="alert-link"><a href={`https://${link}`}>域名{index + 1}:{`https://${link}`}</a> <span style={{ display: usable.includes(link) ? 'inline-block' : 'none' }}>✅</span></div>
                                    })
                                }
                            </p>
                            <br />
                            <p>请耐心等待数秒 或 点击立即进入</p>
                            <p>就会跳转到新页面</p>
                        </div>
                        <a id="js-alert-btn" className="alert-btn" href={`javascript:top.location.href=${url};`}>立即进入</a>
                    </div>

                </div>
            </div>
        </>
    );
};

const _css = css`

    margin: 0;
    padding: 0;
    font-family: Arial, '微软雅黑', '宋体', sans-serif;

    a {
        text-decoration: none;
        color:#4AB0F7;
    }

    .alert-box {
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%);
        margin: 90px 10px 0;
        padding: 180px 85px 22px;
        border-radius: 10px 10px 0 0;
        background: #FFF;
        box-shadow: 5px 9px 17px rgba(102, 102, 102, 0.75);
        color: #FFF;
        max-width: 500px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .alert-link{
        font-size:20px;
        margin-top: 8px;
    }

    .alert-box p {
        margin: 0
    }

    .alert-circle {
        position: absolute;
        top: -50px;
    }

    .alert-sec-circle {
        stroke-dashoffset: 0;
        stroke-dasharray: 735;
        transition: stroke-dashoffset 1s linear
    }

    .alert-sec-text {
        position: absolute;
        top: 0px;
        width: 76px;
        color: #000;
        font-size: 68px
    }

    .alert-sec-unit {
        font-size: 34px
    }

    .alert-body {
        margin: 35px 0
    }

    .alert-head {
        color: #242424;
        font-size: 28px
    }

    .alert-concent {
        margin: 14px 0;
        color: #7B7B7B;
        font-size: 18px
    }

    .alert-concent p {
        line-height: 27px
    }

    .alert-btn {
        display: block;
        border-radius: 10px;
        background-color: #4AB0F7;
        height: 55px;
        line-height: 55px;
        width: 286px;
        color: #FFF;
        font-size: 20px;
        text-decoration: none;
        letter-spacing: 2px
    }

    .alert-btn:hover {
        background-color: #6BC2FF
    }

    .alert-footer {
        margin: 0 auto;
        height: 42px;
        width: 120px
    }

    .alert-footer-icon {
        float: left
    }

    .alert-footer-text {
        float: left;
        border-left: 2px solid #EEE;
        padding: 3px 0 0 5px;
        height: 40px;
        color: #0B85CC;
        font-size: 12px;
        text-align: left
    }

    .alert-footer-text p {
        color: #7A7A7A;
        font-size: 22px;
        line-height: 18px
    }
`