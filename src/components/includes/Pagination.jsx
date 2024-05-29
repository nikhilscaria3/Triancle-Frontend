import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { THEME_COLORS as themes } from "../../ThemeConfig";
import left from "../../assets/icons/left.svg";
import right from "../../assets/icons/right.svg";

const Pagination = ({ initialPage, totalPages, getData }) => {
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    getData(page);
  }, [page, getData]);

  const handlePrevClick = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextClick = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };


  return (
    <div>
      <PaginationSection>
        <Btn onClick={handlePrevClick} disabled={page === 1}>
          <Icon src={left} alt="left" />
        </Btn>
        <Btn variant="body1">{`${page} of ${totalPages}`}</Btn>
        <Btn onClick={handleNextClick} disabled={page === totalPages}>
          <Icon src={right} alt="right" />
        </Btn>
      </PaginationSection>
    </div>
  );
};

export default Pagination;

const PaginationSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Btn = styled.button`
  height: 30px;
  width: 35px;
  background-color: ${themes.text_2};
  margin: 10px 5px;
`;
const Icon = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: inline-block;
`;
