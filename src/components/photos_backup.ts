import type { Photo } from "react-photo-album";

const horizontalPhotos: Photo[] = [
  { src: "/images/portfolio/horizontal1.jpg", alt: "Portfolio Horizontal 1", width: 1600, height: 900 },
  { src: "/images/portfolio/horizontal2.jpeg", alt: "Portfolio Horizontal 2", width: 1600, height: 900 },
  { src: "/images/portfolio/horizontal3.jpg", alt: "Portfolio Horizontal 3", width: 1600, height: 900 },
  { src: "/images/portfolio/horizontal4.jpg", alt: "Portfolio Horizontal 4", width: 1600, height: 900 },
  { src: "/images/portfolio/horizontal5.jpg", alt: "Portfolio Horizontal 5", width: 1600, height: 900 },
  { src: "/images/portfolio/horizontal6.jpg", alt: "Portfolio Horizontal 6", width: 1600, height: 900 },
  { src: "/images/portfolio/horizontal7.jpg", alt: "Portfolio Horizontal 7", width: 1600, height: 900 },
  { src: "/images/portfolio/horizontal8.jpg", alt: "Portfolio Horizontal 8", width: 1600, height: 900 },
  { src: "/images/portfolio/horizontal9.jpg", alt: "Portfolio Horizontal 9", width: 1600, height: 900 },
];

const verticalPhotos: Photo[] = [
  { src: "/images/portfolio/vertical1.jpeg", alt: "Portfolio Vertical 1", width: 900, height: 1600 },
  { src: "/images/portfolio/vertical2.jpg", alt: "Portfolio Vertical 2", width: 900, height: 1600 },
  { src: "/images/portfolio/vertical3.jpg", alt: "Portfolio Vertical 3", width: 900, height: 1600 },
  { src: "/images/portfolio/vertical4.jpg", alt: "Portfolio Vertical 4", width: 900, height: 1600 },
  { src: "/images/portfolio/vertical5.jpeg", alt: "Portfolio Vertical 5", width: 900, height: 1600 },
  { src: "/images/portfolio/vertical6.jpg", alt: "Portfolio Vertical 6", width: 900, height: 1600 },
  { src: "/images/portfolio/vertical7.jpg", alt: "Portfolio Vertical 7", width: 900, height: 1600 },
  { src: "/images/portfolio/vertical8.jpg", alt: "Portfolio Vertical 8", width: 900, height: 1600 },
  { src: "/images/portfolio/vertical9.jpg", alt: "Portfolio Vertical 9", width: 900, height: 1600 },
  { src: "/images/portfolio/vertical10.jpg", alt: "Portfolio Vertical 10", width: 900, height: 1600 },
  { src: "/images/portfolio/vertical11.jpg", alt: "Portfolio Vertical 11", width: 900, height: 1600 },
  { src: "/images/portfolio/vertical12.jpg", alt: "Portfolio Vertical 12", width: 900, height: 1600 },
  { src: "/images/portfolio/vertical13.jpg", alt: "Portfolio Vertical 13", width: 900, height: 1600 },
];

export const allPhotos = [...horizontalPhotos, ...verticalPhotos];

export default allPhotos;
