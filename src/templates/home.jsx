import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

function Home() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img className='d-block w-100 carousel-img' src="https://img.freepik.com/free-photo/flat-lay-natural-self-care-products-composition_23-2148990019.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
          <Carousel.Caption className="carousel-caption-custom">
            <h3>Health Care</h3>
            <p>Premium Products available for Health Care.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100 carousel-img' src="https://assets.cntraveller.in/photos/64475681c810805ead8e34aa/16:9/w_2112,h_1188,c_limit/GettyImages-1305078018.jpg" alt="" />
          <Carousel.Caption className="carousel-caption-custom">
            <h3>Beauty Products</h3>
            <p>Branded and Reliable beauty products available.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100 carousel-img' src="https://www.viralspices.com/wp-content/uploads/2019/03/Organic-Products-Manufacturers-in-India.jpg" alt="" />
          <Carousel.Caption className="carousel-caption-custom">
            <h3>Food Products</h3>
            <p>Fresh and Healthy food products available.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default Home;