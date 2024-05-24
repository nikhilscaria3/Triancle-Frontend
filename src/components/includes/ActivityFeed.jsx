import React from "react";
import styled from "styled-components";

import accordion from "../../assets/icons/down.svg";
const ActivityFeed = () => {
  const activities = [
    {
      status: "🔴",
      head: "Lorem, ipsum.",
      date: "12/12/2024",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quisquam sit vitae fugiat repudiandae exercitationem eum veritatis nihil explicabo. Maxime, incidunt?",
    },
    {
      status: "🟢",
      head: "Lorem, ipsum.",
      date: "12/12/2024",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quisquam sit vitae fugiat repudiandae exercitationem eum veritatis nihil explicabo. Maxime, incidunt?",
    },
    {
      status: "🔵",
      head: "Lorem, ipsum.",
      date: "12/12/2024",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quisquam sit vitae fugiat repudiandae exercitationem eum veritatis nihil explicabo. Maxime, incidunt?",
    },
  ];
  return (
    <div>
      <MainContainer>
        <Head>
          <HeadLeft>Activity Feed</HeadLeft>
          <HeadRight>
            <HeadRightPara>View all</HeadRightPara>
            <AccordionContainer>
              <Accordion src={accordion} alt="down" />
            </AccordionContainer>
          </HeadRight>
        </Head>
        <Line></Line>

        <BodyContainer>
          <BodyItems>
            {activities &&
              activities.map((activity, index) => {
                return (
                  <ItemContainer key={index}>
                    {/* <Status>{activity.status}</Status> */}
                    <ItemTop>
                      <ItemHead>{activity.head}</ItemHead>
                      <ItemDate>{activity.date}</ItemDate>
                    </ItemTop>
                    <ItemDesc>{activity.desc}</ItemDesc>
                  </ItemContainer>
                );
              })}
          </BodyItems>
        </BodyContainer>
      </MainContainer>
    </div>
  );
};

export default ActivityFeed;

const MainContainer = styled.div`
  border: 1px solid #b5b5b580;
  border-radius: 15px;
  width: auto;
  display: inline-block;
  max-width: 350px;
  background-color: #ffff;
  padding: 2% 0;
`;
const Head = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
`;
const HeadLeft = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #363d3b;
`;
const HeadRightPara = styled.p`
  font-size: 13px;
  font-weight: 300;
  color: #6b6b6b;
`;

const HeadRight = styled.div`
  display: flex;
  align-items: center;
  padding-left: 12px;
`;
const AccordionContainer = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Accordion = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  cursor: pointer;
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
`;

const BodyContainer = styled.div``;
const BodyItems = styled.ul`
  padding: 12px;
`;
const ItemContainer = styled.li`
  border-bottom: 1px solid #b5b5b5;

  &:last-child {
    border-bottom: 0;
  }
`;
const ItemTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0;
`;
const ItemHead = styled.p`
  font-size: 14px;
  font-weight: 300;

  &::before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    margin-right: 10px;
  }
`;
const ItemDate = styled.p`
  font-size: 12px;
  font-weight: 300;
  color: #fc005b;
`;
const ItemDesc = styled.p`
  font-size: 12px;
  font-weight: 300;
  line-height: 1.5;
  margin-bottom: 14px;
  padding-left: 20px;
`;
const Status = styled.p``;
