import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import styled, {  keyframes } from "styled-components";
import { isLoggedInVar } from "../apollo";
import { useReactiveVar } from "@apollo/client";
import back from "../assets/back.png";
import back2 from "../assets/back2.png";
import { darkModeVar } from "../apollo";
import main from "../assets/main.jpeg";
import coffee1 from "../assets/coffee1.png";
import coffee2 from "../assets/coffee2.png";
import coffee3 from "../assets/coffee3.png";
import btn_notice from "../assets/btn_notice.png";
import btn_promo from "../assets/btn_promo.png";
import btn_promo_up from "../assets/btn_promo_up.png";
import rLogo from "../assets/rewardsLogo.png";
import ThemeSet from "../components/ThemeBtn";

const Container = styled.div`
    width: 100%;
`;
const Main = styled.div`
    height: 646px;
    background-image: url(${main});
    background-size: cover;
    position: relative;
`;
const Inner = styled.div`
    height: 100%;
    margin: 0 auto;
    max-width: 1080px;
    padding: 0 80px;
    box-sizing: content-box;
`;
const Images = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    z-index: 1;
    margin-left: -540px;
    max-width: 1080px;
`;
const showImg = keyframes`
    0% {opacity: 0}
    50% {opacity: 0}
    100% {opacity: 1}
`;
const Slogan = styled.div`
    animation: ${showImg} .5s ease-in;
`;
const backAni = keyframes`
    100%{
        background-position: 2000px 0;
    } 
`;
const Text= styled.span<{isDark: boolean}>`
    top: 8%;
    position: absolute;
    font-weight: 600;
    font-size: 3rem;
    color: transparent;
    -webkit-text-stroke: 1px ${props => props.isDark ? "black" : "white"};
    background-image: url(${props => props.isDark ? back2 : back});
    -webkit-background-clip: text;
    background-position: 0 0;
    animation: ${backAni} 20s linear infinite;
`;
const Text2= styled.span`
    top: 18%;
    left: 15.5%;
    position: absolute;
    color:wheat;
    font-size: 2.5rem;
`;
const Button = styled.span`
    top: 30%;
    left: 11.3%;
    position: absolute;
    color: wheat;
    border: 2px solid wheat;
    border-radius: 5px;
    cursor: pointer;
    padding: 8px 24px;
    &:hover{
        background-color: ${props => props.theme.btHover};
    }
    transition: background-color .5s;
    animation: ${showImg} 5s ease-in;
`;
const Coffee1 = styled.div`
    position: absolute;
    right: 50%;
    bottom: 10.5%;
    margin-right: -0.2rem;
    animation: ${showImg} 1.5s ease-in;
    max-width: 489px;
`;
const Coffee2 = styled.div`
    position: absolute;
    right: 5%;
    bottom: 21%;
    animation: ${showImg} 4.5s ease-in;
    max-width: 247px;
`;
const Coffee3 = styled.div`
    position: absolute;
    right: 28%;
    bottom: 15%;
    margin-right: -0.2rem;
    animation: ${showImg} 3s ease-in;
    max-width: 239px;
`;
const Section = styled.div`
    display: flex;
    height: 62px;
    position: relative;
`;
const NoticeBg = styled.div`
    background-color: black;
    width: 50%;
`;
const NoticePromo = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    height: 62px;
    width: 1100px;
    margin-left: -550px;
    display: flex;
`;
const NoticeSet = styled.div`
    display: flex;
    color: white;
    align-items: center;
    height: 100%;
    width: 550px;
    position: relative;
    overflow: hidden;
`;
const NoticeTT = styled.div`
    font-size: 1rem;
`;
const Notice = styled.div`
    padding-left: 20px;
`;
const UpLi = keyframes`
        0% {
            transform: translateY(20px)
        }
        30% {
            transform: translateY(0)
        }
        70% {
            transform: translateY(0)
        }
        100% {
            transform: translateY(-50px)
        }
`;
const Nul = styled.ul``;
const Nli = styled.li<{ isReady: boolean }>`
    display: ${props => props.isReady ? "block" : "none"};
    height: 30px;
    line-height: 30px; 
    animation: ${UpLi} 2.1s ease-in;
`;
const NoticeBtn = styled.div`
    width: 40px;
    height: 40px;
    background-image: url(${btn_notice});
    background-size: cover;
    position: absolute;
    right: 4%;
`;
const PromoBg = styled.div`
    background-color: white;
    width: 50%;
`;
const PromoSet = styled.div`
    color: black;
    width: 550px;
    display: flex;
    align-items: center;
    position: relative;
`;
const Promo = styled.div`
    font-size: 1rem;
    position: absolute;
    right: 15%;
`;
const HiddenPromo = styled.div<{active: boolean}>`
    height: ${props => props.active ? "446px" : "0"};
    transition: height .5s ease-in-out;
`;
const PromoBtn = styled.div<{isClicked: boolean}>`
    width: 40px;
    height: 40px;
    background-image: ${props => props.isClicked ? `url(${btn_promo_up})`: `url(${btn_promo})`};
    background-size: cover;
    position: absolute;
    right: 4%;
`;
const Reward = styled.div`
    padding-top: 30px;
    padding-bottom: 40px;
    width: 100%;
    background-color: ${props => props.theme.reward};
`;
const RewardInner = styled.div`
    display: flex;
    width: 1100px;
    margin: 0 auto;
`;
const RewardLogo = styled.div`
    width: 20%;
`;
const RewardConts = styled.div`
    width: 80%;
    color: white;
`;
const InfoConts = styled.div`
`;
const H2 = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 12px;
`;
const Info = styled.div`
    display: flex;
    justify-content: space-between;
