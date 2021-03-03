import React from "react";
import styled from "styled-components";
import fetchImages from "../services/fetchImages";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { useHistory } from "react-router-dom";
import Error from "../components/Error";
import { Pagination } from "antd";
import Button from "../components/Button";
import "antd/dist/antd.css";
import Header from "../components/Header";

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
`;

const ImageContainer = styled.div`
  width: 25%;
  padding: 21px;
  box-sizing: border-box;
  margin: 0;

  @media (max-width: 1024px) {
    width: calc(100% / 3);
  }

  @media (max-width: 831px) {
    width: 50%;
  }

  @media (max-width: 640px) {
    width: 100%;
    padding: 21px 0;
  }
`;

const GalleryContainer = styled.div`
  padding: 49px 0;
`;

const EmptyStateText = styled.div`
  text-align: center;
`;

const ButtonContainer = styled.div`
  padding: 28px 0;
  display: flex;
  justify-content: center;
`;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Gallery = () => {
  const history = useHistory();
  const query = useQuery();
  const searchTerm = query.get("q");

  const [isLoading, setIsLoading] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [error, setError] = React.useState("");
  const [totalPages, setTotalPages] = React.useState(null);
  const [page, setPage] = React.useState(query.get("page") || 1);

  const handleSearch = (query) => {
    setPage(1);
    history.push(`/gallery?q=${query}&page=${1}`);
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetchImages(searchTerm, page)
      .then((response) => {
        if (response.status === 200) {
          if (error) {
            setError("");
          }

          setImages(response.data.collection.items);
          setTotalPages(response.data.collection.metadata.total_hits);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setError("An error occurred, Please try again later.");
        setIsLoading(false);
      });
  }, [error, searchTerm, page, totalPages]);

  const onChangePage = (page) => {
    history.push(`/gallery?q=${searchTerm}&page=${page}`);
    setPage(page);
  };

  const jumpToTop = () => {
    window.scrollTo(0, 0);
  };

  const GalleryContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <Error error={error} />;
    }

    if (images.length > 0) {
      return (
        <ImagesContainer>
          {images.map((image) => (
            <ImageContainer key={image.data[0].nasa_id}>
              <Image
                src={image.links[0].href}
                alt={image.data[0].description}
              />
            </ImageContainer>
          ))}
        </ImagesContainer>
      );
    }

    if (images.length === 0) {
      return (
        <EmptyStateText>
          Oops! We couldn't find images related to your search
        </EmptyStateText>
      );
    }
  };

  return (
    <>
      <Header
        searchTerm={searchTerm}
        handleSearch={(query) => handleSearch(query)}
      />

      <GalleryContainer>{GalleryContent()}</GalleryContainer>

      {!isLoading && images.length !== 0 && !error && (
        <Pagination
          defaultCurrent={page}
          defaultPageSize={100}
          onChange={onChangePage}
          total={totalPages}
          showSizeChanger={false}
        />
      )}

      {!isLoading && images.length > 20 && !error && (
        <ButtonContainer>
          <Button onClick={jumpToTop}>Jump to Top</Button>
        </ButtonContainer>
      )}
    </>
  );
};

export default Gallery;
