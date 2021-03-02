import React from "react";
import styled from "styled-components";
import fetchImages from "../services/fetchImages";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import Searchbox from "../components/SearchBox";
import { useHistory } from "react-router-dom";
import Error from "../components/Error";
import nasaLogo from "../assets/nasa-logo.svg";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import Button from "../components/Button";
import "antd/dist/antd.css";

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

const Header = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const GalleryContainer = styled.div`
  padding: 49px 0;
`;

const EmptyStateText = styled.div`
  text-align: center;
`;

const Nasa = styled.img`
  @media (max-width: 640px) {
    margin-bottom: 28px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 21px;
  display: flex;
  justify-content: center;
`;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Gallery = () => {
  let history = useHistory();
  let query = useQuery();
  const [isLoading, setIsLoading] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [error, setError] = React.useState("");
  const [totalPages, setTotalPages] = React.useState(null);
  const [page, setPage] = React.useState(query.get("page"));

  const handleSearch = async (query) => {
    history.push(`/gallery?q=${query}&page=${1}`);
  };

  const searchTerm = query.get("q");

  React.useEffect(() => {
    setIsLoading(true);
    fetchImages(searchTerm, page)
      .then((response) => {
        if (response.status === 200) {
          if (error) {
            setError("");
          }

          setImages(response.data.collection.items);
          setTotalPages(
            Math.ceil(response.data.collection.metadata.total_hits)
          );
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setError("An error occurred, Please try again later.");
        setIsLoading(false);
      });
  }, [error, searchTerm, page]);

  const onChangePage = (page) => {
    setPage(page);
  };

  const jumpToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header>
        <Link to="/">
          <Nasa
            src={nasaLogo}
            alt="NASA images"
            title="NASA images"
            height="64"
          />
        </Link>
        <Searchbox
          value={searchTerm}
          onSearch={(query) => handleSearch(query)}
        />
      </Header>
      {error && <Error error={error} />}
      <GalleryContainer>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {images.length === 0 ? (
              <EmptyStateText>
                We couldn't find images for your search
              </EmptyStateText>
            ) : (
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
            )}
          </>
        )}
      </GalleryContainer>
      {!isLoading && (
        <>
          <Pagination
            current={page}
            defaultPageSize={100}
            onChange={onChangePage}
            total={totalPages}
          />

          <ButtonContainer>
            <Button onClick={jumpToTop}>Jump to Top</Button>
          </ButtonContainer>
        </>
      )}
    </>
  );
};

export default Gallery;