`;
const InfoTxt = styled.p`
    font-size: 1rem;
    line-height: 1.4;
`;
const BtnGroup = styled.div<{active: boolean}>`
    margin-right: 15px;
    align-self: center;
    display: ${props => props.active ? "none" :"block"};
`;
const SignUpBtn = styled.span`
    background-color: ${props => props.theme.signUpBtn};
    border: ${props => props.theme.signUpBtn} solid 2px;
    border-radius: 10px;
    padding: 7px 20px;
    height: 38px;
    cursor: pointer;
    margin-right: 10px;
`;
const LoginBtn = styled.span`
    border-radius: 10px;
    border: white solid 2px;
    padding: 7px 20px;
    height: 38px;
    cursor: pointer;
    &:hover{
        border: ${props => props.theme.btHover} solid 2px;
        color: ${props => props.theme.btHover};
        transition: all .5s;
    }
`;
const GiftConts = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
`;
const GiftTxt = styled.div`
    line-height: 1.2;
`;
const GiftBtn = styled.div`
    margin-right: 15px;
    border-radius: 10px;
    border: white solid 2px;
    padding: 7px 10px;
    height: 38px;
    cursor: pointer;
    &:hover{
        border: ${props => props.theme.btHover} solid 2px;
        color: ${props => props.theme.btHover};
        transition: all .5s;
    }
`;
export default function Home() {
    const darkMode = useReactiveVar(darkModeVar);
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const [index, setIndex] = useState(0);
    const [clicked, setClicked] = useState(false);
    const handleInterval = () => {
        setIndex((index+1)%4);
    };
    useEffect(()=>{
        const tick = setInterval(handleInterval, 2000);
        return ()=>clearInterval(tick);
    });
    return(
        <Container>
            <ThemeSet />
            <Main>
                <Inner>
                    <Images>
                        <Slogan>
                            <Text isDark={darkMode}>STAR BUCK'S</Text>
                            <Text2>NEW MENU</Text2>
                            <Button>????????? ??????</Button>
                        </Slogan>
                        <Coffee1><img src={coffee1} alt="coffee1"/></Coffee1>
                        <Coffee2><img src={coffee2} alt="coffee2"/></Coffee2>
                        <Coffee3><img src={coffee3} alt="coffee3"/></Coffee3>
                    </Images>
                </Inner>
            </Main>
            <Section>
                <NoticeBg></NoticeBg>
                <PromoBg></PromoBg>
                <NoticePromo>
                    <NoticeSet>
                        <NoticeTT>????????????</NoticeTT>
                        <Notice>
                            <Nul>
                                <Nli isReady={index===0}>????????? ?????? ??? ?????? ??????</Nli>
                                <Nli isReady={index===1}>??????????????? ??????????????? ???????????????</Nli>
                                <Nli isReady={index===2}>??????????????? ??????????????? ???????????????</Nli>
                                <Nli isReady={index===3}>?????? ????????? ??????~</Nli>
                            </Nul>
                        </Notice>
                        <NoticeBtn />
                    </NoticeSet>
                    <PromoSet><Promo>???????????? ????????????</Promo><PromoBtn isClicked={clicked} onClick={()=>setClicked(!clicked)}></PromoBtn></PromoSet>
                </NoticePromo>
            </Section>
            <HiddenPromo active={clicked}>
            </HiddenPromo>
            <Reward>
                <RewardInner>
                    <RewardLogo><img src={rLogo} style={{"width": "175px"}} alt="rewardLogo"/></RewardLogo>
                    <RewardConts>
                        <InfoConts>
                            <H2>?????????????????? ????????? ??????, ???????????? ?????????</H2>
                            <Info>
                                <InfoTxt><strong>???????????? ????????????????</strong> ???????????? ?????? ????????? ???????????? ??????????????????.<br></br>
                                <strong>???????????? ????????? ?????????????</strong> ????????? ?????? ????????? ????????? ????????????.</InfoTxt>
                                <BtnGroup active={isLoggedIn}>
                                    <Link to="/signup"><SignUpBtn>????????????</SignUpBtn></Link>
                                    <Link to="/login"><LoginBtn>?????????</LoginBtn></Link>
                                </BtnGroup>
                            </Info>
                        </InfoConts>
                        <GiftConts>
                            <GiftTxt>?????? ?????? ???, ???????????? e-Gift Card??? "????????? ????????????"??? ???????????????, ???????????? ???????????????!<br></br>
????????? ???????????? ???????????? ????????? ????????? ?????? ???, ??? ????????? ????????? ?????? ??????????????? ????????????!</GiftTxt>
                            <GiftBtn>e-Gift Card ????????????</GiftBtn>
                        </GiftConts>
                    </RewardConts>
                </RewardInner>
            </Reward>
        </Container>
    );
}