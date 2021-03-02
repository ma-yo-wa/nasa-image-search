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

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Gallery = () => {
  let history = useHistory();
  let query = useQuery();
  const [isLoading, setIsLoading] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [error, setError] = React.useState("");

  const handleSearch = async (query) => {
    history.push(`/gallery?q=${query}`);
  };

  const searchTerm = query.get("q");

  React.useEffect(() => {
    setIsLoading(true);
    fetchImages(searchTerm)
      .then((response) => {
        if (response.status === 200) {
          if (error) {
            setError("");
          }

          setImages(response.data.collection.items);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setError("An error occurred, Please try again later.");
        setIsLoading(false);
      });
  }, [error, searchTerm]);

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
        <Searchbox onSearch={(query) => handleSearch(query)} />
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
    </>
  );
};

export default Gallery;
